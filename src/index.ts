import './styles.scss'

interface Options {
  itemCount: number
  mobileWidthThreshold: number
}

export default class Flexified {
  private static evenNumberEdgeCases = [2, 28]
  private static oddNumberEdgeCases = [5, 11, 14, 17, 23, 26, 29]

  static getClassNames (options: object): string[] {
    const customizationOptions = this.getOptions(options)
    const itemCountClass = 'flexified-item-count-' + customizationOptions.itemCount
    const isMobile = this.isMobile(customizationOptions.mobileWidthThreshold)
    const layoutClasses = this.getLayoutClasses(customizationOptions.itemCount, isMobile)
    return [...layoutClasses, itemCountClass]
  }

  private static getOptions(options: object) {
    const defaultOptions: Options = {
      itemCount: 0,
      mobileWidthThreshold: 768
    }
    return {...defaultOptions, ...options}
  }

  private static getLayoutClasses (itemCount: number, isMobile: boolean): string[] {
    let classList: string[]

    classList = []

    // Calculation is supported up to 34 items only
    if (itemCount < 1 || itemCount > 34) {
      return classList
    }

    if (isMobile) {
      classList.push('flexified-mobile')
      if (itemCount % 2 === 0) {
          classList.push('flexified-items-even')
      }
      else {
          classList.push('flexified-items-odd', 'flexified-wide-last-item')
      }
      return classList
    }

    // Special cases
    if (this.evenNumberEdgeCases.indexOf(itemCount) > -1) {
      return ['flexified-items-even']
    }

    // Special cases
    if (this.oddNumberEdgeCases.indexOf(itemCount) > -1) {
      return ['flexified-items-odd', 'flexified-two-thirds-width-last-item']
    }

    // Non-prime odd number, full width last item
    if (itemCount == 7 || itemCount % 5 === 0 || itemCount % 22 === 0 || itemCount === 34) {
      if (itemCount % 3 === 0) {
        return ['flexified-items-odd']
      }
      if (itemCount % 20 === 0) {
        return ['flexified-items-even']
      }
      return ['flexified-items-odd', 'flexified-full-width-last-item']
    }

    // Prime number
    if (this.isPrimeNumber(itemCount)) {
      if (itemCount % 3 !== 0) {
        return ['flexified-items-odd', 'flexified-full-width-last-item']
      }
      return ['flexified-items-odd']
    }

    // Any odd number, or numbers divided by 6
    if (itemCount % 2 !== 0 || itemCount % 6 === 0) {
      classList.push('flexified-items-odd')
      return classList
    }

    // Any even number
    if (itemCount % 2 === 0) {
      classList.push('flexified-items-even')
      return classList
    }

    return classList
  }

  private static isMobile(mobileWidthThreshold: number): boolean{
    let isMobileWidth = window.innerWidth <= mobileWidthThreshold

    window.addEventListener('resize', () => {
        isMobileWidth = window.innerWidth <= mobileWidthThreshold
    })

    return isMobileWidth
  }

  private static isPrimeNumber (number : number): boolean {
    const sqrtnum = Math.floor(Math.sqrt(number))
    let prime = number != 1
    for(let i = 2; i < sqrtnum + 1; i++) {
      if (number % i == 0) {
        prime = false
        break
      }
    }
    return prime;
  }
}
