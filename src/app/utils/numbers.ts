export const isPositiveInteger = (n: number): boolean =>
    Number.isInteger(n) && n > 0;

export const getRandomIntegerBetween = (min: number, max: number): number =>
    min + Math.floor(Math.random() * (max - min));
