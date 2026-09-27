import type { KnowledgeDocument } from "./knowledge.loader.js";

export interface KnowledgeChunk {
  id: string;
  documentId: string;
  fileName: string;
  content: string;
  chunkIndex: number;
}

const MAX_CHUNK_LENGTH = 1000;

export function chunkDocument(
  document: KnowledgeDocument
): KnowledgeChunk[] {
  const lines = document.content.split("\n");

  const sections: string[] = [];

  let currentSection = "";
  let documentTitle = "";

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Remember the main document title
    if (trimmedLine.startsWith("# ")) {
      documentTitle = trimmedLine;
      continue;
    }

    // Start a new chunk whenever we reach an H2 heading
    if (trimmedLine.startsWith("## ")) {
      if (currentSection.trim()) {
        sections.push(currentSection.trim());
      }

      currentSection = documentTitle
        ? `${documentTitle}\n\n${trimmedLine}`
        : trimmedLine;

      continue;
    }

    if (trimmedLine) {
      currentSection += currentSection
        ? `\n\n${trimmedLine}`
        : trimmedLine;
    }
  }

  if (currentSection.trim()) {
    sections.push(currentSection.trim());
  }

  // If the document contains no H2 headings
  if (sections.length === 0 && document.content.trim()) {
    sections.push(document.content.trim());
  }

  const chunks: KnowledgeChunk[] = [];

  let chunkIndex = 0;

  for (const section of sections) {
    if (section.length <= MAX_CHUNK_LENGTH) {
      chunks.push({
        id: `${document.id}-chunk-${chunkIndex}`,
        documentId: document.id,
        fileName: document.fileName,
        content: section,
        chunkIndex,
      });

      chunkIndex++;
      continue;
    }

    // Fallback for very large sections
    const paragraphs = section
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    let currentChunk = "";

    for (const paragraph of paragraphs) {
      const combined = currentChunk
        ? `${currentChunk}\n\n${paragraph}`
        : paragraph;

      if (
        combined.length > MAX_CHUNK_LENGTH &&
        currentChunk
      ) {
        chunks.push({
          id: `${document.id}-chunk-${chunkIndex}`,
          documentId: document.id,
          fileName: document.fileName,
          content: currentChunk,
          chunkIndex,
        });

        chunkIndex++;
        currentChunk = paragraph;
      } else {
        currentChunk = combined;
      }
    }

    if (currentChunk) {
      chunks.push({
        id: `${document.id}-chunk-${chunkIndex}`,
        documentId: document.id,
        fileName: document.fileName,
        content: currentChunk,
        chunkIndex,
      });

      chunkIndex++;
    }
  }

  return chunks;
}

export function chunkDocuments(
  documents: KnowledgeDocument[]
): KnowledgeChunk[] {
  return documents.flatMap(chunkDocument);
}