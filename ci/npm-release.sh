#! bin/bash
set -e -u

yarn run release:prepare
yarn publish
