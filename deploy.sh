#! /usr/bin/env bash

instance=${1:-production}
echo "[deploy] instance=$instance"

if [[ $instance == "production" ]]; then
  host=auw1
  dir=/var/www/searchengine-frontend
elif [[ $instance == "beta" ]]; then
  host=hdc1
  dir=/home/hdc/apps/auw211/frontend
else
  echo "[deploy] invalid instance $instance"
  exit 1
fi

echo "[deploy] host=$host dir=$dir"

echo "[deploy] pushing ..."
git push

echo "[deploy] scp'ing ..."
scp dist.tar.gz $host:$dir/

echo "[deploy] ssh'ing ..."
ssh $host bash << EOF
cd $dir
git pull
if [ -d "./.dist" ]; then
  echo "[deploy] moving existing dist dir to dist-old ..."
  rm -rf dist-old
  mv dist dist-old
fi
echo "[deploy] uncompressing ..."
tar xzf dist.tar.gz
EOF

echo "[deploy] done"
