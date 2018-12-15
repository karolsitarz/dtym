module.exports = (src) => {
  let padding = (src.charAt(src.length - 2) === '=') ? 2 : ((src.charAt(src.length - 1) === '=') ? 1 : 0);
  return (src.length - (src.indexOf(',') + 1)) * 0.75 - padding;
};
