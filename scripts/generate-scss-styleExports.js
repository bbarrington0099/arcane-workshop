import { styleExports } from "../styleExports.js";
import fs from "fs";

let scss = "";

for (const [key, styleExport] of Object.entries(styleExports)) {
    scss += `// ${key.toUpperCase()}\n`;
    for (const [subKey, styleExportValue] of Object.entries(styleExport.values)) {
        scss += `$${key}-${subKey}: `;
        scss += styleExportValue.dressed || styleExportValue.raw;
        scss += ";\n";
    }
}

fs.writeFileSync("app/_variables.scss", scss);
console.log("SCSS style exports generated.");