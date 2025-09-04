import db from "#db/client";

export async function createFolder(folderName) {
  const SQL = `
    INSERT INTO folders(name) VALUES($1)
    RETURNING *
    `;
  const { rows: folder } = await db.query(SQL, [folderName]);
  return folder;
}

export async function getFolders() {
  const SQL = `
    SELECT * FROM folders
    `;
  const { rows: folders } = await db.query(SQL);
  return folders;
}

export async function getFolderById(id) {
  const SQL = `
  SELECT * FROM folders WHERE id = $1
  `;
  const { rows: folder } = await db.query(SQL, [id]);
  //   console.log(folder, "FOLDER");
  return folder[0];
}

export async function getFilesInFolderById(id) {
  const SQL = `
   SELECT *,
    (
    SELECT json_agg(files)
    FROM files
    WHERE files.folder_id = folders.id
    ) AS files
     FROM folders
     WHERE id = $1
     `;
  const { rows: files } = await db.query(SQL, [id]);
  console.log(files, "FOLDER");
  return files[0];
}
