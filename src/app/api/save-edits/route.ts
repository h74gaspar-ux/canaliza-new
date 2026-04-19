import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git' && file !== 'api') {
        await getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only allowed in development' }, { status: 403 });
  }

  try {
    const { changes } = await req.json();
    const projectRoot = process.cwd();
    const searchDirs = [
      path.join(projectRoot, 'src', 'app'),
      path.join(projectRoot, 'src', 'components'),
      path.join(projectRoot, 'src', 'lib')
    ];

    let allFiles: string[] = [];
    for (const dir of searchDirs) {
      try {
        await getAllFiles(dir, allFiles);
      } catch (e) {
        // Skip if dir doesn't exist
      }
    }

    let modifiedCount = 0;

    for (const filePath of allFiles) {
      let content = await fs.readFile(filePath, 'utf-8');
      let changed = false;

      for (const [original, updated] of Object.entries(changes as Record<string, string>)) {
        // Simple search and replace for unique strings
        // We escape the string to avoid regex issues, but we use a simple replace
        if (content.includes(original)) {
          content = content.replaceAll(original, updated);
          changed = true;
        }
      }

      if (changed) {
        await fs.writeFile(filePath, content, 'utf-8');
        modifiedCount++;
      }
    }

    return NextResponse.json({ success: true, filesModified: modifiedCount });
  } catch (error) {
    console.error('Save Error:', error);
    return NextResponse.json({ error: 'Failed to save changes' }, { status: 500 });
  }
}
