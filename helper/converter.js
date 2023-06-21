function ceilingFunction(number) {
  // Get the length of the number
  const intNumber = Math.ceil(number);
  const length = intNumber.toString().length;

  // Get the power of 10 based on the length
  const power = Math.pow(10, length - 2);

  // Calculate the ceiling value
  const result = Math.ceil(intNumber / power) * power;

  return result;
}

// for example: 1220m -> 1300m -> 1.3km
export function ceilingKilometer(distanceInMeter) {
  const ceilingInMeter = ceilingFunction(distanceInMeter);
  const distanceInKm = ceilingInMeter / 1000;
  return distanceInKm;
}

// for example: 1226s -> 21 minutes
export function ceilingMinute(timeInSeconds) {
  const minutes = Math.ceil(timeInSeconds / 60); // Convert seconds to minutes and round up
  return minutes;
}
