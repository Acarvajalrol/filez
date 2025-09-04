import express from "express";
const router = express.Router();
export default router;

import {
  getFilesInFolderById,
  getFolderById,
  getFolders,
} from "#db/queries/folders";
import { getFiles, createFile } from "#db/queries/files";

router.route("/folders").get(async (req, res) => {
  const folders = await getFolders();
  return res.send(folders);
});

router.route("/files").get(async (req, res) => {
  const files = await getFiles();
  return res.status(200).send(files);
});

router.route("/folders/:id/files").post(async (req, res) => {
  const { id } = req.params;
  const folder = await getFolderById(id);
  if (!folder) {
    return res.status(404).send("Folder id does not exist.");
  } else if (!req.body) {
    return res.status(400).send("You are missing the request body.");
  } else if (!req.body.name || !req.body.size) {
    return res.status(400).send("You are missing the required fields.");
  }
  try {
    const { name, size } = req.body;
    const file = await createFile(name, size);
    return res.status(201).send(file);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.route("/folders/:id").get(async (req, res) => {
  const { id } = req.params;
  const folder = await getFolderById(id);

  if (folder) {
    const files = await getFilesInFolderById(id);
    try {
      if (!/^\d+$/.test(id) || id < 0) {
        return res.status(400).send("ID# is incorrect.");
      } else if (!files) {
        return res.status(404).send("ID# does not exist.");
      } else {
        return res.status(200).send(files);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    return res.status(404).send(" it doesn't exist");
  }
});
