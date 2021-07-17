export const extractTitle = (title: string): string => {
    let arr = title.split('')
    let name = arr.filter((_: string, index:number) => index < (arr.indexOf('-') - 1))

    return name.length > 1 ? name.join('') : title
}
// console.log(extractTitle('Some New Name - Black-Green-Blue'))

export const extractColor = (title: string): string | null => {
    let arr = title.split('')
    let color = arr.filter((_: any, i: number) => i > (arr.indexOf('-') + 1))
    return color.length > 1 ? color.join('') : null
}
// console.log(extractColor('Another Name - Some new color'))