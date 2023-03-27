export const logger = (message, data) => {
  console.log(JSON.stringify({ message, data }));
};
