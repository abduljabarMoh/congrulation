const express = require("express")
const router = express.Router();
const CateControle = require('../controllers/Category');
const { protect } = require("../middleware/Auth");


router.post('/new', protect, CateControle.CreateCategory)
router.get("/Getall", CateControle.GetallCategory)
router.get('/:cat_ID', CateControle.GetOneCAte)
router.put('/:cat_ID', protect, CateControle.UpdateCategory)
router.delete('/:cat_ID', protect, CateControle.Deletecategry)

module.exports = router