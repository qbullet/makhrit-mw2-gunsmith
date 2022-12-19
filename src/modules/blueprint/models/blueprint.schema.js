import mongoose from 'mongoose'
import StatusEnum from '../../../common/status.enum.js'

const { Schema, model } = mongoose

const BlueprintSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrls: {
    type: [String],
    default: []
  },
  model: {
    type: String,
    default: 'UNKNOWN'
  },
  description: {
    type: String,
    default: ''
  },
  addedBy: {
    type: String,
    default: 'UNKNOWN'
  },
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.ACTIVE
  }
}, { timestamps: true, strict: true })

const BlueprintModel = model('blueprints', BlueprintSchema)

export default BlueprintModel
