import nthCheck from "./nth-check";

function firstChild(locus) {
  return locus.position === 0;
}

function lastChild(locus) {
  return locus.position + 1 === locus.total;
}

export function nthChild(locus, selector) {
  return nthCheck(selector, locus.position);
}

const psuedoChecks = {
  ":first-child": firstChild,
  ":last-child": lastChild,
  ":nth-child": nthChild
};

function resolveStyles(styles, locus) {
  const resolvedStyles = {};

  for (const key in styles) {
    if (styles.hasOwnProperty(key)) {
      if (typeof key === "string") {
        const matches = key.match(/^([^\(]+)(?:\((.*?)\))?/);

        if (matches) {
          const [selector, argsStr] = matches.slice(1);
          const args = argsStr ? argsStr.split(",") : [];

          if (psuedoChecks[selector]) {
            if (psuedoChecks[selector](locus, ...args)) {
              Object.assign(resolvedStyles, styles[key]);
            }

            continue;
          }
        }
      }

      resolvedStyles[key] = styles[key];
    }
  }

  return resolvedStyles;
}

export default resolveStyles;
