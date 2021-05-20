const service = require('../services/main.service')

/*Main controller: Each method is used by the router to handle requests to the api.
                   In order to comply with requests it makes use of main.service.

*/

function cityByTag (req,res){
    var cities = service.findCityByTag(req.query.tag,req.query.isActive)
    res.status(cities.status).json({"cities": cities.message});
    
}

function citiesDistance(req,res){
    var distance = service.citiesDistance(req.query.from,req.query.to);
    message = {
        "from" : {"guid": req.query.from}, 
        "to": {"guid" : req.query.to}, 
        "distance": distance.message, 
        "unit":"km"
    };
    res.status(distance.status).json(message);
}

// It use the Promise created in areaPool
function areaDistance (req,res){
    areaDistancePromise.then(cities => {res.status(cities.status).json({"cities":cities.message})})
}

// Due to timeout, the function send back a new url where you can find the requested data.
// After sending the new url, the function sets the promise
function areaPool(req,res){
    var distance = req.query.distance
    var from = req.query.from 
    var resultsUrl = 'http://127.0.0.1:8080/area-result/2152f96f-50c7-4d76-9e18-f7033bd14428'
    Promise.resolve(res.status(202).json({"resultsUrl" : resultsUrl})).then(
       areaDistancePromise = setAreaDistancePromise(from,distance)
    )
}

// stream of JSON 
function getAllCities(req,res){
    addresses = service.loadCities()
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked'
})
    res.write(addresses)
    res.end();
}

// Function to set the areaDistance promise
function setAreaDistancePromise (from,distance){ 
    return new Promise((resolve,reject) => {
    var cities = service.areaDistance(from,distance)
    resolve(cities)
})}

module.exports = {
    cityByTag,
    citiesDistance,
    areaDistance,
    areaPool,
    getAllCities
}