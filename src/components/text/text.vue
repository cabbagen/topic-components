<template>
    <div class="tc-text" :style="styles" @click="handleClick"> 
        <span>{{textContent}}</span>
    </div>
</template>

<script type="text/javascript">

export default {
    name: 'tc-text',
    data: function() {
        return {
        };
    },
    computed: {
        styles: function() {
            const alignMap = { 1: 'left', 2: 'center', 3: 'right' };

            return {
                color: this.textColor,
                fontSize: this.textFontSize,
                height: this.textLineHeight,
                lineHeight: this.textLineHeight,
                textAlign: alignMap[this.textAlignModel],
            };
        }
    },
    props: {
        textContent: {
            type: String,
            default: '这里是文本内容',
        },
        textColor: {
            type: String,
            default: '#ff00ff',
        },
        textFontSize: {
            type: String,
            default: '14px',
        },
        textLineHeight: {
            type: String,
            default: '30px',
        },
        textAlignModel: {
            type: Number,
            default: 2,  // 1 => 左对齐   2 => 居中对齐  3 => 右对齐
        }
    },
    methods: {
        handleClick: function(event) {
            this.$emit('handleClick', { event });
        }
    }
}
</script>

<style lang="less" scoped>
    .tc-text {
        width: 100%;
        background-color: #ffffff;
    }
</style>