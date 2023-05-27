const mongoose = require("mongoose");


module.exports = function connectToMyMongo() {
    //////// read form api key env ? !



    console.log(process.env.ApiKey, process.env.DbString, process.env.DbUser);

    const uri = `mongodb+srv://${process.env.DbUser}:${process.env.DbString}@cluster0-shows-app.ljiuw6y.mongodb.net/TesttDatabase?retryWrites=true&w=majority`

    console.log(uri);

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }).then(() => {
        console.log('Connected to database');
    }).catch(err => {
        console.log(err.reason);
        console.log("Connection failed!");
    });

}