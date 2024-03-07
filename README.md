ember-template-string-interpolation
==============================================================================

> [!WARNING]
> This addon is deprecated. We very much still would love to see the feature
> materialize, but at this time we don't have the time to push it forward
> ourselves.

An experimental addon that implements the [Handlebars String Interpolation][1]
proposal.

At present, it is just a crude implementation, and only very few limited cases
actually work, and definitely not production ready. You can see the list of
cases we support in the [test][2]. Please do try to poke at it to find cases
that doesn't work and open an issue for each, or better yet, send a PR with a
failing test case.

[1]: https://github.com/emberjs/rfcs/issues/623
[2]: ./tests/integration/components/string-interpolation-test.js


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-template-string-interpolation
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
