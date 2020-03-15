<template>
    <div class="tc-placeholder" :style="styles" @click="handleClick"></div>
</template>

<script type="text/javascript">
export default {
    name: 'tc-placeholder',
    data: function() {
        return {
        };
    },
    computed: {
        styles: function() {
            return {
                height: this.height,
                backgroundColor: this.placeholderBackgroundColor,
            };
        },
    },
    props: {
        height: {
            type: String,
            default: '40px',
        },
        placeholderBackgroundColor: {
            type: String,
            default: '#ffff00',
        }
    },
    methods: {
        handleClick: function() {
            this.$emit('handleClick');
        }
    }
}
</script>

<style lang="less" scoped>
    .tc-placeholder {
        width: 100%;
    }
</style>