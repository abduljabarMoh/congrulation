const express = require('express')
const router = express.Router()
const Reviews = require('../controllers/Reaviwes')
const { protect } = require('../middleware/Auth')


router.get('/Getall', Reviews.Getallreviws)
router.delete('/lost', Reviews.DeleteAllRe)
router.get('/:Rev_id', Reviews.getoneReviws)
router.post('/Newreviews', protect, Reviews.CreateRive)
router.put('/Update/:Rev_id', Reviews.UpdateReviws)
router.delete('/:Rev_id', Reviews.DeleteReviws)





module.exports = router