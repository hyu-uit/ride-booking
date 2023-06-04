var requestOptions = {
  method: "GET",
};

const API_KEY = "bce134fa0b5d4472b96e34f7257bcd81";

export const getAddressFromCoordinate = (latitude, longitude) => {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${API_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result.features[0].properties))
    .catch((error) => console.log("error", error));
};
