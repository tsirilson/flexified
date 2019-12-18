# Flexified

Flexified is a simple TypeScript-based library that helps you generate a CSS flexbox-based square grid.

### Installation:

```
npm install flexified
```

### Usage:

Import the library and CSS:

```
import Flexified from 'flexified'
import 'flexified/src/styles.scss'
```

Import the library and __SCSS__ (CSS currently not supported):

 - `flexified-wrapper`: applied to your flexbox container
 - `flexified-child`: applied to your flexbox children

See the example below for implementation.

__Methods__:

Currently, Flexified has one method called `getClassNames`:

```
let classNames = Flexified.getClassNames(itemCount: number, mobileWidthThreshold: number)
```

This method returns a string array with a list of classes you will apply to your flexbox container.

__Options__:

`getClassNames` requires two parameters:

 - `itemCount` - the number of items in your flexbox container - __Required__

 - `mobileWidthThreshold` (default: `768`) - the window width from which the mobile layout will be enabled - __Optional__

__CSS Customization__:

The CSS allows to customize the padding between the flexbox children. 

Use the var `--flexified-padding` in order to change the padding between the flexbox children.

### Example:

__Vue.js component__

```
<template>
  <div
    class="flexified-wrapper"
    :class="classList"
    :style="'--flexified-padding:' + padding + 'px'"
  >
    <div class="flexified-item" v-for="n in itemCount" :key="n" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Flexified from 'flexified';
import 'flexified/src/styles.scss';

export default Vue.extend({
  name: 'Flexified',
  data: function () {
    return {
      mobileWidthThreshold: 768, // Optional
      itemCount: 8, // Reflect the number of children
      padding: 14,
      classList: ['']
    }
  },
  methods: {
    getClassList (): void {
      this.classList = Flexified.getClassNames(this.itemCount, this.mobileWidthThreshold) // Second parameter is optional
    },
    onResize(event: any): void {
      this.getClassList() 
    }
  },
  mounted() {
    this.getClassList() // 
    window.addEventListener('resize', this.onResize) // Update the flexbox on resize to enable responsivness
  }
});
</script>
```