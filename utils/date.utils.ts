// Si es positivo entonces es menor que la fecha actual, de lo contraior será mayor
export const SubstractDates = (date1: Date, date2: Date) => {
    const date1Time = date1.getTime();
    const date2Time = date2.getTime();

    const difference = date2Time - date1Time

    const days = difference / (1000 * 3600 * 24)

    return days
}

export const IsUpperThanToday = (date: Date) => {
    return (new Date()).getTime() < date.getTime()
}

export const IsLessThanAMonth = (date: Date) => {
    const result = SubstractDates(date, new Date())
    console.log(date)
    console.log(result)
    return result < 30
}