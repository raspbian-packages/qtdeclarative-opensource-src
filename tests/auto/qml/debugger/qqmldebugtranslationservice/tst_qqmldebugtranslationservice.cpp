/****************************************************************************
**
** Copyright (C) 2020 The Qt Company Ltd.
** Contact: https://www.qt.io/licensing/
**
** This file is part of the test suite of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:GPL-EXCEPT$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and The Qt Company. For licensing terms
** and conditions see https://www.qt.io/terms-conditions. For further
** information use the contact form at https://www.qt.io/contact-us.
**
** GNU General Public License Usage
** Alternatively, this file may be used under the terms of the GNU
** General Public License version 3 as published by the Free Software
** Foundation with exceptions as appearing in the file LICENSE.GPL3-EXCEPT
** included in the packaging of this file. Please review the following
** information to ensure the GNU General Public License requirements will
** be met: https://www.gnu.org/licenses/gpl-3.0.html.
**
** $QT_END_LICENSE$
**
****************************************************************************/

//QQmlDebugTest
#include <debugutil_p.h>
#include <qqmldebugprocess_p.h>

#include <private/qqmldebugclient_p.h>
#include <private/qqmldebugtranslationclient_p.h>
#include <private/qqmldebugconnection_p.h>
#include <private/qpacket_p.h>

#include <QtCore/qstring.h>
#include <QtCore/qlibraryinfo.h>
#include <QtTest/qtest.h>

const char *QMLFILE = "test.qml";

class tst_QQmlDebugTranslationService : public QQmlDebugTest
{
    Q_OBJECT

private slots:
    void pluginConnection();

private:
    QList<QQmlDebugClient *> createClients() override;
    QPointer<QQmlDebugTranslationClient> m_client;
};

QList<QQmlDebugClient *> tst_QQmlDebugTranslationService::createClients()
{
    m_client = new QQmlDebugTranslationClient(m_connection);

    QObject::connect(m_client, &QQmlDebugClient::stateChanged, m_client, [this](QQmlDebugClient::State newState) {
        QCOMPARE(newState, m_client->state());
    });

    return {m_client};
}

void tst_QQmlDebugTranslationService::pluginConnection()
{
    auto executable = QStringLiteral(TESTBINDIR "/qml");
    auto services = "DebugTranslation";
    auto extraArgs = testFile(QMLFILE);
    auto block = true;

    auto result = QQmlDebugTest::connectTo(executable, services, extraArgs, block);
    QCOMPARE(result, ConnectSuccess);
}

QTEST_MAIN(tst_QQmlDebugTranslationService)

#include "tst_qqmldebugtranslationservice.moc"
