const assert = require('assert');
const app = require('../../src/app');

describe('\'RSVP\' service', () => {
  it('registered the service', () => {
    const service = app.service('rsvp');

    assert.ok(service, 'Registered the service');
  });
});
