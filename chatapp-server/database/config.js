const mongoose = require("mongoose");
const { LOG_COLOR } = require("../logcolors/colors");

const dbConnection = async () => {
  try {
    const URI = process.env.DB_CNN_STRING;
    await mongoose.connect(URI, {});
    console.log(`${LOG_COLOR.WHITE}[DDBB]: ${LOG_COLOR.GREEN}online`);
  } catch (error) {
    console.log(`${LOG_COLOR.WHITE}[DDBB]: ${LOG_COLOR.RED}error: `, error);
    throw new Error("Database error - see logs!");
  }
};

module.exports = {
  dbConnection,
};
