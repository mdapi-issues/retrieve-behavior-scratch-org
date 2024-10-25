import { expect } from "chai";
import { execa } from "execa";
import { join } from "path";
import { isSourceTrackingEnabled as isSourceTrackingEnabledFunc } from "./helper.js";

const DEFAULT_PACKAGE_DIR = join("force-app", "main", "default");
const recordTypesPath = join(
  DEFAULT_PACKAGE_DIR,
  "objects",
  "Dummy__c",
  "recordTypes",
  "DummyRecordType.recordType-meta.xml"
);

describe("Record Types with Picklist Values", function () {
  let isSourceTrackingEnabled;

  before(async function () {
    this.timeout(60 * 1000);
    isSourceTrackingEnabled = await isSourceTrackingEnabledFunc();
  });

  it("should deploy a CustomObject with RecordTypes and CustomFields with Picklists", async function () {
    this.timeout(300 * 1000);
    await execa("sf", [
      "project",
      "deploy",
      "start",
      "--source-dir",
      join("sfdx-source", "record-types"),
    ]);
  });

  it("should retrieve the RecordType without context", async function () {
    this.timeout(300 * 1000);
    await execa("sf", [
      "project",
      "retrieve",
      "start",
      "--metadata",
      "RecordType:Dummy__c.DummyRecordType",
    ]);
  });

  it("should return picklistValues in the RecordType for a Scratch Org", async function () {
    if (!isSourceTrackingEnabled) {
      this.skip();
    }
    expect(async () => {
      await execa("grep", ["--quiet", "<picklistValues>", recordTypesPath]);
    }).not.to.throw();
  });

  it("should return picklistValues in the RecordType for a regular Org", async function () {
    if (isSourceTrackingEnabled) {
      this.skip();
    }
    let err;
    try {
      await execa("grep", ["--quiet", "<picklistValues>", recordTypesPath]);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(undefined);
    expect(err.exitCode).to.equal(1);
  });

  after("remove the CustomObject", async function () {
    await execa("rm", ["-rf", DEFAULT_PACKAGE_DIR]);
  });
});
