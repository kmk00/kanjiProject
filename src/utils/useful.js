export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export const getLimitedArrayLength = (array, limit) =>
  array.slice(0, limit).length;
