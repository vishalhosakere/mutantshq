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
