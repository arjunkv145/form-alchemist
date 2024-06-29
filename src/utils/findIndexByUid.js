export default function findIndexByUid(elements, uid) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (element.uid === uid) {
            return { index: i, element }
        }
        if (element.children) {
            const nestedElement = findIndexByUid(element.children, uid)
            if (nestedElement) {
                return { index: i, nestedElement }
            }
        }
    }
    return null
}