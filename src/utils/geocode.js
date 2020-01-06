const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicHJpeWFua2FycyIsImEiOiJjazRwZjJjbzUweTlzM2tzMzMxM2d1OXMxIn0.VmOR4qwRYyv63EQadX1yBw&limit=1";
  // here encodeURIComponent will prevent the url to fail when special characters like ? is adde in url.

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // Here instead of console log we call the callback function and pass the error so that it can chose what to do with it.
      callback("Unable to connect to Location Service!", undefined); // Since the callback is taking 2 arguments in function call.
    } else if (body.features.length === 0) {
      callback("Unable to find the Address. Try another Search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
