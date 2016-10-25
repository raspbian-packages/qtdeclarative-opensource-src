import QtQuick 2.0
Rectangle {
    width: 400
    height: 400
    Rectangle {
        id: rect
        objectName: "MyRect"
        width: 100; height: 100; color: "green"
        Behavior on border.width { NumberAnimation { duration: 500; } }
    }
    MouseArea {
        id: clicker
        anchors.fill: parent
    }
    states: State {
        name: "moved"
        when: clicker.pressed
        PropertyChanges {
            target: rect
            border.width: 4;
        }
    }
}
