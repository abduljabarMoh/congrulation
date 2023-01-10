const express = require('express');
const router = express.Router();
const OdersControls = require('../controllers/Orders');

router.post('/Createoders', OdersControls.CreateOders)
router.get('/getall', OdersControls.Getallorders)
router.put('/:Ored_id', OdersControls.UpdateOrders)
router.get('/:Ored_id', OdersControls.Getoneorders)
router.delete('/:Ored_id', OdersControls.deleteOders)

module.exports = router