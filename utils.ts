import { parse } from "./deps.ts";

const getFlags = () => {
  const flags = parse(Deno.args, {
    boolean: ["test"],
    default: { test: false },
  });
  return flags;
};

export async function getInputData(): Promise<string> {
  const flags = getFlags();
  const fileToRead = flags.test ? "./example.txt" : "./input.txt";
  const text = await Deno.readTextFile(fileToRead);
  return text;
}
