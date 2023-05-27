
// const dataStatic = require("../dataObj");

exports.GetUserShows = async (req, res, next) => {

    let responseApi = "not implemented";

    res.status(200).json({
        health: "Online ! :)",
        responseApi
    });

}

exports.CreateUserShow = async (req, res, next) => {

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



exports.UpdateUserShow = async (req, res, next) => {

    let responseApi = "not implemented";

    res.status(200).json({
        health: "Online ! :)",
        responseApi
    });
}

exports.deleteUserShow = async (req, res, next) => {

    let responseApi = "not implemented";

    res.status(200).json({
        health: "Online ! :)",
        responseApi
    });
}

