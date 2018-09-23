/****************************************************************************
**
** Copyright (C) 2017 The Qt Company Ltd.
** Contact: https://www.qt.io/licensing/
**
** This file is part of the QtQuick module of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:LGPL$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and The Qt Company. For licensing terms
** and conditions see https://www.qt.io/terms-conditions. For further
** information use the contact form at https://www.qt.io/contact-us.
**
** GNU Lesser General Public License Usage
** Alternatively, this file may be used under the terms of the GNU Lesser
** General Public License version 3 as published by the Free Software
** Foundation and appearing in the file LICENSE.LGPL3 included in the
** packaging of this file. Please review the following information to
** ensure the GNU Lesser General Public License version 3 requirements
** will be met: https://www.gnu.org/licenses/lgpl-3.0.html.
**
** GNU General Public License Usage
** Alternatively, this file may be used under the terms of the GNU
** General Public License version 2.0 or (at your option) the GNU General
** Public license version 3 or any later version approved by the KDE Free
** Qt Foundation. The licenses are as published by the Free Software
** Foundation and appearing in the file LICENSE.GPL2 and LICENSE.GPL3
** included in the packaging of this file. Please review the following
** information to ensure the GNU General Public License requirements will
** be met: https://www.gnu.org/licenses/gpl-2.0.html and
** https://www.gnu.org/licenses/gpl-3.0.html.
**
** $QT_END_LICENSE$
**
****************************************************************************/

#include "qsgktxhandler_p.h"
#include "qsgcompressedtexture_p.h"
#include <QOpenGLTexture>
#include <QtEndian>

//#define KTX_DEBUG

QT_BEGIN_NAMESPACE

#define KTX_IDENTIFIER_LENGTH 12
static const char ktxIdentifier[KTX_IDENTIFIER_LENGTH] = { '\xAB', 'K', 'T', 'X', ' ', '1', '1', '\xBB', '\r', '\n', '\x1A', '\n' };
static const quint32 platformEndianIdentifier = 0x04030201;
static const quint32 inversePlatformEndianIdentifier = 0x01020304;

struct KTXHeader {
    quint8 identifier[KTX_IDENTIFIER_LENGTH]; //Must match ktxIdentifier
    quint32 endianness; //Either platformEndianIdentifier or inversePlatformEndianIdentifier, other values not allowed.
    quint32 glType;
    quint32 glTypeSize;
    quint32 glFormat;
    quint32 glInternalFormat;
    quint32 glBaseInternalFormat;
    quint32 pixelWidth;
    quint32 pixelHeight;
    quint32 pixelDepth;
    quint32 numberOfArrayElements;
    quint32 numberOfFaces;
    quint32 numberOfMipmapLevels;
    quint32 bytesOfKeyValueData;
};

static const int headerSize = sizeof(KTXHeader);

// Currently unused, declared for future reference
struct KTXKeyValuePairItem {
    quint32   keyAndValueByteSize;
    /*
    quint8 keyAndValue[keyAndValueByteSize];
    quint8 valuePadding[3 - ((keyAndValueByteSize + 3) % 4)];
    */
};

struct KTXMipmapLevel {
    quint32 imageSize;
    /*
    for each array_element in numberOfArrayElements*
        for each face in numberOfFaces
            for each z_slice in pixelDepth*
                for each row or row_of_blocks in pixelHeight*
                    for each pixel or block_of_pixels in pixelWidth
                        Byte data[format-specific-number-of-bytes]**
                    end
                end
            end
            Byte cubePadding[0-3]
        end
    end
    quint8 mipPadding[3 - ((imageSize + 3) % 4)]
    */
};

bool QSGKtxHandler::canRead(const QByteArray &suffix, const QByteArray &block)
{
    Q_UNUSED(suffix)

    return (qstrncmp(block.constData(), ktxIdentifier, KTX_IDENTIFIER_LENGTH) == 0);
}

