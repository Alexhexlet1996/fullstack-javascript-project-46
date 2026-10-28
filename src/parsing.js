const parsing = (stringFile1, stringFile2) => {
  return {
    file1: JSON.parse(stringFile1),
    file2: JSON.parse(stringFile2),
  };
};

export { parsing };
