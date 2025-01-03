import { expect } from "chai";
import { execa } from "execa";
import { join } from "path";
import { isSourceTrackingEnabled as isSourceTrackingEnabledFunc } from "./helper.js";

const DEFAULT_PACKAGE_DIR = join("force-app", "main", "default");
const profilePath = join(
  DEFAULT_PACKAGE_DIR,
  "profiles",
  "Admin.profile-meta.xml"
);

describe("Profiles", function () {
  let isSourceTrackingEnabled;

  before(async function () {
    this.timeout(60 * 1000);
    isSourceTrackingEnabled = await isSourceTrackingEnabledFunc();
  });

  it("should deploy a CustomField on Account", async function () {
    this.timeout(300 * 1000);
    await execa("sf", [
      "project",
      "deploy",
      "start",
      "--source-dir",
      join("sfdx-source", "profiles"),
    ]);
  });

  it("should retrieve a Profile without context", async function () {
    this.timeout(300 * 1000);
    await execa("sf", [
      "project",
      "retrieve",
      "start",
      "--metadata",
      "Profile:Admin",
    ]);
  });

  it("should return field permissions in the Profile for a Scratch Org", async function () {
    if (!isSourceTrackingEnabled) {
      this.skip();
    }
    expect(async () => {
      await execa("grep", ["--quiet", "<fieldPermissions>", profilePath]);
    }).not.to.throw();
  });

  it("should not return field permissions in the Profile for a regular Org", async function () {
    if (isSourceTrackingEnabled) {
      this.skip();
    }
    let err;
    try {
      await execa("grep", ["--quiet", "<fieldPermissions>", profilePath]);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
    expect(err.exitCode).to.equal(1);
  });

  after("remove the CustomField on Account", async function () {
    this.timeout(300 * 1000);
    await execa("sf", [
      "project",
      "delete",
      "source",
      "--no-prompt",
      "--metadata",
      "CustomField:Account.Dummy01__c",
    ]);
    await execa("rm", ["-rf", DEFAULT_PACKAGE_DIR]);
  });
});
