const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

export default function getMessageTime(postSecs: number) {
    let currentTime: any = new Date()
    const secsNow = Math.floor(currentTime / 1000)
    let diff = Math.abs(secsNow - postSecs)
    let postDate = new Date(postSecs * 1000)

    const hour = postDate.getHours()
    const minute = postDate.getMinutes()
    const month = months[postDate.getMonth()]
    const date = postDate.getDate()
    const weekday = weekdays[postDate.getDay()]
    const year = postDate.getFullYear()

    if (diff < 86400) return `${hour}:${minute}` // within 1 day
    if (diff < 604800) return `${weekday} ${hour}:${minute}` // within 1 week
    return `${month} ${date}, ${year}, ${hour}:${minute}` // just returns date
}
