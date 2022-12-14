#! /usr/bin/env bash

echo "[deploy] pushing ..."
git push beta main

echo "[deploy] scp'ing ..."
scp next.tar.gz wwa:/var/www/auwsearch.windwardapps.com/open-resource-search/

echo "[deploy] ssh'ing ..."
ssh wwa bash << EOF
cd /var/www/auwsearch.windwardapps.com/open-resource-search
git reset --hard
if [ -d "./.next" ]; then
  echo "[deploy] moving existing .next dir to .next-old ..."
  rm -rf .next-old
  mv .next .next-old
fi
echo "[deploy] uncompressing ..."
tar xzf next.tar.gz
echo "[deploy] restarting ..."
sudo service auw211ui restart
EOF

echo "[deploy] done"
