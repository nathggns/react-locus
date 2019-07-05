import nthCheck from "nth-check";

function check(selector, position) {
  console.log(selector, position);
  return nthCheck(selector)(position);
}

export default check;
