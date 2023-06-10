// Copyright 2017 Mathias Bynens. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Mathias Bynens
description: >
  Unicode property escapes for `Script_Extensions=Psalter_Pahlavi`
info: |
  Generated by https://github.com/mathiasbynens/unicode-property-escapes-tests
  Unicode v10.0.0
  Emoji v5.0 (UTR51)
esid: sec-static-semantics-unicodematchproperty-p
features: [regexp-unicode-property-escapes]
includes: [regExpUtils.js]
---*/

const matchSymbols = buildString({
  loneCodePoints: [
    0x000640
  ],
  ranges: [
    [0x010B80, 0x010B91],
    [0x010B99, 0x010B9C],
    [0x010BA9, 0x010BAF]
  ]
});
testPropertyEscapes(
  /^\p{Script_Extensions=Psalter_Pahlavi}+$/u,
  matchSymbols,
  "\\p{Script_Extensions=Psalter_Pahlavi}"
);
testPropertyEscapes(
  /^\p{Script_Extensions=Phlp}+$/u,
  matchSymbols,
  "\\p{Script_Extensions=Phlp}"
);
testPropertyEscapes(
  /^\p{scx=Psalter_Pahlavi}+$/u,
  matchSymbols,
  "\\p{scx=Psalter_Pahlavi}"
);
testPropertyEscapes(
  /^\p{scx=Phlp}+$/u,
  matchSymbols,
  "\\p{scx=Phlp}"
);

const nonMatchSymbols = buildString({
  loneCodePoints: [],
  ranges: [
    [0x00DC00, 0x00DFFF],
    [0x000000, 0x00063F],
    [0x000641, 0x00DBFF],
    [0x00E000, 0x010B7F],
    [0x010B92, 0x010B98],
    [0x010B9D, 0x010BA8],
    [0x010BB0, 0x10FFFF]
  ]
});
testPropertyEscapes(
  /^\P{Script_Extensions=Psalter_Pahlavi}+$/u,
  nonMatchSymbols,
  "\\P{Script_Extensions=Psalter_Pahlavi}"
);
testPropertyEscapes(
  /^\P{Script_Extensions=Phlp}+$/u,
  nonMatchSymbols,
  "\\P{Script_Extensions=Phlp}"
);
testPropertyEscapes(
  /^\P{scx=Psalter_Pahlavi}+$/u,
  nonMatchSymbols,
  "\\P{scx=Psalter_Pahlavi}"
);
testPropertyEscapes(
  /^\P{scx=Phlp}+$/u,
  nonMatchSymbols,
  "\\P{scx=Phlp}"
);
