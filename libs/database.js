const mongoose = require('mongoose');

function database(
  DATABASE_URL = "mongodb://localhost:27017/test",
  feedbackMessage = false,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) {

  // Database Connection
  mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  // log database connection status
  mongoose.connection
    .on("error", () => {
      feedbackMessage && console.log("+++ Connection to the database failed!");
      onErrorCallBack();
    })
    .on("open", () => {
      feedbackMessage && console.log("--- Connected to the database");
      onSuccessCallBack();
    });

}

module.exports = database;