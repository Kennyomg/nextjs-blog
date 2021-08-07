const withPWA = require('next-pwa')
const withImages = require('next-images')

module.exports = withPWA({
    pwa: {
        dest: 'public'
    },
    future: {
        webpack5: true
    }
})

module.exports = withImages({
    esModule: true,
    webpack(config, options) {
      return config
    }
  });