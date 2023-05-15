const jwt = require("jsonwebtoken");

const middleWareJwt = (req, res, next) => {
    try {
        const myParams = req.params;
        const myBody = req.body;
        const myQuery = req.query;
        const myHeaders = req.headers;

        console.log(myParams);
        console.log(myBody);
        console.log(myQuery);
        console.log(myHeaders);


        next();
    }
    catch (error) {
        res.status(401).json({
            message: "You Are Not authenticated!"
        });
    }
}


module.exports = middleWareJwt;



