#!/usr/bin/env sh

cat >.build/cjs/package.json <<!EOF
{
  "type": "commonjs",
  "imports": {
    "#src/config": "./config-cjs.js",
    "#src/*": "./*.js"
  }
}
!EOF

cat >.build/esm/package.json <<!EOF
{
  "type": "module",
  "imports": {
    "#src/config": "./config-esm.js",
    "#src/*": "./*.js"
  }
}
!EOF
