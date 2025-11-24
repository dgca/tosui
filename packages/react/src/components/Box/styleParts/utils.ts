export function getShorthandValue(
  top: string,
  right: string,
  bottom: string,
  left: string
) {
  if (top === right && right === bottom && bottom === left) {
    return top;
  }

  if (top === bottom && left === right) {
    return `${top} ${right}`;
  }

  if (left === right) {
    return `${top} ${right} ${bottom}`;
  }

  return `${top} ${right} ${bottom} ${left}`;
}
