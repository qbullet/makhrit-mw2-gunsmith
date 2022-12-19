import BlueprintService from "../services/blueprint.service.js";
import StatusEnum from "../../../common/status.enum.js";

const blueprintService = new BlueprintService();

const BlueprintController = {
  createBlueprint: async (req, res) => {
    try {
      const created = await blueprintService.create(req.body);

      res.status(201).json({
        success: true,
        data: created,
      });
    } catch (error) {
      console.error(`[ERROR ON CREATE Blueprint] => ${error.message}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getAllBlueprint: async (req, res) => {
    try {
      const Blueprints = await blueprintService.getAll({
        status: StatusEnum.ACTIVE,
      });

      res.status(200).json({
        success: true,
        data: Blueprints,
      });
    } catch (error) {
      console.error(`[ERROR ON GET Blueprint] => ${error.message}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getBlueprintByIds: async (req, res) => {
    try {
      const ids = req.params.ids.split(",");
      const Blueprints = await blueprintService.getAll({
        _id: { $in: ids },
        status: StatusEnum.ACTIVE,
      });

      res.status(200).json({
        success: true,
        data: Blueprints,
      });
    } catch (error) {
      console.error(`[ERROR ON GET Blueprint] => ${error.message}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  editBlueprintById: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const updated = await blueprintService.updateById(id, payload);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      console.error(`[ERROR ON EDIT Blueprint] => ${error.message}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteBlueprintById: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await blueprintService.deleteById(id);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      console.error(`[ERROR ON DELETE Blueprint] => ${error.message}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default BlueprintController;
