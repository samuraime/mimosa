const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArchiveSchema = new Schema({
  name: String,
  path: String,
  size: Number,
  url: String,
  mimetype: String,
  tags: Array,
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

ArchiveSchema.statics = {
  list: function(options = {}) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 1000;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  },
};

module.exports = mongoose.model('Archive', ArchiveSchema);
