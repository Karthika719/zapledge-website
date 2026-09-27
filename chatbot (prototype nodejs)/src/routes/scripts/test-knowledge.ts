import { loadKnowledgeDocuments } from "../../modules/knowledge/knowledge.loader.js";

const documents = loadKnowledgeDocuments();

console.log(`Loaded ${documents.length} knowledge documents\n`);

documents.forEach((document) => {
  console.log("=================================");
  console.log(`ID: ${document.id}`);
  console.log(`File: ${document.fileName}`);
  console.log("---------------------------------");
  console.log(document.content);
  console.log();
});