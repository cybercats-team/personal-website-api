#!/bin/sh

DATABASE_READONLY=false npm run migration:run
DATABASE_READONLY=false npm run seed:run
npm run build