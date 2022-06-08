# retrieve-behavior-scratch-org

> Minimal working example to demonstrate the Metadata API behaves differently when retrieving Metadata from a Scratch Org vs. other Org

[![Actions Status](https://github.com/mdapi-issues/retrieve-behavior-scratch-org/workflows/Test/badge.svg)](https://github.com/mdapi-issues/retrieve-behavior-scratch-org/actions)

Typically, when retrieving `Profiles`, `RecordTypes` or `Translations` from an org, we only get the content for the other metadata types referenced in package.xml.

However if the org (Scratch Org or Sandbox) has Source Tracking enabled, we are getting the full content.

> With source tracking, retrieving profiles returns profile information pertaining to anything else specified in the package.xml file plus any components getting tracked by source tracking. That includes any entity for which a change exists between your local project and the org.

Source: Salesforce DX Developer Guide [Retrieve and Pull Changes to Profiles with Source Tracking](https://developer.salesforce.com/docs/atlas.en-us.238.0.sfdx_dev.meta/sfdx_dev/sfdx_dev_source_tracking_source_tracking_profiles.htm?q=behav)

### Profiles

> ... the returned .profile files only include security settings for the other metadata types referenced in the retrieve request. Exceptions include user permissions, IP address ranges, and login hours, which are always retrieved.

see [docs for Profiles](https://developer.salesforce.com/docs/atlas.en-us.238.0.api_meta.meta/api_meta/meta_profile.htm?q=profile)

### RecordTypes

The RecordType only contains the `<picklistValues>` for the `CustomField`s requested in the same retrieval.

### Translations

> ... the files returned in the .translations folder only include translations for the other metadata types referenced in package.xml.

see [docs for Translations](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_translations.htm)

## Reproduction

This repo contains a test suite to reproduce

- the default behavior for a Developer Edition
- the different behavior for a Scratch Org