QQuickTextureFactory *QSGKtxHandler::read()
{
    if (!device())
        return nullptr;

    QByteArray buf = device()->readAll();
    if (buf.size() < headerSize || !canRead(QByteArray(), buf)) {
        qCDebug(QSG_LOG_TEXTUREIO, "Invalid KTX file %s", logName().constData());
        return nullptr;
    }

    const KTXHeader *header = reinterpret_cast<const KTXHeader *>(buf.constData());
    if (!checkHeader(*header)) {
        qCDebug(QSG_LOG_TEXTUREIO, "Unsupported KTX file format in %s", logName().constData());
        return nullptr;
    }

    QSGCompressedTexture::DataPtr texData(QSGCompressedTexture::DataPtr::create());

    texData->size = QSize(decode(header->pixelWidth), decode(header->pixelHeight));
    texData->format = decode(header->glInternalFormat);
    texData->hasAlpha = !QSGCompressedTexture::formatIsOpaque(texData->format);

    // For now, ignore any additional mipmap levels
    int preambleSize = headerSize + decode(header->bytesOfKeyValueData);
    if (buf.size() >= preambleSize + int(sizeof(KTXMipmapLevel))) {
        texData->data = buf;
        texData->dataOffset = preambleSize + sizeof(quint32); // for the imageSize
        const KTXMipmapLevel *level = reinterpret_cast<const KTXMipmapLevel *>(buf.constData() + preambleSize);
        texData->dataLength = decode(level->imageSize);
    }

    if (!texData->isValid()) {
        qCDebug(QSG_LOG_TEXTUREIO, "Invalid values in header of KTX file %s", logName().constData());
        return nullptr;
    }

    texData->logName = logName();
#ifdef KTX_DEBUG
    qDebug() << "KTX file handler read" << texData.data();
#endif

    return new QSGCompressedTextureFactory(texData);
}

bool QSGKtxHandler::checkHeader(const KTXHeader &header)
{
    if (header.endianness != platformEndianIdentifier && header.endianness != inversePlatformEndianIdentifier)
        return false;
    inverseEndian = (header.endianness == inversePlatformEndianIdentifier);
#ifdef KTX_DEBUG
    QMetaEnum tfme = QMetaEnum::fromType<QOpenGLTexture::TextureFormat>();
    QMetaEnum ptme = QMetaEnum::fromType<QOpenGLTexture::PixelType>();
    qDebug("Header of %s:", logName().constData());
    qDebug("  glType: 0x%x (%s)", decode(header.glType), ptme.valueToKey(decode(header.glType)));
    qDebug("  glTypeSize: %u", decode(header.glTypeSize));
    qDebug("  glFormat: 0x%x (%s)", decode(header.glFormat), tfme.valueToKey(decode(header.glFormat)));
    qDebug("  glInternalFormat: 0x%x (%s)", decode(header.glInternalFormat), tfme.valueToKey(decode(header.glInternalFormat)));
    qDebug("  glBaseInternalFormat: 0x%x (%s)", decode(header.glBaseInternalFormat), tfme.valueToKey(decode(header.glBaseInternalFormat)));
    qDebug("  pixelWidth: %u", decode(header.pixelWidth));
    qDebug("  pixelHeight: %u", decode(header.pixelHeight));
    qDebug("  pixelDepth: %u", decode(header.pixelDepth));
    qDebug("  numberOfArrayElements: %u", decode(header.numberOfArrayElements));
    qDebug("  numberOfFaces: %u", decode(header.numberOfFaces));
    qDebug("  numberOfMipmapLevels: %u", decode(header.numberOfMipmapLevels));
    qDebug("  bytesOfKeyValueData: %u", decode(header.bytesOfKeyValueData));
#endif
    return ((decode(header.glType) == 0) &&
            (decode(header.glFormat) == 0) &&
            (decode(header.pixelDepth) == 0) &&
            (decode(header.numberOfFaces) == 1));
}

quint32 QSGKtxHandler::decode(quint32 val)
{
    return inverseEndian ? qbswap<quint32>(val) : val;
}

QT_END_NAMESPACE
