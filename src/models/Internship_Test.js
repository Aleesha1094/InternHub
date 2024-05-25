const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
    question : {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
          validator: (options) => options.length === 4,
          message: 'There must be exactly 4 options.',
        },
      },
      correctOptionIndex: {
        type: Number,
        required: true,
        validate: {
          validator: (index) => index >= 1 && index < 5,
          message: 'Correct option index must be between 1 and 4.',
        },
      },
});

export default mongoose.models.tests || mongoose.model("tests", TestSchema);