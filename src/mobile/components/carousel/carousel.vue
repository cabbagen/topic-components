<template>
    <div class="tc-carousel">
        <div class="tc-carousel-wrap" :style="wrapStyles" :id="ctcIntanceId">
            <div :key="index" :style="{ width, height }" class="tc-carousel-item" v-for="(item, index) in imgInfos">
                <TCImage :width="width" :height="height" :imgSource="item.imgSource" :imgLink="item.imgLink"></TCImage>
            </div>
        </div>
        <div class="tc-carousel-dots">
            <span :class="['tc-carousel-dot', item ? 'actived' : '']" v-for="(item, index) in dots" :key="index"></span>
        </div>
    </div>
</template>

<script type="text/javascript">

import TCImage from '../image/image.vue';

export default {
    name: 'tc-carousel',
    components: {
        TCImage,
    },
    data: function() {
        return {
            ctcIntanceId: +new Date(),
            wrapStyles: {
                width: this.imgInfos.length * 100 + '%',
            },
            dots: [true].concat((new Array(this.imgInfos.length - 1)).fill(false)),
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
    mounted: function() {

    },

    methods: {
        
    }
}
</script>

<style lang="less" scoped>
    .tc-carousel {
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .tc-carousel-wrap {
        display: flex;
    }
    .tc-carousel-item {

    }
    .tc-carousel-dots {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    .tc-carousel-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        background-color: #8391a5;
        margin: 0 3px;

        &.actived {
            background-color: #ffffff;
        }
    }
</style>


