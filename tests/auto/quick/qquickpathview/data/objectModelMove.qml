/****************************************************************************
**
** Copyright (C) 2018 The Qt Company Ltd.
** Contact: https://www.qt.io/licensing/
**
** This file is part of the test suite of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:BSD$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and The Qt Company. For licensing terms
** and conditions see https://www.qt.io/terms-conditions. For further
** information use the contact form at https://www.qt.io/contact-us.
**
** BSD License Usage
** Alternatively, you may use this file under the terms of the BSD license
** as follows:
**
** "Redistribution and use in source and binary forms, with or without
** modification, are permitted provided that the following conditions are
** met:
**   * Redistributions of source code must retain the above copyright
**     notice, this list of conditions and the following disclaimer.
**   * Redistributions in binary form must reproduce the above copyright
**     notice, this list of conditions and the following disclaimer in
**     the documentation and/or other materials provided with the
**     distribution.
**   * Neither the name of The Qt Company Ltd nor the names of its
**     contributors may be used to endorse or promote products derived
**     from this software without specific prior written permission.
**
**
** THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
** "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
** LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
** A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
** OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
** LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
** DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
** THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
** (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
** OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE."
**
** $QT_END_LICENSE$
**
****************************************************************************/

import QtQml.Models 2.11
import QtQuick 2.11

Item {
    id: root
    width: 400
    height: 400
    visible: true

    property Item pathViewItem

    function destroyView() {
        if (pathViewItem)
            pathViewItem.destroy()
    }

    function newView() {
        pathViewItem = pathViewComponent.createObject(root)
    }

    function move() {
        objectModel.move(0, 1)
    }

    Component {
        id: pathViewComponent

        PathView {
            id: pathView
            objectName: "PathView"
            width: 32 * 3
            height: 32
            model: objectModel

            interactive: false
            snapMode: PathView.SnapToItem
            movementDirection: PathView.Positive
            highlightMoveDuration: 100

            path: Path {
                startX: 16
                startY: 16
                PathLine {
                    x: 16 + (32 * 3)
                    y: 16
                }
            }
        }
    }

    ObjectModel {
        id: objectModel

        Rectangle {
            objectName: "red"
            width: 32
            height: 32
            color: "red"
        }
        Rectangle {
            objectName: "green"
            width: 32
            height: 32
            color: "green"
        }
        Rectangle {
            objectName: "blue"
            width: 32
            height: 32
            color: "blue"
        }
    }
}
