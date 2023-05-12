export const getRandomNumber = (min: number, max: number) => {
  // Generate a random number between 0 and 1
  const random = Math.random();

  // Scale the random number to the range between min and max
  const scaled = random * (max - min);

  // Shift the scaled random number to the appropriate range offset by min
  const shifted = scaled + min;

  // Round the shifted random number down to an integer
  const result = Math.floor(shifted);

  return result;
}