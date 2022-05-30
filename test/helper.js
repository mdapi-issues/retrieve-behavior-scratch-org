import { Org } from "@salesforce/core";

export async function isScratchOrg() {
  const conn = (await Org.create({})).getConnection();
  const { records } = await conn.query(
    "SELECT IsSandbox, TrialExpirationDate FROM Organization"
  );
  const organization = records[0];
  return organization.IsSandbox && organization.TrialExpirationDate;
}
