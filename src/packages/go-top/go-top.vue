<template>
    <div :class="['go-top-container', visiable ? '' : 'hidden']" @click="handleGoTop">
        <svg-icon class="top-icon" icon="xiangshang" />
    </div>
</template>

<script type="text/javascript">
import SvgIcon from '../../common/svg-icon.vue';

export default {
    name: 'go-top',
    components: {
        'svg-icon': SvgIcon,
    },
    props: {
        scrollThreshold: {
            type: Number, default: 200
        },
    },
    data: function() {
        return {
            visiable: true,
        };
    },
    mounted: function() {
        this.handleScrollListener();
    },
    methods: {
        handleGoTop: function(event) {
            this.$emit('handleClick', { event, options: {} });

            this.$nextTick(() => {
                document.documentElement.scrollTop = 0;
            });
        },
        handleScrollListener: function() {
            document.documentElement.addEventListener('scroll', () => {
                this.visiable = document.documentElement.scrollTop > this.scrollThreshold;
            }, false);
        },
    }
};
</script>

<style lang="less">
.go-top-container {
    opacity: 0.7;
    display: flex;
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: 0.14rem;
    bottom: 0.6rem;
    align-items: center;
    justify-content: center;
    background-color: #bababa;
    cursor: pointer;

    &.hidden {
        display: none;
        transition: display .4s ease-in-out;
    }
}
.go-top-container .top-icon {
    color: #ffffff;
}
</style>
