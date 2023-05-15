
const dataStatic = require("../dataObj");


exports.GetShowsGameMovies = async (req, res, next) => {

    // dataStatic.dataObj;
    const dataObj = dataStatic.dataObj.movies;

    res.status(200).json({
        msg: "Okay",
        dataObj
    });
}

exports.GetShowsGameTv = async (req, res, next) => {

    // let responseApi = "none";


    // const urlApi = `https://imdb-api.com/en/API/Top250TVs/${process.env.ApiKey}`;

    // // console.log(urlApi);

    // // req from rate api
    // await axios({
    //     method: 'get',
    //     url: urlApi,
    // })
    //     .then((response) => {
    //         // rateCAN = response.data.rates.CAD;
    //         // rateEuro = response.data.rates.EUR;

    //         responseApi = response;
    //         // console.log(response);


    //     }).catch(e => {
    //         console.log({
    //             message: "oops :(",
    //             error: e,
    //         })
    //     });

    // responseApi = responseApi.data;



    // // dataStatic.dataObj;
    // const dataObj = responseApi;

    const dataObj = dataStatic.dataObj.tv;


    res.status(200).json({
        msg: "Okay",
        dataObj
    });
}; 