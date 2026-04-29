import fs from "fs";
import path from "path";

const KEY = "thecreditcardpick-2026-04-28-indexnow-key";
const outFile = path.join(process.cwd(), "out", `${KEY}.txt`);
fs.writeFileSync(outFile, KEY);
console.log(`Wrote IndexNow key file: ${KEY}.txt`);
