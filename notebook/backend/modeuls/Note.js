const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for notes
const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Refers to the 'user' model
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    timestamp: { // Changed "Timestamp" to lowercase "timestamp" for consistency
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
    },
});

// Export the Note model
module.exports = mongoose.model('Note', NoteSchema); // Use 'Note' as the model name