import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | string-interpolation', function(hooks) {
  setupRenderingTest(hooks);

  test('It can interpolate strings', async function(assert) {
    this.set('user', {
      firstName: 'Krystan',
      lastName: 'HuffMenne'
    });

    await render(hbs`Hello {{ "{{this.user.firstName}} {{this.user.lastName}}!!!" }}`);

    assert.dom().hasText('Hello Krystan HuffMenne!!!');

    this.set('user.firstName', 'Dianne');

    assert.dom().hasText('Hello Dianne HuffMenne!!!');

    this.set('user.lastName', 'Eramo');

    assert.dom().hasText('Hello Dianne Eramo!!!');

    this.set('user', {
      firstName: 'Krystan',
      lastName: 'HuffMenne'
    });

    assert.dom().hasText('Hello Krystan HuffMenne!!!');
  });
});
