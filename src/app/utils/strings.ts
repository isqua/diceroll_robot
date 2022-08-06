export const extractNumbers = (str: string): number[] => {
    const candidates = str.match(/[+-]?([0-9]*[.])?[0-9]+/g);

    if (!candidates) {
        return [];
    }

    return candidates.map((n) => parseFloat(n));
};
