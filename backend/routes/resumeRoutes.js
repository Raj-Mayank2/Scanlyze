const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resumeController = require('../controllers/resumeController');

// Multer setup for uploads (store files temporarily)
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/auth');
router.post('/analyze', auth, upload.single('resume'), resumeController.uploadAndParse);



module.exports = router;
