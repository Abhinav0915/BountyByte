const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionField: String,
    preferredLanguage: String,
    bountyField: Number,
    timeField: Date,
    codeImageField: String, // Assuming you store the image URL
});

// Create a Mongoose model based on the schema
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
