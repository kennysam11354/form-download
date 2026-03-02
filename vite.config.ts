import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                standard: resolve(__dirname, 'standard-form.html'),
                ramada: resolve(__dirname, 'ramada-form.html'),
            },
        },
    },
})
