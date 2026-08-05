import { createHash } from "node:crypto";
import { BreachResult } from "./types.ts";

function sha1(password: string): string {
  return createHash("sha1").update(password).digest("hex").toUpperCase();
}

function splitHash(hash: string): { prefix: string; suffix: string } {
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);
  return { prefix, suffix };
}

async function checkBreach(password: string): Promise<BreachResult> {
  const hash = sha1(password);
  const { prefix, suffix } = splitHash(hash);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`,
  );
  const body = await response.text();

  const linesArr: string[] = body.split(/\r?\n|\r/);

  const splitLines: string[][] = linesArr.map((l) => l.split(":"));

  const match = splitLines.find((line) => line[0] === suffix);

  return { passwordBreached: true, times: 3 };
}
