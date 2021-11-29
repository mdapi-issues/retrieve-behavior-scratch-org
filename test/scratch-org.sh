#!/usr/bin/env bash

echo "## retrieve CustomLabel:Greeting and Translations:en_US from Scratch Org"
sfdx force:source:retrieve -m "CustomLabel:Greeting,Translations:en_US"

echo "## git diff"
if ! git diff --exit-code -- force-app; then
  echo "## Reproduction successful."
  echo "## We got the full content of the Translations from the Scratch Org although we only wanted the translation for the given CustomLabel."
else
  echo "## Reproduction unsuccessful."
  echo "## Apparently the behavior changed again."
  exit 1;
fi
