"use strict";
class Flexified {
    static getClassNames(options) {
        const customizationOptions = this.getOptions(options);
        const itemCountClass = 'flexified-item-count-' + customizationOptions.itemCount;
        const isMobile = this.isMobile(customizationOptions.mobileWidthThreshold);
        const layoutClasses = this.getLayoutClasses(customizationOptions.itemCount, isMobile);
        return [...layoutClasses, itemCountClass];
    }
    static getOptions(options) {
        const defaultOptions = {
            itemCount: 0,
            mobileWidthThreshold: 768
        };
        return Object.assign({}, defaultOptions, options);
    }
    static getLayoutClasses(itemCount, isMobile) {
        let classList;
        classList = [];
        if (isMobile) {
            classList = [...classList, 'flexified-mobile'];
            if (itemCount % 2 === 0) {
                classList = [...classList, 'flexified-items-even'];
            }
            else {
                classList = [...classList, 'flexified-items-odd', 'flexified-wide-last-item'];
            }
            return classList;
        }
        else {
            if (itemCount == 2) {
                return [...classList, 'flexified-items-even'];
            }
            // Check the edge cases for this statement
            if (itemCount % 2 !== 0 && itemCount % 3 !== 0) {
                classList = [...classList, 'flexified-items-odd'];
                if (itemCount >= 5) {
                    return [...classList, 'flexified-wide-last-item'];
                }
                return classList;
            }
            if (itemCount % 3 === 0) {
                return [...classList, 'flexified-items-odd'];
            }
            if (itemCount % 4 === 0) {
                return [...classList, 'flexified-items-even'];
            }
            if (itemCount % 10 === 0 && itemCount > 10) {
                return [...classList, 'flexified-items-even'];
            }
            if (itemCount % 5 === 0) {
                classList = [...classList, 'flexified-items-odd'];
                if (itemCount % 10 === 0) {
                    return [...classList, 'flexified-wide-last-item'];
                }
                return classList;
            }
            if (itemCount % 7 === 0) {
                classList = [...classList, 'flexified-items-odd', 'flexified-wide-last-item'];
                return classList;
            }
            if (itemCount == 22 || itemCount == 26 || itemCount == 34) {
                return [...classList, 'flexified-items-odd', 'flexified-wide-last-item'];
            }
            if (itemCount > 2 && itemCount % 2 === 0) {
                return [...classList, 'flexified-items-even'];
            }
            return classList;
        }
    }
    static isMobile(mobileWidthThreshold) {
        let isMobileWidth = window.innerWidth <= mobileWidthThreshold;
        window.addEventListener('resize', () => {
            isMobileWidth = window.innerWidth <= mobileWidthThreshold;
        });
        return isMobileWidth;
    }
}
module.exports = Flexified;
