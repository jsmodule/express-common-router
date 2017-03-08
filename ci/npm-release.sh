#! bin/bash
set -e -u

yarn install
yarn run build
yarn publish
