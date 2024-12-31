const mongoose = require('mongoose');

async function connectToMongo() {
    try {
        const conn = await mongoose.connect("mongodb+srv://shreyashpatel5506:fSEx6ooq3rzO6cCX@e-commrse.7uelv.mongodb.net/User", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection is successful");
    } catch (error) {
        console.error("Connection failed", error.message);
        console.error(error.stack);
    }
}

module.exports = connectToMongo;
