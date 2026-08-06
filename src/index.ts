import { getPasswordArg } from "./cli.js";
import { checkStrength } from "./strength.js";
import { checkBreach } from "./hibp.js";

async function main() {
  const password = getPasswordArg();

  const strength = checkStrength(password);
  const breach = await checkBreach(password);

  console.log(`strength: ${strength.strength}`);
  if (!strength.passed) {
    console.log(`failed rules: ${strength.failedRules.join(", ")}`);
  }

  if (breach.passwordBreached) {
    console.log(`breached: yes, seen ${breach.times} times`);
  } else {
    console.log("breached: no");
  }

  const isSafe = strength.passed && !breach.passwordBreached;
  process.exit(isSafe ? 0 : 1);
}

main();
