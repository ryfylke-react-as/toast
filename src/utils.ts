let incr = 0;
export const genId = () => {
  incr += 1;
  return `toast-${incr}`;
};
