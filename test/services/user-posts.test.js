const assert = require('assert');
const app = require('../../src/app');

describe('\'UserPosts\' service', () => {
  it('registered the service', () => {
    const service = app.service('userposts');

    assert.ok(service, 'Registered the service');
  });
});
