#! /usr/bin/env bash

echo "[deploy] scp'ing ..."
scp next.tar.gz wwa:/var/www/auwsearch.windwardapps.com/open-resource-search/

echo "[deploy] ssh'ing ..."
ssh wwa bash << EOF
cd /var/www/auwsearch.windwardapps.com/open-resource-search
echo "[deploy] uncompressing ..."
tar xzf next.tar.gz
echo "[deploy] restarting ..."
sudo service auw211ui restart
EOF

echo "[deploy] done"
