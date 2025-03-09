#! /bin/bash

set -e

echo "- - - - $1"
date +%F

docker stop electronic
docker rm electronic
docker run -d --rm -p 8082:3030 -v $(pwd)/database.db:/app/database.db --name electronic einarvalur/electronic:$1
