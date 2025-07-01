const getArgValue = (flag: string, value: string) => {
  const index = process.argv.findIndex((arg) => arg === flag);
  return index !== -1 && process.argv[index + 1]
    ? process.argv[index + 1]
    : value;
};

export default getArgValue;
