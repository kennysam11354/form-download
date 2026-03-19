import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                standard: resolve(__dirname, 'standard-form.html'),
                ramada: resolve(__dirname, 'ramada-form.html'),
                pest: resolve(__dirname, 'pest-control-erp-uml.html'),
                pest_erp_user_intro: resolve(__dirname, 'pest-control-erp-user-intro.html'),
                pest_erp_arch_intro: resolve(__dirname, 'pest-control-erp-arch-intro.html'),
                pest_erp_op_manual: resolve(__dirname, 'pest-control-erp-operation-manual.html'),
            },
        },
    },
})
