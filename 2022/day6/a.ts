import { getInputData } from "../../utils.ts";

const line = await getInputData();

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

  processCharacter(idx: number): number | null {
    this.array.unshift(line.charAt(idx));
    if (this.array.length === this.size && this.isUnique()) {
      return this.buffIdx;
    }
    if (this.array.length >= this.size) this.array.pop();
    return null;
  }

  processData(): number {
    while (this.buffIdx < this.data.length) {
      const foundIdx = this.processCharacter(this.buffIdx++);
      if (foundIdx) {
        console.log("found marker", foundIdx);
        return foundIdx;
      }
    }
    return -1;
  }

  private isUnique(): boolean {
    return new Set(this.array).size === this.size;
  }
}

const b = new Buffer(line, 14);
b.processData();
