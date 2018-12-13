const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const imageUpload = require('../middleware/imageUpload');

// REQUIRE CONTROLLERS
const profileController = require('../controllers/profile');

router.get('/', checkAuth, profileController.getProfileData);
router.put('/', checkAuth, profileController.updateProfile);
router.put('/avatar', imageUpload.single('avatar'), checkAuth, profileController.updateAvatar);
router.put('/change_password', checkAuth, profileController.changePassword);
router.delete('/', checkAuth, profileController.deleteUser);

module.exports = router;
