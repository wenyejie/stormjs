module.exports = {
  presets: [
    '@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.object.assign',
        'es6.object.keys',
        'es6.array.filter',
        'es6.array.map',
        'es6.array.find',
        'es7.array.includes',
        'es7.symbol.async-iterator'
      ]
    }
  ]
}
