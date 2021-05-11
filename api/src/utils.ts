export const getDateDifferenceInDays = (date1: Date, date2: Date) => {
    return Math.floor(
        Math.abs(date1.getTime() - date2.getTime()) / (1000 * 24 * 60 * 60)
    );
};
