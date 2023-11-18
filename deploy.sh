#! /usr/bin/env bash

echo "[deploy] pushing ..."
git push beta main

echo "[deploy] scp'ing ..."
scp next.tar.gz auw1:/var/www/searchengine-frontend/

echo "[deploy] ssh'ing ..."
ssh auw1 bash << EOF
cd /var/www/searchengine-frontend
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
