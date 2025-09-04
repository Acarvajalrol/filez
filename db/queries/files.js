import db from "#db/client";

export async function createFile(name, size) {
  const SQL = `
    INSERT INTO files(name, size, folder_id) 
    SELECT $1, $2, id FROM folders
    RETURNING *
    `;
  const { rows: file } = await db.query(SQL, [name, size]);
  return file[0];
}

export async function getFiles() {
  const SQL = `
    SELECT files.id, files.name, files.size, folder_id, folders.name AS folder_name
    FROM files
    LEFT JOIN folders ON files.folder_id = folders.id
    `;
  const { rows: files } = await db.query(SQL);

  return files;
}
