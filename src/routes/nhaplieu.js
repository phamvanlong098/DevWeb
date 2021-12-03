const express = require('express')
const router = express.Router()
const nhaplieuController = require('../app/controllers/NhaplieuController')


router.put('/:id', nhaplieuController.update)
router.delete('/:id', nhaplieuController.delete)
router.get('/:id/edit', nhaplieuController.edit)
router.post('/', nhaplieuController.post)
router.get('/', nhaplieuController.index)


module.exports = router