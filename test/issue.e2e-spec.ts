import { Org } from '@salesforce/core';
import { expect } from 'chai';
import { reproduceIssue } from './issue';

describe('issue', function () {
  it('incorrectly DESCRIPTION', async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    expect(reproduceIssue(conn)).to.deep.equal(true);
  });
});
