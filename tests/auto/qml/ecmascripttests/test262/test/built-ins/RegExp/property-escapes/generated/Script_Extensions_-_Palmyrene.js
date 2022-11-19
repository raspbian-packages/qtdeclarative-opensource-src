// Copyright 2017 Mathias Bynens. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Mathias Bynens
description: >
  Unicode property escapes for `Script_Extensions=Palmyrene`
info: |
  Generated by https://github.com/mathiasbynens/unicode-property-escapes-tests
  Unicode v10.0.0
  Emoji v5.0 (UTR51)
esid: sec-static-semantics-unicodematchproperty-p
features: [regexp-unicode-property-escapes]
includes: [regExpUtils.js]
---*/

const matchSymbols = buildString({
  loneCodePoints: [],
  ranges: [
    [0x010860, 0x01087F]
  ]
});
testPropertyEscapes(
  /^\p{Script_Extensions=Palmyrene}+$/u,
  matchSymbols,
  "\\p{Script_Extensions=Palmyrene}"
);
testPropertyEscapes(
  /^\p{Script_Extensions=Palm}+$/u,
  matchSymbols,
  "\\p{Script_Extensions=Palm}"
);
testPropertyEscapes(
  /^\p{scx=Palmyrene}+$/u,
  matchSymbols,
  "\\p{scx=Palmyrene}"
);
testPropertyEscapes(
  /^\p{scx=Palm}+$/u,
  matchSymbols,
  "\\p{scx=Palm}"
);

const nonMatchSymbols = buildString({
  loneCodePoints: [],
  ranges: [
    [0x00DC00, 0x00DFFF],
    [0x000000, 0x00DBFF],
    [0x00E000, 0x01085F],
    [0x010880, 0x10FFFF]
  ]
});
testPropertyEscapes(
  /^\P{Script_Extensions=Palmyrene}+$/u,
  nonMatchSymbols,
  "\\P{Script_Extensions=Palmyrene}"
);
testPropertyEscapes(
  /^\P{Script_Extensions=Palm}+$/u,
  nonMatchSymbols,
  "\\P{Script_Extensions=Palm}"
);
testPropertyEscapes(
  /^\P{scx=Palmyrene}+$/u,
  nonMatchSymbols,
  "\\P{scx=Palmyrene}"
);
testPropertyEscapes(
  /^\P{scx=Palm}+$/u,
  nonMatchSymbols,
  "\\P{scx=Palm}"
);
