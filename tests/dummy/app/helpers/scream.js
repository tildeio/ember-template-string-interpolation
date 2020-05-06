import { helper } from '@ember/component/helper';

export default helper(function scream(params, hash) {
  let text = params[0] || hash.text;
  return text.toUpperCase();
});
