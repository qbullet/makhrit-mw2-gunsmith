import express from "express";
import BlueprintController from "./controllers/blueprint.controller.js";

const router = express.Router();
const blueprintService = new BlueprintController();

router.post("/", blueprintService.createBlueprint);
router.get("/", blueprintService.getAllBlueprint);
router.get("/:ids", blueprintService.getBlueprintByIds);
router.patch("/:id", blueprintService.editBlueprintById);
router.delete("/:id", blueprintService.deleteBlueprintById);

export default router;
