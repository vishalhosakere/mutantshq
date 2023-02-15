export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function delay(millisec: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, millisec);
  });
}

export function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
}

export function fixed2Points(value: string) {
  return parseFloat(parseFloat(value).toFixed(2));
}

export function fixedStr2Points(value: number, precision: number) {
  const val = parseFloat(value.toFixed(precision));
  return isNaN(val) ? 0 : val;
}
