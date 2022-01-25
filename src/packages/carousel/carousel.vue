<template>
    <div class="swiper-container" :style="{ height }">
        <div class="swiper-wrapper">
            <div :key="handleMakeMD5(item.imgSource + index.toString())" v-for="(item, index) in images" class="swiper-slide">
                <tc-image :width="width" :height="height" :imgSource="item.imgSource" :imgLink="item.imgLink" @handleClick="handleSwiperClick" />
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script type="text/javascript">

import Swiper from 'swiper/swiper-bundle.esm.js';
import TCImage from '../image/image.vue';
import imageStruct from '../../struct/image.js';
import { makeMD5 } from '../../utils/utils.js';

import 'swiper/swiper-bundle.css';

export default {
    name: 'tc-carousel',
    components: {
        'tc-image': TCImage,
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
        delay: {
            type: Number,
            default: 1500,
        },
        images: {
            validator: function(values) {
                if (!(values instanceof Array)) {
                    return false;
                }
                return values.every(function(value) {
                    return typeof value.imgSource !== 'undefined' && typeof value.imgLink !== 'undefined';
                });
            },
            default: function() {
                return [imageStruct, imageStruct];
            }
        },
    },
    mounted: function() {
        this.initSwipter();
    },
    methods: {
        initSwipter: function() {
            if (this.mySwiper) {
                return;
            }
            this.mySwiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: {
                    delay: this.delay || 1500,
                    disableOnInteraction: false
                },
                pagination: {
                    type: 'bullets',
                    el: '.swiper-pagination',
                },
            });
        },

        handleSwiperClick: function(params) {
            this.$emit('handleClick', params);
        },

        handleMakeMD5(text) {
            return makeMD5(text);
        }
    },
    updated: function() {
        if (this.mySwiper) {
            this.mySwiper.destroy();
            this.mySwiper = null;
        }
        this.$nextTick(() => this.initSwipter());
    }}
</script>

<style lang="less">
    .swiper-container {
        width: 100%;
    }
    .swiper-wrapper {
        height: auto !important;
    }
    .swiper-slide {
        width: 100% !important;
        height: auto !important;
    }
</style>
