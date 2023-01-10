const express = require("express")
const router = express.Router();
const subcat = require('../controllers/subCategory');
const { protect } = require("../middleware/Auth");

router.post('/new', protect, subcat.createsubcategory)
router.get('/Getall', subcat.Getallsubcategory)
router.put('/:SubID', protect, subcat.Updatesubcategory)
router.get('/:SubID', subcat.Getonesubcategory)
router.delete('/:SubID', protect, subcat.Deletesubcatgory)

module.exports = router