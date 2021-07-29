<template>
    <div class="tc-image" :style="{ width, height }">
        <a href="javascript:;" target="_top" @click="handleImgLink">
            <img :src="imgSource" alt="image" />
        </a>
    </div>
</template>

<script type="text/javascript">

export default {
    name: 'tc-image',
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
        imgSource: {
            type: String,
            default: 'https://file.leke.cn/letao/2020-12-12/Sw5b/scWqYTy88Jzygnxe2S8bNy2Ikcwxuh.png',
        },
        imgLink: {
            type: String,
            default: '',
        },
        isUsedAnchor: {
            type: Number,
            default: 0,  // 0 => 不使用  1 => 使用
        },
    },
    methods: {
        handleImgLink: function(event) {
            this.$emit('handleClick', { event, options: { imgLink: this.imgLink, isUsedAnchor: this.isUsedAnchor } });
        }
    }
}
</script>

<style lang="less">
    .tc-image {
        width: 100%;
    }
    .tc-image a, .tc-image img {
        width: 100%;
        display: block;
    }
</style>
