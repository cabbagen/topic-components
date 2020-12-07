<template>
    <div class="tc-common-panel" :style="{ display: value ? 'block' : 'none' }">
        <div class="tc-common-panel-header">
            <span>{{title}}</span>
			<a-icon class="icon" type="close-circle" @click="handlePanelCancel" />
        </div>
        <div class="tc-common-panel-content">
            <slot name="content"></slot>
        </div>
        <div class="tc-common-panel-footer">
            <slot name="footer">
                <a-button @click="handlePanelCancel">取消</a-button>
                <a-button type="primary" @click="handlePanelDelete">删除</a-button>
                <a-button type="primary" @click="handlePanelOk">确定</a-button>
            </slot>
        </div>
    </div>
</template>

<script type="text/javascript">

import { Icon, Button } from 'ant-design-vue';

export default {
    name: 'tc-common-panel',
    data: function() {
        return {
        };
    },
    components: {
		'a-icon': Icon,
		'a-button': Button,
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
        position: absolute;
        width: 420px;
        border-radius: 4px;
        background-color: #ffffff;
		border: 1px solid #dddddd;
    }
    .tc-common-panel-header {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        padding: 0px 20px;
        border-bottom: 1px solid #dddddd;

        .icon {
            font-size: 18px;
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