export const hashCode = str => {
  // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const intToRGB = i => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

const between = (min, max) => val => Math.max(min, Math.min(val, max));

export const generateColor = str => {
  const hash = hashCode(str) & 0x0fffffff;
  var h = between(0, 360)(hash % 360);
  var s = between(52, 87)(hash & (0x0000ff00 >> 8));
  var l = between(10, 40)(hash & 0x000000ff);
  return `hsl(${h},${s}%,${l}%)`;
};
