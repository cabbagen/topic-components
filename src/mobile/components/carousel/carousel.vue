<template>
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
        </div>
    </div>
</template>

<script type="text/javascript">

import Swiper from 'swiper/swiper-bundle.esm.js';

import 'swiper/swiper-bundle.css';


export default {
    name: 'tc-carousel',
    components: {
        // TCImage,
    },
    data: function() {
        return {
            
        };
    },
    props: {
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: 'auto',
        },
        imgInfos: {
            validator: function(values) {
                if (!(values instanceof Array)) {
                    return false;
                }
                return values.some(function(value) {
                    return typeof value.imgSource !== 'undefined' || typeof value.imgLink !== 'undefined';
                });
            },
        },
    },
    mounted() {
         this.mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {// 自动滑动
                delay: 1000, //1秒切换一次
                disableOnInteraction: false
            },
        });
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
    .swiper-container {
        width: 375px;
        height: 300px;
    }
</style>


