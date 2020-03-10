const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const MediaController = require('../controllers/media');

router.get('/', checkAuth, MediaController.get_all_applications);

router.post('/', MediaController.store_media_application);

router.get('/:mediaId', checkAuth, MediaController.get_single_media_application);

router.patch('/:mediaId', checkAuth, MediaController.update_media_application);

router.delete('/:mediaId', checkAuth, MediaController.delete_media_application);

module.exports = router;