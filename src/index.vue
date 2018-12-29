<template>
    <div class="vue-slide" ref="contentRef">
        <div
            class="content"
            :style="{
                transform: `translate3d(${slideX}px, 0px, 0px)`,
                transition: `transform ${transition / 1000}s ${type}`
            }"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            @transitionend="transitionEnd"
        >
            <div><img :src="prevItem" /></div>
            <div><img :src="data[cur]" @click="$emit('click', cur)" /></div>
            <div><img :src="nextItem" /></div>
        </div>
        <div v-if="spot" class="spot">
            <div
                v-for="(d, i) in data.length"
                :class="{
                    cur: i === cur
                }"
                :key="i"
            />
        </div>
    </div>
</template>

<script>
require('./index.css')
export default {
    props: {
        data: {
            default: [],
            type: Array
        },
        time: {
            default: 3000,
            type: Number
        },
        speed: {
            default: 300,
            type: Number
        },
        spot: {
            default: true,
            type: Boolean
        },
        type: {
            default: 'ease',
            type: String
        },
        clockwise: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            cur: 0,
            slideX: 0,
            transition: 0,
            touch: {
                startX: 0, // 触摸的初始位置 X
                startY: 0, // 触摸的初始位置 Y
                ifN: false, // 确定是否需要触摸移动的时候需要判断
                direction: false, // 确定是向上滚动还是向下滚动
                timer: null, // 定时滚动的定时器
                duration: 0, // 触摸了时间
                scrollDirection: false // 滚动方向
            }
        }
    },
    mounted() {
        this.setTimer()
    },
    computed: {
        prevItem() {
            const item = this.data[this.cur - 1]
            return item ? item : this.data[this.data.length - 1]
        },
        nextItem() {
            const item = this.data[this.cur + 1]
            return item ? item : this.data[0]
        }
    },
    methods: {
        getGap(x, y = 0) {
            return parseInt((x - y).toString().replace('-', ''))
        },
        touchStart(e) {
            this.touch.startX = e.touches[0].clientX
            this.touch.startY = e.touches[0].clientY
            this.touch.ifN = true
            this.touch.duration = new Date().getTime()
            window.clearInterval(this.touch.timer)
            this.transition = 0
        },
        touchMove(e) {
            if (this.touch.ifN) {
                if (
                    this.getGap(e.touches[0].clientX, this.touch.startX) >=
                    this.getGap(e.touches[0].clientY, this.touch.startY)
                ) {
                    this.touch.direction = true
                    e.currentTarget.style.transition = ''
                } else this.touch.direction = false
                this.touch.ifN = false
            } else {
                // 根据状态来判断是否滚动
                if (this.touch.direction) {
                    e.preventDefault()
                    this.slideX = e.touches[0].clientX - this.touch.startX
                }
            }
        },
        touchEnd() {
            this.setTimer()
            if (!this.touch.direction) return

            // 接触的时间
            const time = new Date().getTime() - this.touch.duration

            // 如果超过300毫秒 那么判断是否滑动到下一个上一个轮播的依据为 滑动的距离是否超过轮播宽度的三分之一
            if (time > 300 && this.getGap(this.slideX) < this.$refs.contentRef.offsetWidth / 3) {
                // 还原 的速度为 过渡时间的0.8倍
                this.touch.scrollDirection = false
                this.transition = this.speed * 0.8
                this.slideX = 0
            } else {
                // 防止点击时滑动
                if (this.slideX !== 0) {
                    this.slideX > 0 ? this.prev() : this.next()
                }
            }
        },
        prev() {
            this.touch.scrollDirection = 'prev'
            this.transition = this.speed
            this.slideX = this.$refs.contentRef.offsetWidth
        },
        next() {
            this.touch.scrollDirection = 'next'
            this.transition = this.speed
            this.slideX = -this.$refs.contentRef.offsetWidth
        },
        transitionEnd() {
            let cur = 0
            if (this.touch.scrollDirection === false) {
                cur = this.cur
            } else {
                if (this.touch.scrollDirection === 'prev') {
                    if (this.cur === 0) {
                        cur = this.data.length - 1
                    } else {
                        cur = this.cur - 1
                    }
                    this.$emit('prev', cur)
                } else {
                    if (this.cur !== this.data.length - 1) {
                        cur = this.cur + 1
                    }
                    this.$emit('next', cur)
                }
            }
            if (this.cur !== cur) {
                this.$emit('change', cur)
            }
            this.transition = 0
            this.slideX = 0
            this.cur = cur
        },
        setTimer() {
            if (this.time) {
                this.touch.timer = setInterval(this.clockwise ? this.next : this.prev, this.time)
            }
        }
    }
}
</script>
