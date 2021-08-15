export default function timeConverter(UNIX_timestamp: number) {
    var a = new Date(UNIX_timestamp * 1000)
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    return date + ' ' + month + ' ' + year
}
