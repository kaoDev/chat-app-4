import materialpalette from "material-palette";

const hashCode = string => {
  let hash = 0;

  for (let char of string) {
    hash = ((hash << 5) - hash + char.charCodeAt()) | 0;
  }
  return hash;
};

export const generateColor = str => {
  const hash = hashCode(str) * 11.25;
  const h = Math.abs(hash % 360);
  const s = 58;
  const l = 54;

  const color = materialpalette({ h, s, l })["A400"];

  return `hsl(${color.h},${color.s}%,${color.l}%)`;
};
