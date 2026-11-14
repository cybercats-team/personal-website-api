#!/bin/sh

DATABASE_PATH=var/database.sqlite DATABASE_READONLY=false npm run migration:run
DATABASE_PATH=var/database.sqlite DATABASE_READONLY=false npm run seed:run
npm run build

if cp var/database.sqlite dist/database.sqlite; then
    echo "Database deployed successfully"
fi    