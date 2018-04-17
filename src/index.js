import cors from 'cors';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import {
  UPLOAD_DIR,
  PORT,
} from './constants';
import { fileAsJSON } from './utils.js';

const app = express();
app.use(cors());

// Configuring storage and multer.
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, UPLOAD_DIR) },
  filename: (req, file, cb) => { cb(null, file.originalname) },
});
const upload = multer({ storage });

// Returns files from upload directory in JSON format.
app.get('/files', (req, res) => {
  res.json(fs.readdirSync(UPLOAD_DIR).map(filename => fileAsJSON(filename, fs.statSync(`${UPLOAD_DIR}/${filename}`))));
})

// Saves uploaded file to upload directory and returns saved file as JSON.
app.post('/files', upload.single('file'), (req, res) => {
  const { filename } = req.file;
  res.json(fileAsJSON(filename, fs.statSync(`${UPLOAD_DIR}/${filename}`)));
})

// Serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(PORT, function () {
 console.log(`react-filemanager-example-backend is now running on http://localhost:${PORT}`)
});
