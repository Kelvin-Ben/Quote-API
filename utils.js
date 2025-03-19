const getRandomElement = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Expected an Array");
  return arr[Math.floor(Math.random() * arr.length)];
};
