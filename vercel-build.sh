#!/bin/sh

DATABASE_PATH=var/database.sqlite npm run migration:run
DATABASE_PATH=var/database.sqlite npm run seed:run
npm run build

if cp var/database.sqlite dist/database.sqlite; then
    echo "Database deployed successfully"
fi    