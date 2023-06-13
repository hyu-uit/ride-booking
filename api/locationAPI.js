var requestOptions = {
  method: "GET",
};

const API_KEY = "bce134fa0b5d4472b96e34f7257bcd81";

export const getSingleAddressFromCoordinate = (latitude, longitude) => {
  return fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=vi&limit=1&apiKey=${API_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result.features[0].properties);
};

export const getAutoCompleteResults = (input) => {
  return fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&lang=vi&limit=5&filter=circle:106.78993520934023,10.879049678627098,2500&bias=circle:106.78949432907052,10.877580243419757,2500|countrycode:none&format=json&apiKey=${API_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then(({ results }) => results);
};

export const getRoutingFromCoordinates = (pickupLoc, destinationLoc) => {
  return fetch(
    `https://api.geoapify.com/v1/routing?waypoints=${pickupLoc.latitude},${pickupLoc.longitude}|${destinationLoc.latitude},${destinationLoc.longitude}&mode=motorcycle&lang=en&details=route_details&apiKey=${API_KEY}`,
    requestOptions
  )
    .then((response) => {
      console.log("🚀 ~ file: locationAPI.js:31 ~ .then ~ response:", response);
      return response.json();
    })
    .then((result) => result.features[0]);
};
