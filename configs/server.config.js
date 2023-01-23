require('dotenv').config();
const mongoose = require('mongoose');
module.exports={
    PORT : process.env.PORT,
    DB_URL : process.env.MONGO_URI
}