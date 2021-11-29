# retrieve-behavior-scratch-org

> Minimal working example to demonstrate the Metadata API behaves differently when retrieving Metadata from a Scratch Org vs. other Org

[![Actions Status](https://github.com/mdapi-issues/retrieve-behavior-scratch-org/workflows/Test/badge.svg)](https://github.com/mdapi-issues/retrieve-behavior-scratch-org/actions)

Typically, when retrieving `Profiles` or `Translations` from an org, we only get the content for the other metadata types referenced in package.xml.

> ... the files returned in the .translations folder only include translations for the other metadata types referenced in package.xml.

see [docs for Translations](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_translations.htm)

What the docs don't mention, when we retrieve from a Scratch Org we are getting the full content.

## Steps to reproduce the issue (in a scratch org)

Create a scratch org with Translation Workbench enabled

```console
sfdx force:org:create -f config/project-scratch-def.json -s
```

push a CustomLabel and the Translations for it

```console
sfdx force:source:push
```

retrieve explicitly only `CustomLabel:Greeting` and `Translations:en_US`

```console
sfdx force:source:retrieve -m "CustomLabel:Greeting,Translations:en_US"
```

Note that we now have retrieved the complete Translations content although we only wanted to retrieve a the translation for the given CustomLabel.

```console
git diff
```

```diff
diff --git a/force-app/main/default/translations/en_US.translation-meta.xml b/force-app/main/default/translations/en_US.translation-meta.xml
index f5ebb52..e6ecb9d 100644
--- a/force-app/main/default/translations/en_US.translation-meta.xml
+++ b/force-app/main/default/translations/en_US.translation-meta.xml
@@ -4,4 +4,281 @@
         <label>Hello</label>
         <name>Greeting</name>
     </customLabels>
+    <prompts>
+        <name>SelfSupportDataImportWizard</name>
+        <promptVersions>
+            <name>Self Support Data Import Wizard</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudTrailPreconfiguredDashboardsGuide</name>
+        <promptVersions>
+            <name>Sales Cloud Trail Pre-configured Dashboards Guide</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudTrialKanbanVideo</name>
+        <promptVersions>
+            <name>Sales Cloud Trial Kanban Video</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ReleaseReadinessSales</name>
+        <promptVersions>
+            <name>Release Readiness Sales</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudTrialHomePage</name>
+        <promptVersions>
+            <name>Sales Cloud Trial Home Page</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudCoreReportsTab</name>
+        <promptVersions>
+            <name>Sales Cloud Core Reports Tab</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ReleaseReadinessSandboxSales</name>
+        <promptVersions>
+            <name>Release Readiness Sandbox Sales</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudCoreChatterTab</name>
+        <promptVersions>
+            <name>Sales Cloud Core Chatter Tab</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudTrialCasesTab</name>
+        <promptVersions>
+            <name>Service Cloud Trial Cases Tab</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudTrialDashboardGuide</name>
+        <promptVersions>
+            <name>Service Cloud Trial Dashboard Guide</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ReleaseReadiness</name>
+        <promptVersions>
+            <name>Release Readiness</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudTrialHomepageGuide</name>
+        <promptVersions>
+            <name>Service Cloud Trial Homepage Guide</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudCoreCases</name>
+        <promptVersions>
+            <name>Service Cloud Core Cases</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>GlobalActionsFinal</name>
+        <promptVersions>
+            <name>Global Actions Final</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudCoreHomepage</name>
+        <promptVersions>
+            <name>Service Cloud Core Homepage</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudTrialContactsListViewsVideo</name>
+        <promptVersions>
+            <name>Sales Cloud Trial Contacts List Views Video</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudCoreHomepage</name>
+        <promptVersions>
+            <name>Sales Cloud Core Homepage</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ReleaseReadinessServiceSandbox</name>
+        <promptVersions>
+            <name>Release Readiness Service Sandbox</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudTrialChatterGuide</name>
+        <promptVersions>
+            <name>Sales Cloud Trial Chatter Guide</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudCoreReportsTab</name>
+        <promptVersions>
+            <name>Service Cloud Core Reports Tab</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudCoreContactsTab</name>
+        <promptVersions>
+            <name>Sales Cloud Core Contacts Tab</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>EssActivitiesFlow</name>
+        <promptVersions>
+            <name>Activities Flow Step 1</name>
+            <stepNumber>1</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Activities Flow Step 2</name>
+            <stepNumber>2</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Activities Flow Step 3</name>
+            <stepNumber>3</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Activities Flow Step 4</name>
+            <stepNumber>4</stepNumber>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudTrialChatterGuide</name>
+        <promptVersions>
+            <name>Service Cloud Trial Chatter Guide</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>ServiceCloudCoreChatter</name>
+        <promptVersions>
+            <name>Service Cloud Core Chatter</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCloudCoreOpportunitiesTab</name>
+        <promptVersions>
+            <name>Sales Cloud Core Opportunities Tab</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesCoreQuoteAdminCpq</name>
+        <promptVersions>
+            <name>Sales Core Quote Admin to CPQ</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>EssModifiedAccountsFlow</name>
+        <promptVersions>
+            <name>Modified Accounts Flow Step 1</name>
+            <stepNumber>1</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Modified Accounts Flow Step 2</name>
+            <stepNumber>2</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Modified Accounts Flow Step 3</name>
+            <stepNumber>3</stepNumber>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>EssOpptysFlow</name>
+        <promptVersions>
+            <name>Opptys Flow Step 1</name>
+            <stepNumber>1</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Opptys Flow Step 2</name>
+            <stepNumber>2</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Opptys Flow Step 3</name>
+            <stepNumber>3</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>Opptys Flow Step 4</name>
+            <stepNumber>4</stepNumber>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>SalesHVSDialer</name>
+        <promptVersions>
+            <name>Sales HVS Dialer</name>
+        </promptVersions>
+    </prompts>
+    <prompts>
+        <name>IAGFeatureAdoption</name>
+        <promptVersions>
+            <name>IAG Feature Adoption Step 1</name>
+            <stepNumber>1</stepNumber>
+        </promptVersions>
+        <promptVersions>
+            <name>IAG Feature Adoption Step 2</name>
+            <stepNumber>2</stepNumber>
+        </promptVersions>
+    </prompts>
+    <quickActions>
+        <label><!-- LogACall --></label>
+        <name>LogACall</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewAccount --></label>
+        <name>NewAccount</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewCase --></label>
+        <name>NewCase</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewContact --></label>
+        <name>NewContact</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewEvent --></label>
+        <name>NewEvent</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewGroup --></label>
+        <name>NewGroup</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewLead --></label>
+        <name>NewLead</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewNote --></label>
+        <name>NewNote</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewOpportunity --></label>
+        <name>NewOpportunity</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- NewTask --></label>
+        <name>NewTask</name>
+    </quickActions>
+    <quickActions>
+        <label><!-- SendEmail --></label>
+        <name>SendEmail</name>
+    </quickActions>
+    <reportTypes>
+        <description><!-- Screen Flows --></description>
+        <label><!-- Screen Flows --></label>
+        <name>screen_flows_prebuilt_crt</name>
+        <sections>
+            <label><!-- Flow Interview Log Entries --></label>
+            <name>Flow Interview Log Entries</name>
+        </sections>
+        <sections>
+            <label><!-- Flow Interview Logs --></label>
+            <name>Flow Interview Logs</name>
+        </sections>
+    </reportTypes>
 </Translations>
```
