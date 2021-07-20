#!/bin/zsh
scripts=(
  'yarn format'
  'yarn lint'
  'yarn test:cov'
  'yarn test:inte'
  'yarn test:e2e'
  'yarn build'
  'yarn start'
)

for script in "${scripts[@]}"; do
  printf '\n=========> %s <=========\n' "$script"
  eval "$script"
done




