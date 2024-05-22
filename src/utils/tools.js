export const levelData = [
    5000,
    25000,
    50000,
    100000,
    1000000,
    2000000,
    10000000,
    50000000,
    100000000,
]
export const toMoneyFormat = (data) => {
    if (data >= 1000000) return data / 1000000 + 'M';
    if (data >= 1000) return data / 1000 + 'K';
    return data;
}