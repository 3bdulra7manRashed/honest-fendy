import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;

  if (!/^book-\d+\.pdf$/.test(filename)) {
    return new Response("Invalid filename", { status: 400 });
  }

  const booksDir = path.join(process.cwd(), "public", "books");
  const filePath = path.join(booksDir, filename);

  if (!filePath.startsWith(booksDir)) {
    return new Response("Invalid path", { status: 400 });
  }

  let stat;
  try {
    stat = await fs.stat(filePath);
  } catch {
    return new Response("File not found", { status: 404 });
  }

  const fileSize = stat.size;
  const range = request.headers.get("range");

  const baseHeaders = {
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename="${filename}"`,
    "Cache-Control": "no-store",
    "Accept-Ranges": "bytes",
  };

  if (range) {
    const match = range.match(/bytes=(\d*)-(\d*)/);
    if (!match) {
      return new Response("Invalid Range", { status: 416 });
    }
    const start = match[1] ? parseInt(match[1], 10) : 0;
    const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize || start > end) {
      return new Response("Range Not Satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const chunkSize = end - start + 1;
    const fileHandle = await fs.open(filePath, "r");
    const buffer = Buffer.alloc(chunkSize);
    await fileHandle.read(buffer, 0, chunkSize, start);
    await fileHandle.close();

    return new Response(buffer, {
      status: 206,
      headers: {
        ...baseHeaders,
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Content-Length": String(chunkSize),
      },
    });
  }

  const fileBuffer = await fs.readFile(filePath);
  return new Response(fileBuffer, {
    status: 200,
    headers: {
      ...baseHeaders,
      "Content-Length": String(fileSize),
    },
  });
}
