#! /bin/bash

# set -e

echo "[$(date +"%F %T")] - - - - $1"

if [ "$(docker ps -a --filter name=electronic | grep -c electronic)" -gt 0 ]; then
    docker stop electronic
    echo "✔️ Container 'electronic' stopped."
else
  echo "⚠️ Container 'electronic' not running, can't stop."
fi

if [ "$(docker ps -a --filter name=electronic | grep -c electronic)" -gt 0 ]; then
    docker rm electronic
    echo "✔️ Container 'electronic' removed."
else
  echo "⚠️ Container 'electronic' doesn't exist, can't remove"
fi

docker run -d --rm -p 8082:3030 -v $(pwd)/database.db:/app/database.db --name electronic einarvalur/electronic:$1
echo "✔️ Container 'electronic:$1' started."
echo -e "\n"
