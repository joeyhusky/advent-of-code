export class NaryTree {
  name: string;
  size: number | null;
  children: NaryTree[];
  parent: NaryTree | null;
  constructor(name: string, val: number = -1, parent: NaryTree | null = null) {
    this.name = name;
    this.size = val;
    this.children = [];
    this.parent = parent;
  }

  addNode(node: NaryTree) {
    this.children.push(node);
  }

  getChildren(): NaryTree[] {
    return this.children;
  }
}
