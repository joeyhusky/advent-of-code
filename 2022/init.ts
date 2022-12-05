export async function withInputData(fn: (text: string) => void) {
  const text = await Deno.readTextFile("./input.txt");
  fn(text);
}

export async function withExampleData(fn: (text: string) => void) {
  const text = await Deno.readTextFile("./example.txt");
  fn(text);
}
