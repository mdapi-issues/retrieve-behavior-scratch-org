import { Org } from "@salesforce/core";

export async function isSourceTrackingEnabled() {
  const conn = (await Org.create({})).getConnection();
  try {
    await conn.tooling.query("SELECT Id FROM SourceMember LIMIT 1");
  } catch (e) {
    if (e.name === "INVALID_TYPE") {
      return false;
    }
    throw e;
  }
  return true;
}
