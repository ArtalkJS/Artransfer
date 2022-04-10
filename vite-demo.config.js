const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    target: 'es2015',
    outDir: path.resolve(__dirname, "deploy"),
    minify: 'terser',

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  }
})
