import StatusEnum from "../../../common/status.enum.js";
import BlueprintModel from "../models/blueprint.schema.js";

class BlueprintService {
  create(payload) {
    return new BlueprintModel(payload).save();
  }

  getAll(query) {
    return BlueprintModel.find({ ...query, status: StatusEnum.ACTIVE });
  }

  getOneById(id) {
    return BlueprintModel.findOne({ _id: id });
  }

  updateById(id, payload) {
    return BlueprintModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...payload } }
    );
  }

  deleteById(id) {
    return BlueprintModel.findOneAndUpdate(
      { _id: id },
      { status: StatusEnum.DELETED }
    );
  }
}

export default BlueprintService;
