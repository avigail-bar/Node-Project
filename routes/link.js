const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router.post('/', linkController.createLink);
router.get('/', linkController.getLinks);
router.get('/:id', linkController.getLinkById);
router.put('/:id', linkController.updateLink);
router.delete('/:id', linkController.deleteLink);
router.get('/:id/redirect', linkController.redirectLink);
router.get('/:id/clicks-by-source', linkController.getClicksBySource);
module.exports = router;