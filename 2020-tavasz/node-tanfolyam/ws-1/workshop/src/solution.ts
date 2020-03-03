interface User {
  name: string
  age: number
}

/**
 * Filter out all the falsy values from the array
 */
export function filterFalsy(array: any[]): any[] {
  return array.filter(Boolean)
}

/**
 * Find the max value in the input and return it
 * @param arr
 */
export function max(arr: number[]): number {
  return Math.max(...arr)
}

/**
 * Add `num` to every item to the array, then return a new array
 * @param array
 */
export function addTo(array: number[], num: number): number[] {
  return array.map(it => it + num)
}

/**
 * Sort the array by the user's age
 * @param users
 */
export function sortUsers(users: User[]): User[] {
  return users.sort((a, b) => a.age - b.age)
}

/**
 * Return the section of the array specified by the params
 * @param arr
 * @param from the starting position, inclusive
 * @param to the ending position, inclusive
 */
export function section<T>(arr: T[], from: number, to: number): T[] {
  return arr.slice(from, to)
}

/**
 * Return the sum of the two arrays' values
 * @param arr1 the first array
 * @param arr2 the second array
 */
export function addArrays(arr1: number[], arr2: number[]): number {
  return arr1.concat(arr2).reduce((acc, val) => acc += val)
}

/**
 * Return the reversed sting of the input
 * @param str the string to be reversed
 */
export function reverse(str: string): string {
  return Array.from(str).reverse().join('')
}

/**
 * Return te array without the second and third items
 * @param arr
 */
export function withoutSecondAndThird(arr: any[]): any[] {
  const [first, , , ...rest] = arr
  return [first, ...rest]
}

/**
 * Capitalize each word in the input sentence
 * @param str the sentence
 */
export function capitalize(str: string): string {
  return str.split(' ')
    .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

/**
 * Reverse each word in the string. All spaces should be retained
 * e.g. "This is an example!" ==> "sihT si na !elpmaxe"
 * @param str
 */
export function reverseWords(str: string): string {
  return str.split(' ').map(it => Array.from(it).reverse().join('')).join(' ')
}

/**
 * Return the sum of numbers less than num that are divisible
 * by 3 or 5. If both, count only once
 * @param num
 */
export function sumIf(num: number) {
  if (num > 0) {
    return [...Array(num).keys()].reduce((acc, val) => {
      if (val % 3 === 0 || val % 5 === 0) {
        acc += val
      }
      return acc
    }, 0) || 0
  } else {
    return 0
  }
}
