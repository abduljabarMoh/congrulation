const express = require("express")
const router = express.Router();
const cartrol = require('../controllers/Cart');

router.post('/', cartrol.createcart)
router.get('/Getall', cartrol.GetallCarts)
router.put('/update/:Cart_ID', cartrol.UpdateCarts)
router.get('/:Cart_ID', cartrol.Getonecarts)
router.delete('/DE/:Cart_ID', cartrol.DeleteCarts)

module.exports = router