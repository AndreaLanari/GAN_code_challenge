const fs = require('fs-extra')

// It finds all the cities with a specific tag
function findCityByTag(tagToFind,isActive){
    try{
        var addresses = loadAddresses()
        var result = []
        addresses.forEach(elem => {
                if (elem.isActive === JSON.parse(isActive)){
                    elem.tags.forEach(tag => {
                        if (tag ===tagToFind){
                            result.push(elem)
                        }
                    })
                }
            });
        return {"message": result, "status": 200}
    }
    catch (error) {
        return {"message": error, "status":500}
    }   
}

// It return the distance between two cities, using  the function calculateDistance
function citiesDistance(from,to){
    try{
        var addresses = loadAddresses()
        var cityA = findCitybyGuid(from, addresses)
        var cityB = findCitybyGuid(to, addresses)
        var d = calculateDistanze(cityA,cityB)
        return {"message": d, "status":200}
    }
    catch (error){
        return {"message": error, "status":500}
    }
}

// It finds all cities near a target within a distance
function areaDistance(from,distance){
    try {
        var addresses = loadAddresses()
        var city = findCitybyGuid(from,addresses)
        var citiesAccepted = []
        addresses.forEach(elem => {
            d = calculateDistanze(elem,city)
            if (d < distance){
                if (city != elem){
                    citiesAccepted.push(elem)
                }
            }
        })
        return { "message": citiesAccepted, "status" : 200}
        
        
    } catch (error) {
        return {"message": error, "status":500}
    }
}

// It finds the city with that guid value
function findCitybyGuid(guid,addresses){
    return addresses.find(elem => elem.guid == guid)
}

// It calculate distance between two cities
function calculateDistanze(cityA, cityB){
    const R = 6371e3; // metres
    var fi1 = cityA.latitude * Math.PI/180; // φ, λ in radians
    var fi2 = cityB.latitude * Math.PI/180;
    var dfi = (cityB.latitude-cityA.latitude) * Math.PI/180;
    var dlam = (cityB.longitude-cityA.longitude) * Math.PI/180;

    var a = Math.sin(dfi/2) * Math.sin(dfi/2) +
            Math.cos(fi1) * Math.cos(fi2) *
            Math.sin(dlam/2) * Math.sin(dlam/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = parseFloat(((R * c)/1000).toFixed(2)); 
    return d
}

// it loads addresses.json and return it as a string
function loadCities(){
    addresses = loadAddresses()
    return JSON.stringify(addresses)
}

//it loads address.json and return it as an object
function loadAddresses(){
    let rawdata = fs.readFileSync(global.appRoot + '/data/addresses.json');
    let addresses = JSON.parse(rawdata);
    return addresses
}

module.exports = {
    findCityByTag,
    citiesDistance,
    areaDistance,
    loadCities
}