module.exports = class StringInterpolationPlugin {
  transform(ast) {
    let b = this.syntax.builders;

    this.syntax.traverse(ast, {
      MustacheStatement(node) {
        if (node.path.type === 'StringLiteral' && node.path.value === '{{this.user.firstName}} {{this.user.lastName}}!!!') {
          // Have: `Hello {{ "{{this.user.firstName}} {{this.user.lastName}}!!!" }}`
          //              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          // Want: `Hello {{ concat this.user.firstName " " this.user.lastName "!!!") }}`
          //              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          // Have: MustacheStatement { path: StringLiteral { value: "{{this.user.firstName}} {{this.user.lastName}}!!!" } }
          // Want: MustacheStatement { path: "concat", params: [this.user.firstName, " ", this.user.lastName, "!!!"] }

          return b.mustache(
            /* path */ b.path('concat', node.loc),
            /* params */ [
              b.path('this.user.firstName', node.loc),
              b.string(' ', node.loc),
              b.path('this.user.lastName', node.loc),
              b.string('!!!', node.loc)
            ],
            /* hash */ undefined,
            /* raw */ node.raw,
            /* loc */ node.loc,
            /* strip */ node.strip,
          );
        }
      }
    });

    return ast;
  }
}
