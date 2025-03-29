const mongoose = require("mongoose");

async function connectTOMongoDB(url) {
  return mongoose.connect(url).then(() => console.log("mongodb connected"));
}

module.exports = {
  connectTOMongoDB,
};
