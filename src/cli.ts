import { argv } from "node:process";

export function getPasswordArg(): string {
  const password = argv[2];

  if (password === undefined) {
    console.error("usage: pwn-cli <password>");
    process.exit(1);
  }

  return password;
}
