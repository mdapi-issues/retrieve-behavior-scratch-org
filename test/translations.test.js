import { expect } from "chai";
import { execa } from "execa";
import { join } from "path";
import { isScratchOrg as isScratchOrgFunc } from "./helper.js";

const DEFAULT_PACKAGE_DIR = join("force-app", "main", "default");
const translationsPath = join(
  DEFAULT_PACKAGE_DIR,
  "translations",
  "en_US.translation-meta.xml"
);

describe("Translations", function () {
  let isScratchOrg;
  before(async () => {
    isScratchOrg = await isScratchOrgFunc();
  });

  it("should deploy Translations for a CustomLabel", async function () {
    this.timeout(300 * 1000);
    await execa("sfdx", [
      "force:source:deploy",
      "--sourcepath",
      join("sfdx-source", "translations"),
    ]);
  });
  it("should retrieve Translations without context of a CustomLabel", async function () {
    this.timeout(300 * 1000);
    await execa("sfdx", ["force:source:retrieve", "-m", "Translations:en_US"]);
  });
  it("should return custom label translations for a Scratch Org", async function () {
    if (!isScratchOrg) {
      this.skip();
    }
    expect(async () => {
      await execa("grep", ["--quiet", "<customLabels>", translationsPath]);
    }).not.to.throw();
  });
  it("should not return custom label translations for a regular Org", async function () {
    if (isScratchOrg) {
      this.skip();
    }
    let err;
    try {
      await execa("grep", ["--quiet", "<customLabels>", translationsPath]);
    } catch (e) {
      err = e;
      console.error(e);
    }
    expect(err).to.not.equal(undefined);
    expect(err.exitCode).to.equal(1);
  });
  after("remove the CustomLabel", async function () {
    this.timeout(300 * 1000);
    await execa("sfdx", [
      "force:source:delete",
      "--noprompt",
      "--metadata",
      "CustomLabel:Greeting",
    ]);
    await execa("rm", ["-rf", DEFAULT_PACKAGE_DIR]);
  });
});
