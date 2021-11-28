import { expect } from 'chai';
import { workaround } from '../src/workaround';

describe('workaround', function () {
  it('fixes DESCRIPTION', async () => {
    expect(workaround()).to.deep.equal(true);
  });
});
