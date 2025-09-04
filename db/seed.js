import db from "#db/client";
import { createFile } from "./queries/files.js";
import { createFolder } from "./queries/folders.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++) {
    const folderName = faker.system.fileName();
    const folder = await createFolder(folderName);
    for (let j = 0; j < 5; j++) {
      const name = faker.system.fileName();
      const size = faker.number.int({ min: 0, max: 100000 });
      const file = await createFile(name, size);
    }
  }
}
