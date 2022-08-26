const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/contact_list_db');

const db = mongoose.connection;

db.on("error", console.error.bind(console,"Error in connecting to the database"));
db.once("open", console.log.bind(console, "Server is connected to the database"));