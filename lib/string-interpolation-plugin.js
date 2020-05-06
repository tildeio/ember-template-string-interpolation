module.exports = class StringInterpolationPlugin {
  transform(ast) {
    let { builders: b, parse } = this.syntax;

    this.syntax.traverse(ast, {
      MustacheStatement(node) {
        if (isInterpolatedString(node.path)) {
          let value = node.path.value;
          let result = parse(`<p foo="${value}"/>`);
          let element = result.body[0]; // <p>
          let foo = element.attributes[0]; // <p foo=?>
          let { parts } = foo.value;
          let params = parts.map(node => {
            switch (node.type) {
              case 'MustacheStatement':
                return node.path;

              case 'TextNode':
                return b.string(node.chars);

              default:
                throw new Error(`Don't know how to handle ${node.type} yet`);
            }
          });

          return b.mustache(
            /* path */ b.path('concat', node.loc),
            /* params */ params,
            /* hash */ undefined,
            /* raw */ node.raw,
            /* loc */ node.loc,
            /* strip */ node.strip,
          );
        }
      },

      StringLiteral(node) {
        if (isInterpolatedString(node)) {
          let { value } = node;
          let result = parse(`<p foo="${value}"/>`);
          let element = result.body[0]; // <p>
          let foo = element.attributes[0]; // <p foo=?>
          let { parts } = foo.value;
          let params = parts.map(node => {
            switch (node.type) {
              case 'MustacheStatement':
                return node.path;

              case 'TextNode':
                return b.string(node.chars);

              default:
                throw new Error(`Don't know how to handle ${node.type} yet`);
            }
          });

          return b.sexpr(
            /* path */ b.path('concat', node.loc),
            /* params */ params,
            /* hash */ undefined,
            /* loc */ node.loc
          );
        }
      }
    });

    return ast;
  }
}

function isInterpolatedString(node) {
  return node.type === 'StringLiteral' && node.value.match(/{{.+}}/);
}
