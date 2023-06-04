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
