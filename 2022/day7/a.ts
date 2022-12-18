import { getInputData } from "../../utils.ts";
import { NaryTree } from "./NaryTree.ts";
const commandInput: string = await getInputData();

const commands: string[] = commandInput.split("\n");

type CdArg = ".." | string;
type CdCommand = `$ cd ${CdArg}`;

type LsCommand = "$ ls";

type Command = `cd ${CdArg}` | "ls";
type CommandLine = `$ ${Command}` | LsOutput;

type LsOutput = `dir ${string}` | `${number} ${string}`;

const isLsCommand = (command: CommandLine): command is LsCommand =>
  command === "$ ls";
const isCdCommand = (command: CommandLine): command is CdCommand =>
  command.startsWith("$ cd");

const fileSystem = new NaryTree("/", 0);
let currentDir = fileSystem;

for (let i = 0; i < commands.length; i++) {
  if (i === 0) continue;
  const commandLine: CommandLine = commands[i].split("\r")[0] as CommandLine;
  if (isLsCommand(commandLine)) {
    continue;
  }
  if (isCdCommand(commandLine)) {
    const [, arg] = commandLine.split(" ");
    if (arg === "..") {
      currentDir = currentDir.parent!;
    } else {
      const [, dirName] = commandLine.split(" ");
      const dir = currentDir.getChildren().find((d) => d.name === dirName);
      if (dir) {
        currentDir = dir;
      }
    }
    continue;
  }

  // collecting output if we're here
  if (commandLine.startsWith("dir")) {
    const [, dirName] = commandLine.split(" ");
    const dir = new NaryTree(dirName, 0, currentDir);
    currentDir.addNode(dir);
    continue;
  } else {
    const [size, fileName] = commandLine.split(" ");
    const file = new NaryTree(fileName, Number(size), currentDir);
    currentDir.addNode(file);
    continue;
  }
}

console.log(fileSystem);
