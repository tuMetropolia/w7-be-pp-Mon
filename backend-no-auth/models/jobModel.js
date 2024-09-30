const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});


//add  virtual field id
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

