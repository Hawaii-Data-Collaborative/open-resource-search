#! /usr/bin/env bash

echo "[build] collecting configs ..."
mv app.config.json app.config.dev.json
mv app.config.prod.json app.config.json

echo "[build] building ..."
yarn build

mv app.config.json app.config.prod.json
mv app.config.dev.json app.config.json

echo "[build] compressing ..."
tar czf next.tar.gz .next

echo "[build] done"
