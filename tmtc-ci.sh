#!/bin/zsh
scripts=(
  'yarn format'
  'yarn lint'
  'yarn test'
  'yarn test:inte'
  'yarn test:e2e'
  'yarn test:cov'
  'yarn build'
  'yarn start'
)

for script in "${scripts[@]}"; do
  printf '\n======================================================> %s \n\n' "$script"
  eval "$script"
done




