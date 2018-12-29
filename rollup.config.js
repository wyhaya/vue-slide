

import VuePlugin from 'rollup-plugin-vue'

process.env.NODE_ENV = 'production'

export default {
    input: 'src/index.vue',
    output: {
        file: './vue-slide/index.js',
        format: 'cjs'
    },
    plugins: [
        VuePlugin()
    ]
}


