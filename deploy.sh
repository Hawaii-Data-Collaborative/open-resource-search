#! /usr/bin/env bash

instance=${1:-production}
echo "[deploy] instance=$instance"

if [[ $instance == "production" ]]; then
  host=auw1
  dir=/var/www/searchengine-frontend/dist
elif [[ $instance == "beta" ]]; then
  host=hdc1
  dir=/home/hdc/apps/auw211/frontend/dist
else
  echo "[deploy] invalid instance $instance"
  exit 1
fi

echo "[deploy] host=$host dir=$dir"
rsync -avz dist/ $host:$dir --delete
echo "[deploy] done"

