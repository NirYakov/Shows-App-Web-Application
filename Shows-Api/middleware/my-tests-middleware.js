
const myTestMiddleware = (req, res, next) => {
    try {
        const myParams = req.params;
        const myBody = req.body;
        const myQuery = req.query;
        const myHeaders = req.headers;
        const myLastUrl = req.originalUrl;
        const myFullUrl = req.originalUrl;


        console.log(" params ", myParams);
        console.log(" body ", myBody);
        console.log(" query ", myQuery);
        console.log(" headers ", myHeaders);
        console.log(" lastUrl ", myLastUrl);
        console.log(" fullUrl ", myFullUrl);

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