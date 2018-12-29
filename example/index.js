import Vue from 'vue'
import Slide from '../src/index'

new Vue({
    el: '#root',
    render(createElement) {
        return createElement(Slide, {
            props: {
                data: ['1.png', '2.png', '3.png'],
                time: 3000,
                speed: 300,
                spot: true,
                type: 'ease',
                clockwise: true
            },
            on: {
                click(i) {
                    console.log('click', i)
                },
                change(i) {
                    console.log('change', i)
                },
                next(i) {
                    console.log('next', i)
                },
                prev(i) {
                    console.log('prev', i)
                }
            }
        })
    }
})
