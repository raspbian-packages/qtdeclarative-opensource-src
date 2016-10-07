TEMPLATE = subdirs

PUBLICTESTS += \
    qqmlenginedebugservice \
    qqmlinspector \
    qpacketprotocol \
    qqmlenginedebuginspectorintegrationtest \
    qqmlenginecontrol \
    qqmldebuggingenabler \
    qqmlnativeconnector

PRIVATETESTS += \
    qqmldebugclient \
    qqmldebuglocal \
    qqmldebugservice

SUBDIRS += $$PUBLICTESTS

contains(QT_CONFIG, private_tests) {
    SUBDIRS += $$PRIVATETESTS
}
