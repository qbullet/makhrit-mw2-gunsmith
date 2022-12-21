import BlueprintService from "../services/blueprint.service.js";
import StatusEnum from "../../../common/status.enum.js";

class BlueprintController {
  blueprintService;

  constructor() {
    this.blueprintService = new BlueprintService();
  }

  async createBlueprint(req, res) {
    try {
      const created = await this.blueprintService.create(req.body);

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
  }

  async getAllBlueprint(req, res) {
    try {
      const Blueprints = await this.blueprintService.getAll({
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
  }

  async getBlueprintByIds(req, res) {
    try {
      const ids = req.params.ids.split(",");
      const Blueprints = await this.blueprintService.getAll({
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
  }

  async editBlueprintById(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const updated = await this.blueprintService.updateById(id, payload);

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
  }

  async deleteBlueprintById(req, res) {
    try {
      const { id } = req.params;
      const updated = await this.blueprintService.deleteById(id);

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
  }
}

export default BlueprintController;
