

import VuePlugin from 'rollup-plugin-vue'

process.env.NODE_ENV = 'production'

export default {
    input: 'src/index.vue',
    output: {
        file: './lib/index.js',
        format: 'cjs'
    },
    plugins: [
        VuePlugin()
    ]
}


