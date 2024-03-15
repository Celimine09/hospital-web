import moment from "moment"

export const TruncateDateToSqlFormat = (date: Date | null | undefined | string) => {
    // admission_date: moment(newRowToUpdate.admission_date).format("YYYY/MM/DD"),
    if (date === null ||
        date === "Invalid Date" ||
        date === undefined
        )
    {
        return "null";
    }

    const d = moment(date).format("YYYY/MM/DD")
    return `'${d}'`
    // return `${d}`

}