interface Options {
  itemCount: number
  mobileWidthThreshold: number
}

class Flexified {
  static getClassNames (options: object): string[] {
    const customizationOptions = this.getOptions(options)
    const itemCountClass = 'flexified-item-count-' + customizationOptions.itemCount
    const isMobile = this.isMobile(customizationOptions.mobileWidthThreshold)
    const layoutClasses = this.getLayoutClasses(customizationOptions.itemCount, isMobile)
    return [...layoutClasses, itemCountClass]
  }

  private static getOptions(options: object){
    const defaultOptions: Options = {
      itemCount: 0,
      mobileWidthThreshold: 768
    }
    return Object.assign({}, defaultOptions, options)
  }

  private static getLayoutClasses (itemCount: number, isMobile: boolean): string[] {
    let classList: string[]

    classList = []

    if(isMobile){
      classList.push('flexified-mobile')

      if(itemCount % 2 === 0){
          classList.push('flexified-items-even')
      }else{
          classList.push('flexified-items-odd', 'flexified-wide-last-item')
      }

      return classList
    }

    if (itemCount == 2) {
      return ['flexified-items-even']
    }

    if (itemCount % 2 !== 0 && itemCount % 3 !== 0) {
      classList.push('flexified-items-odd')
      if (itemCount >= 5) {
          classList.push('flexified-wide-last-item')
      }
      return classList
    }

    if (itemCount % 3 === 0) {
      return ['flexified-items-odd']
    }

    if (itemCount % 4 === 0) {
      return ['flexified-items-even']
    }

    if (itemCount % 10 === 0 && itemCount > 10) {
      return ['flexified-items-even']
    }

    if (itemCount % 5 === 0) {
      classList.push('flexified-items-odd')
      if (itemCount % 10 === 0) {
          classList.push('flexified-wide-last-item')
      }
      return classList
    }

    if (itemCount % 7 === 0) {
      return ['flexified-items-odd', 'flexified-wide-last-item']
    }

    if (itemCount == 22 || itemCount == 26 || itemCount == 34) {
      return ['flexified-items-odd', 'flexified-wide-last-item']
    }

    if (itemCount > 2 && itemCount % 2 === 0) {
      return ['flexified-items-even']
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
}

export = Flexified
