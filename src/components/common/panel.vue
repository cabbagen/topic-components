<template>
    <div class="tc-common-panel" :style="{ display: value ? 'block' : 'none' }">
        <div class="tc-common-panel-header">
            <span>{{title}}</span>
            <Icon class="icon" type="ios-close" @click="handlePanelCancel" />
        </div>
        <div class="tc-common-panel-content">
            <slot name="content"></slot>
        </div>
        <div class="tc-common-panel-footer">
            <slot name="footer">
                <Button @click="handlePanelCancel">取消</Button>
                <Button type="primary" @click="handlePanelDelete">删除</Button>
                <Button type="primary" @click="handlePanelOk">确定</Button>
            </slot>
        </div>
    </div>
</template>

<script type="text/javascript">
import { Icon, Button } from 'view-design';

export default {
    name: 'tc-common-panel',
    data: function() {
        return {
        };
    },
    components: {
        Icon,
        Button
    },
    props: {
        title: {
            type: String,
            default: '组件编辑'
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handlePanelCancel: function() {
            this.$emit('input', false);
        },
        handlePanelDelete: function() {
            this.$emit('handlePanelDelete');
        },
        handlePanelOk: function() {
            this.$emit('handlePanelOk');
        }
    }
}
</script>

<style lang="less" scoped>
    .tc-common-panel {
        top: -2px;
        left: 100%;
        margin-left: 34px;
        position: absolute;
        width: 420px;
        border-radius: 4px;
        background-color: #ffffff;
    }
    .tc-common-panel-header {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        padding: 0px 20px;
        border-bottom: 1px solid #dddddd;

        .icon {
            font-size: 27px;
            cursor: pointer;
            align-self: center;
        }
    }
    .tc-common-panel-content {
        padding: 16px 20px;
    }
    .tc-common-panel-footer {
        text-align: right;
        padding: 12px 20px;
        border-top: 1px solid #dddddd;

        button {
            margin-left: 8px;
        }
    }
</style>