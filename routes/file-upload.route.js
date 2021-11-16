const multer  = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * Math.pow(10, 6) } });
const express = require('express');
const router = express.Router();
const fileUploadController = require("../controllers/file-upload.controller");

router.post('/', upload.single('file'), fileUploadController.upload);
router.delete('/:fileName', fileUploadController.delete);
router.get('/:fileName', fileUploadController.download);

module.exports = router;