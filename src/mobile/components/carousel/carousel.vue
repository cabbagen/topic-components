<template>
    <div class="tc-carousel">
        <div class="tc-carousel-wrap" :style="wrapStyles" :id="ctcIntanceId">
            <div :key="index" :style="{ width, height }" class="tc-carousel-item" v-for="(item, index) in imgInfos">
                <TCImage :width="width" :height="height" :imgSource="item.imgSource" :imgLink="item.imgLink"></TCImage>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

import { getComputedStyle } from '../../../utils/utils';
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
        this.handleCaleWrapStyles();
    },

    methods: {
        handleCaleWrapStyles: function() {
            const that = this;
            const element = document.getElementById(this.ctcIntanceId).getElementsByClassName('tc-carousel-item')[0];

            if (!element) {
                return;
            }

            this.wrapStyles = {
                width: `${parseInt(getComputedStyle(element, 'width'), 10) * that.imgInfos.length}px`,
            };

            console.log(this.wrapStyles.width);
        }
    }
}
</script>

<style lang="less" scoped>
    .tc-carousel {
        width: 100%;
        overflow: hidden;
    }
    .tc-carousel-wrap {
        // display: flex;
    }
    .tc-carousel-item {

    }
</style>


