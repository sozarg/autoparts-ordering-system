import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "../../../"); // Apunta a la raiz del proyecto backend

export {
    __dirname,
    join
};
