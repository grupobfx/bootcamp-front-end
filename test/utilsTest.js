const cleanString = (str) => {
  if (!str) {
    return '';
  }

  return str
    .replace(/(\r\n|\n|\r|\t)/gm, ' ')
    .trim()
    .replace(/\s/g, '');
};

export default {
  cleanString,
};
