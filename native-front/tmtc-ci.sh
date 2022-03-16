#!/bin/zsh
scripts=(
  'yarn test'
  'yarn test:inte'
  'yarn start'
)

for script in "${scripts[@]}"; do
  printf '\n======================================================> %s \n\n' "$script"
  eval "$script"
done