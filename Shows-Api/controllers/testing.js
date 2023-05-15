

let numberOfTrys = 1;

exports.testingPollOnlyXTimes = async (req, res, next) => {


    let rateCAN = 1.0;
    let rateEuro = 1.0;

    numberOfTrys++;

    if (numberOfTrys % 3 == 0) {

        // req from rate api
        await axios({
            method: 'get',
            url: `https://open.er-api.com/v6/latest/USD`,
        })
            .then(function (response) {
                rateCAN = response.data.rates.CAD;
                rateEuro = response.data.rates.EUR;

            }).catch(e => {
                console.log({
                    message: "oops :(",
                    error: e,
                })
            });

        numberOfTrys = 1;
    }


    res.status(200).json({
        rateCAN,
        rateEuro
    });
}


exports.TestExternalApis = async (req, res, next) => {


    let responseApi = "none";

    const searchShow = "inception 2010";

    const urlApi = `https://imdb-api.com/en/API/Search/${process.env.ApiKey}/${searchShow}`;

    // console.log(urlApi);

    // req from rate api
    await axios({
        method: 'get',
        url: urlApi,
    })
        .then((response) => {
            // rateCAN = response.data.rates.CAD;
            // rateEuro = response.data.rates.EUR;

            responseApi = response;
            // console.log(response);


        }).catch(e => {
            console.log({
                message: "oops :(",
                error: e,
            })
        });

    responseApi = responseApi.data;

    res.status(200).json({
        health: "Online ! :)",
        responseApi
    });
}


exports.testingMiddleware = (req, res, next) => {

    res.status(200).json({
        msg: "After the middleware :)"
    });

}