import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

export interface KnowledgeDocument {
  id: string;
  fileName: string;
  content: string;
}

export function loadKnowledgeDocuments(): KnowledgeDocument[] {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".md"));

  return files.map((fileName) => {
    const filePath = path.join(DATA_DIR, fileName);

    const content = fs.readFileSync(filePath, "utf-8");

    return {
      id: fileName.replace(".md", ""),
      fileName,
      content,
    };
  });
}