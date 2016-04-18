#!/bin/bash
# Usage: deploy.sh [deploy-url]
set -e

# Don't deploy private code
rm -rf RedoxEngine_repo

# Commit any changes from the build
git config user.name "CircleCI Deployment"
git config user.email "lt@redoxengine.com"
git add --force .
git commit -m "Automatic Deployment"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "$1" master:gh-pages > /dev/null 2>&1