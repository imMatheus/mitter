import timeConverter from './timeConverter'

export default function getDateSincePost(postSecs: number) {
    let s: any = new Date()
    const secsNow = Math.floor(s / 1000)
    let diff = Math.abs(secsNow - postSecs)

    if (diff < 60) return diff + ' secs' // within 1 minute
    if (diff < 3600) return Math.floor(diff / 60) + ' min' // within 1 hour
    if (diff < 86400) return Math.floor(diff / 3600) + ' hours' // within 1 day
    if (diff < 259200) return Math.floor(diff / 86400) + ' days' // within 3 days
    return timeConverter(postSecs) // just returns date
}
