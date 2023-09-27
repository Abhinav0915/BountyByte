const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionField: String,
    descriptionField: String,
    preferredLanguage: String,
    bountyField: Number,
    timeField: Date,
    codeImageField: String, 
});

// Create a Mongoose model based on the schema
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
