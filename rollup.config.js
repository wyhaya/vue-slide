

import VuePlugin from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs' 

process.env.NODE_ENV = 'production'

export default {
    input: 'src/index.vue',
    output: {
        file: './vue-slide/index.js',
        format: 'cjs'
    },
    plugins: [
        commonjs(),
        VuePlugin(),
        babel({
            extensions: ['.js', '.vue'],
        })
    ]
}

