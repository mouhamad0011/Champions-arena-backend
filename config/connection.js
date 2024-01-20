const mongoose = require('mongoose');
const DatabaseUrl = process.env.DatabaseUrl;

 async function checkConnection() {
   try {
     await mongoose.connect(DatabaseUrl);
     console.log('Connected to database successfully');
   } catch (error) {
     console.log("Failed to connect",error);
   }
  }

module.exports = {checkConnection};