/****************************************************************************
**
** Copyright (C) 2015 The Qt Company Ltd.
** Contact: http://www.qt.io/licensing/
**
** This file is part of the test suite of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:LGPL21$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and The Qt Company. For licensing terms
** and conditions see http://www.qt.io/terms-conditions. For further
** information use the contact form at http://www.qt.io/contact-us.
**
** GNU Lesser General Public License Usage
** Alternatively, this file may be used under the terms of the GNU Lesser
** General Public License version 2.1 or version 3 as published by the Free
** Software Foundation and appearing in the file LICENSE.LGPLv21 and
** LICENSE.LGPLv3 included in the packaging of this file. Please review the
** following information to ensure the GNU Lesser General Public License
** requirements will be met: https://www.gnu.org/licenses/lgpl.html and
** http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html.
**
** As a special exception, The Qt Company gives you certain additional
** rights. These rights are described in The Qt Company LGPL Exception
** version 1.1, included in the file LGPL_EXCEPTION.txt in this package.
**
** $QT_END_LICENSE$
**
****************************************************************************/

// This JavaScript file is a single, large, imported script.
// It doesn't import any other scripts.
// It is imported from another script.

function testFunc(seedValue) {
    var retn = 5;
    retn += (seedValue * 0.345);
    var firstFactor = calculateFirstFactor(seedValue);
    var secondFactor = calculateSecondFactor(seedValue);
    var modificationTerm = calculateModificationTerm(seedValue);

    // do some regexp matching
    var someString = "This is a random string which we'll perform regular expression matching on to reduce considerably.  This is meant to be part of a complex javascript expression whose evaluation takes considerably longer than the creation cost of QScriptValue.";
    var regexpPattern = new RegExp("is", "i");
    var regexpOutputLength = 0;
    var temp = regexpPattern.exec(someString);
    while (temp == "is") {
        regexpOutputLength += 4;
        regexpOutputLength *= 2;
        temp = regexpPattern.exec(someString);
        if (regexpOutputLength > (seedValue * 3)) {
            temp = "break";
        }
    }

    // spin in a for loop for a while
    var i = 0;
    var j = 0;
    var cumulativeTotal = 3;
    for (i = 20; i > 1; i--) {
        for (j = 31; j > 5; j--) {
            var branchVariable = i + j;
            if (branchVariable % 3 == 0) {
                cumulativeTotal -= secondFactor;
            } else {
                cumulativeTotal += firstFactor;
            }

            if (cumulativeTotal > (seedValue * 50)) {
                break;
            }
        }
    }
    retn *= (1 + (cumulativeTotal * 0.001));
    retn *= (1 + (3.1415962 / seedValue));
    retn /= 2.41497;
    retn -= (seedValue * -1);
    return retn;
}

function calculateFirstFactor(seedValue) {
    var firstFactor = (0.45 * (9.3 / 3.1) - 0.90);
    firstFactor *= (1 + (0.00003 / seedValue));
    return firstFactor;
}

function calculateSecondFactor(seedValue) {
    var secondFactor = 0.78 * (6.3 / 2.1) - (0.39 * 4);
    secondFactor *= (1 + (0.00003 / seedValue));
    return secondFactor;
}

function calculateModificationTerm(seedValue) {
    var modificationTerm = (12 + (9*7) - 54 + 16 - ((calculateFirstFactor(seedValue) * seedValue) / 3) + (4*calculateSecondFactor(seedValue) * seedValue * 1.33)) + (calculateSecondFactor(seedValue) * seedValue);
    modificationTerm = modificationTerm + (33/2) + 19 - (9*2) - (61*3) + 177;
    return modificationTerm;
}
