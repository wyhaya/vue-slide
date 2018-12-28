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
                onClick(i){
                    console.log('click', i)
                },
                onChange(i) {
                    console.log('change', i)
                },
                onNext(i) {
                    console.log('next', i)
                },
                onPrev(i) {
                    console.log('prev', i)
                }
            }
        })
    }
})
