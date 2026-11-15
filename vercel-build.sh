#!/bin/sh

DATABASE_READONLY=false npm run migration:run
DATABASE_READONLY=false npm run seed:run
npm run build
mkdir -p dist/var
cp var/database.sqlite dist/var/database.sqlite