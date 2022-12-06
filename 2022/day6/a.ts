import { getInputData } from "../../utils.ts";

const line = await getInputData();
console.log(line);
class Buffer {
  private data: string;
  private array: (string | null)[];
  private buffIdx: number;
  private size: number;
  constructor(data: string, bufferLength: number) {
    this.array = [];
    this.buffIdx = 0;
    this.size = bufferLength;
    this.data = data;
  }

  processCharacter(): number | null {
    this.array.unshift(line.charAt(this.buffIdx));
    if (this.array.length >= this.buffIdx) {
      if (this.isUnique()) {
        return this.buffIdx;
      }
    }
    if (this.array.length >= this.size) this.array.pop();
    return null;
  }

  processData(): number {
    let foundIdx = this.processCharacter();
    while (this.buffIdx++ < this.data.length) {
      foundIdx = this.processCharacter();
      if (foundIdx) {
        console.log("found marker", foundIdx);
        return foundIdx;
      }
    }
    return -1;
  }

  private isUnique(): boolean {
    console.log("checking array:", this.array);
    return new Set(this.array).size === this.size;
  }
}

const b = new Buffer(line, 4);
b.processData();
