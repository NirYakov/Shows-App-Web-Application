
module.exports = function configToEnv() {

    if (!process.env.DbString) {

        process.env.ApiKey = "place holder";
        process.env.DbString = "place holder";

        try {
            const config = require("./config/config");

            if (config) {
                process.env.ApiKey = config.ApiKey;
                process.env.DbString = config.MONGO_ATLAS_PW;
                process.env.DbUser = config.DbUser;
                process.env.JWT_KEY = config.JWT_KEY;
                process.env.AppEmail = config.AppEmail;
                process.env.AppEmailPassword = config.AppEmailPassword;
                // console.log(process.env.ApiKey, process.env.DbString, process.env.DbUser);

            }
        }
        catch (error) {
            console.log("Can't find any --- keys ----");
        }

    }
}