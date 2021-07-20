#!/bin/zsh
scripts=(
  'yarn format'
  'yarn test:cov'
  'yarn test:inte'
  'yarn test:e2e'
  'yarn build'
)

for script in "${scripts[@]}"
do
  printf '\n=========> %s <=========\n' "$script"
  eval "$script"
done




