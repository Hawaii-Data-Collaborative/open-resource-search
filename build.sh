#! /usr/bin/env bash

instance=${1:-production}
echo "[deploy] instance=$instance"

if [[ $instance == "production" ]]; then
  configFile=app.config.prod.json
  buildCmd="yarn build"
elif [[ $instance == "beta" ]]; then
  configFile=app.config.beta.json
  buildCmd="yarn build:beta"
else
  echo "[deploy] invalid instance $instance"
  exit 1
fi

echo "[deploy] configFile=$configFile"

echo "[build] collecting configs ..."
mv app.config.json app.config.dev.json
mv $configFile app.config.json

echo "[build] building ..."
$buildCmd

mv app.config.json $configFile
mv app.config.dev.json app.config.json

echo "[build] compressing ..."
COPYFILE_DISABLE=1 tar -cz --no-xattrs -f dist.tar.gz dist

echo "[build] done"
