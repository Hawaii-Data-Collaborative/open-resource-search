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
mv .env .env.development
mv .env.production .env
mv app.config.json app.config.dev.json
mv $configFile app.config.json

if [[ -d "dist" ]]; then
  if [[ -d "dist-old" ]]; then
    echo "[build] removing old 'dist-old' directory ..."
    rm -rf dist-old
  fi

  echo "[build] 'dist' directory exists, moving to 'dist-old' ..."
  mv dist dist-old
fi

echo "[build] building ..."
$buildCmd

mv app.config.json $configFile
mv app.config.dev.json app.config.json
mv .env .env.production
mv .env.development .env

echo "[build] done"
