
const myTestMiddleware = (req, res, next) => {
    try {
        const myParams = req.params;
        const myBody = req.body;
        const myQuery = req.query;
        const myHeaders = req.headers;
        const myLastUrl = req.originalUrl;
        const myFullUrl = req.originalUrl;


        console.log(myParams);
        console.log(myBody);
        console.log(myQuery);
        console.log(myHeaders);
        console.log(myLastUrl);
        console.log(myFullUrl);

        //  console.log(req);

        console.log("myTestMiddleware ........")


        next();
    }
    catch (error) {
        res.status(401).json({
            message: "You Are Not authenticated!"
        });
    }
};


module.exports = myTestMiddleware;