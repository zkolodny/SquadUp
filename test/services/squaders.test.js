const assert = require('assert');
const app = require('../../src/app');

describe('\'squaders\' service', () => {
  it('registered the service', () => {
    const service = app.service('squaders');

    assert.ok(service, 'Registered the service');
  });
});
