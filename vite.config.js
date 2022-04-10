const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    target: 'es2015',
    outDir: path.resolve(__dirname, "dist"),
    minify: 'terser',

    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Artransfer',
      fileName: (format) => ((format == "umd") ? 'Artransfer.js' : `Artransfer.${format}.js`),
      formats: ["es", "umd", "iife"]
    },
    rollupOptions: {}
  }
})
