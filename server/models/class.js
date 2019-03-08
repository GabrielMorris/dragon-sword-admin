const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  base: { type: Object, required: true },
  growth: { type: Object, required: true },
  isMage: { type: Boolean, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true }
});

classSchema.set('timestamps', true);
classSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('class', classSchema);
