/****************************************************************************
**
** Copyright (C) 2017 The Qt Company Ltd.
** Contact: https://www.qt.io/licensing/
**
** This file is part of the examples of the Qt Toolkit.
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

import QtQuick 2.0

Item {
    id: selector

    property alias list: view.model
    property alias selectedIndex: view.currentIndex
    property alias label: labelText.text
    property bool expanded

    width: 100; height: labelText.implicitHeight + 26

    Rectangle {
        anchors { left: parent.left; right: parent.right; bottom: parent.bottom; }

        height: labelText.implicitHeight + 4 + (expanded ? 20 * view.count : 20)
        Behavior on height { NumberAnimation { duration: 300 } }

        radius: 2
        border.width: 1
        border.color: "yellow"
        color: "yellow"

        MouseArea {
            anchors.fill: parent

            onClicked: selector.expanded = !selector.expanded

            Text {
                id: labelText
                anchors { left: parent.left; top: parent.top; margins: 2 }
            }

            Rectangle {
                anchors {
                    left: parent.left; top: labelText.bottom;
                    right: parent.right; bottom: parent.bottom;
                    margins: 2
                    leftMargin: 10
                }

                radius: 2
                color: "white"

                ListView {
                    id: view

                    anchors.fill: parent

                    clip: true

                    delegate: Text {
                        anchors { left: parent.left; right: parent.right }
                        height: 20

                        verticalAlignment: Text.AlignVCenter

                        text: modelData

                        MouseArea {
                            anchors.fill: parent

                            onClicked: {
                                view.currentIndex = index
                                selector.expanded = !selector.expanded
                            }
                        }
                    }
                    highlight: Rectangle {
                        anchors { left: parent.left; right: parent.right }
                        height: 20
                        radius: 2

                        color: "yellow"
                    }
                }
            }
        }
    }
}
