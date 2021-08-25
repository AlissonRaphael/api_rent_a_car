import fs from 'fs';

export default async function deleteFile(filename: string): Promise<string> {
  try {
    await fs.promises.stat(filename);
  } catch {
    return 'File not found';
  }

  await fs.promises.unlink(filename);
  return 'Deleted file';
}
