import express  from 'express'
import BlueprintController from './controllers/blueprint.controller.js'

const router = express.Router()

router.post('/', BlueprintController.createBlueprint)
router.get('/', BlueprintController.getAllBlueprint)
router.get('/:ids', BlueprintController.getBlueprintByIds)
router.patch('/:id', BlueprintController.editBlueprintById)
router.delete('/:id', BlueprintController.deleteBlueprintById)

export default router
