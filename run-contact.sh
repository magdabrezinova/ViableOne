#!/bin/bash

for i in {1..3}
do
  echo "Spouštím test po $i. pokus..."
  npx playwright test contact.spec.ts
done