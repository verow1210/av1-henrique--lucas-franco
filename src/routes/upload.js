const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const pastaUploads = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(pastaUploads, { recursive: true });

const armazenamento = multer.diskStorage({
  destination: (req, file, callback) => callback(null, pastaUploads),
  filename: (req, file, callback) => {
    const nomeSeguro = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '-');
    callback(null, `${Date.now()}-${nomeSeguro}`);
  }
});

const upload = multer({
  storage: armazenamento,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const tiposAceitos = ['image/jpeg', 'image/png', 'image/webp'];
    if (tiposAceitos.includes(file.mimetype)) return callback(null, true);
    return callback(new Error('Apenas imagens JPG, JPEG, PNG e WEBP sao aceitas.'));
  }
});

const router = express.Router();

router.post('/', (req, res) => {
  upload.single('imagem')(req, res, (error) => {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ erro: 'A imagem deve ter no maximo 2 MB.' });
    }
    if (error) return res.status(400).json({ erro: error.message });
    if (!req.file) return res.status(400).json({ erro: 'Envie uma imagem no campo imagem.' });

    return res.status(201).json({
      mensagem: 'Upload realizado com sucesso.',
      arquivo: req.file.filename,
      caminho: `/uploads/${req.file.filename}`
    });
  });
});

module.exports = router;