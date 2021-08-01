<template>
    <div v-transfer-dom :data-transfer="true">
        <div class="tc-common-mask" v-show="value" @click="handleCloseMaskByMask">
            <div class="tc-common-mask-content">
                <slot>这是示例弹窗内容</slot>
            </div>
            <div class="tc-common-mask-close" @click="handleCloseMask">
                <slot name="close">
                    <i class="iconfont iconguanbi tc-common-mask-close-icon"></i>
                </slot>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Transfer from '../directives/transfer-dom';

export default {
    name: 'common-mask',
    data: function() {
        return {};
    },
    directives: {
        'transfer-dom': Transfer,
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        maskClosable: {
            type: Boolean,
            default: false,
        },
        onClose: {
            type: Function,
        },
    },
    methods: {
        handleCloseMaskByMask: function() {
            if (!this.maskClosable)	{
                return;
            }
            this.handleCloseMask();
        },
        handleCloseMask: function() {
            this.$emit('input', !this.value);
            this.$emit('onClose');
        },
    },
}
</script>

<style lang="less">
    .tc-common-mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }
    .tc-common-mask-close {
        margin: 20px auto;
        text-align: center;
    }
    .tc-common-mask-close-icon.iconfont {
        color: #ffffff;
        font-size: 20px;
    }
</style>
