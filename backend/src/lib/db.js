const mongoose = require("mongoose");

const connect_db = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongo_DB Connected");
    } catch (error) {
        console.log("Error while connecting to mongo_DB");
    }
};

module.exports = connect_db;
