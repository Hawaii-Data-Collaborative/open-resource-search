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
scp next.tar.gz $host:$dir/

echo "[deploy] ssh'ing ..."
ssh $host bash << EOF
cd $dir
git pull
if [ -d "./.next" ]; then
  echo "[deploy] moving existing .next dir to .next-old ..."
  rm -rf .next-old
  mv .next .next-old
fi
echo "[deploy] uncompressing ..."
tar xzf next.tar.gz
echo "[deploy] restarting ..."
sudo ./restart.sh
EOF

echo "[deploy] done"
