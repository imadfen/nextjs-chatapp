export function datetimeFormat(dateTime: Date, type: "time" | "date" | undefined) {
    const dateObject = new Date(dateTime);
    var format: {
        hour?: "2-digit" | "numeric" | undefined,
        minute?: "2-digit" | "numeric" | undefined,
        day?: "2-digit" | "numeric" | undefined,
        month?: "2-digit" | "numeric" | undefined,
        year?: "2-digit" | "numeric" | undefined,
    }

    switch (type) {
        case "time":
            format = {
                hour: '2-digit',
                minute: '2-digit',
            }
            break;

        case "date":
            format = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }
            break;

        default:
            format = {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }
            break;
    }

    const formattedDate = dateObject.toLocaleString('en-GB', format);

    return formattedDate
}



export function isToday(date: Date) {
    const today = new Date()
    const inputDate = new Date(date)

    return (compareDates(today, inputDate) == 0)
}



export function compareDates(d1: Date, d2: Date) {
    const date1 = new Date(d1)
    const date2 = new Date(d2)

    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    if (year1 === year2 && month1 === month2 && day1 === day2) {
        return 0
    } else if (year1 < year2 || (year1 === year2 && month1 < month2) || (year1 === year2 && month1 === month2 && day1 < day2)) {
        return -1
    } else {
        return 1
    }
}



