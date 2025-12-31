export const extractNumber = (value: string): number => {
    const match = value.match(/\d+/);
    return match ? Number(match[0]) : 0;
};
