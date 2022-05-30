#!/usr/bin/env bash

echo "## deploy to Developer Edition"
sfdx force:source:deploy --sourcepath force-app -u mdapi-issues-deved

echo "## retrieve CustomLabel:Greeting and Translations:en_US from Developer Edition"
sfdx force:source:retrieve -m "CustomLabel:Greeting,Translations:en_US" -u mdapi-issues-deved

echo "## git diff"
if git diff --exit-code -- force-app; then
  echo "## Reproduction successful."
  echo "## We only got the requested translation for the CustomLabel from the Developer Edition."
else
  echo "## Reproduction unsuccessful."
  exit 1;
fi
