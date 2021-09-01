export default function getNameCombinations(s: string): string[] {
    let ans = []
    for (let i = 0; i < s.length; i++) {
        ans.push(s[i].toLowerCase())
        let str = s[i]
        for (let j = i + 1; j < s.length; j++) {
            str += s[j]
            ans.push(str.toLowerCase())
        }
    }
    return ans
}
