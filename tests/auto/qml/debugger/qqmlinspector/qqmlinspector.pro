CONFIG += testcase
TARGET = tst_qqmlinspector

QT += qml testlib gui-private core-private
osx:CONFIG -= app_bundle

SOURCES += tst_qqmlinspector.cpp

include(../shared/qqmlinspectorclient.pri)
include(../shared/debugutil.pri)

TESTDATA = data/*
