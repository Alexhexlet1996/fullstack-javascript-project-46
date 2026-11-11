import path from "node:path";
import { fileURLToPath } from "url";

const getFixturePath = (nameFile) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, "..", "__fixtures__", nameFile);
};

export { getFixturePath };
