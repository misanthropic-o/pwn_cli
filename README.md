# pwn-cli

typescript cli that checks if your password is actually good. checks local strength rules AND checks if it's already been leaked in a real breach, using k-anonymity so the real password never leaves your machine.

## what it does

- runs the password through 5 local rules: length, uppercase, lowercase, number, symbol
- hashes it with sha1, sends only the first 5 chars of the hash to the HaveIBeenPwned API
- HIBP sends back every hash suffix starting with that prefix (out of ~900 million breached password hashes), you check locally whether your exact hash is in there
- your real password, and even your full hash, never touch the network, only a 5-char prefix does

## why k-anonymity matters

a naive version of this tool would just send the full password hash to an api and ask "is this breached, yes or no." that means the api's server (and its logs) would know exactly which password hash you checked.

instead: you send `5BAA6` (5 chars). the api has no idea which of the thousands of hashes sharing that prefix is actually yours. you get the full list back and do the real comparison yourself, locally. the api genuinely cannot know which password you were checking.

## file structure

```
src/
├── types.ts       # StrengthResult, BreachResult, PasswordRule interfaces
├── strength.ts     # local strength rules
├── hibp.ts          # sha1 hash, k-anonymity split, HIBP request, breach check
├── cli.ts           # reads the password arg from process.argv
└── index.ts         # wires it all together, prints results, sets exit code
```

## running it

```
npx tsc
node dist/index.js "yourpassword"
```

exits with code 0 if the password is strong and not breached, 1 otherwise, so it's scriptable.
