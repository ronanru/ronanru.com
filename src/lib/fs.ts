export type Folder = {
  [key: string]: Folder | string;
};

const filesystem: Folder = {
  "test.txt": "This is a test file",
};

export const getFromPath = (path: string[]): Folder | string => {
  let folder = filesystem;
  normalizePath(path).forEach((bit) => (folder = folder[bit] as Folder));
  return folder;
};
export const normalizePath = (path: string[]): string[] => {
  const normal: string[] = [];
  path.forEach((bit) => {
    if (!bit || bit === ".") return;
    if (bit === "..") return normal.pop();
    normal.push(bit);
  });
  return normal;
};
export const deleteRecord = (path: string[]) => {
  const name = path.pop()!;
  let folder = filesystem;
  normalizePath(path).forEach((bit) => (folder = folder[bit] as Folder));
  delete folder[name];
};
export const createRecord = (path: string[], data: Folder | string) => {
  const pathCopy = [...path];
  const name = pathCopy.pop()!;
  let folder = filesystem;
  normalizePath(pathCopy).forEach((bit) => (folder = folder[bit] as Folder));
  folder[name] = data;
};
