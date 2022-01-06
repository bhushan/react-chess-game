export const getDeepCopy = <T extends Object>(obj: T) => JSON.parse(JSON.stringify(obj))
