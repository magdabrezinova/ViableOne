#!/bin/bash

for i in {1..10}
do
  echo "Spouštím test: $i. pokus..."
  npx playwright test contact.spec.ts --workers=1
done