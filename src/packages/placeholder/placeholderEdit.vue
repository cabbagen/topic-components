<template>
    <div class="tc-component-edit tc-placeholder-edit">
        <div class="tc-inner-component" v-if="from === 'normal'">
            <tc-placeholder v-bind="iStruct" @handleClick="handleComponentClick" />
        </div>
        <tc-dragable :initPosition="initDragabledPosition">
            <tc-panel title="占位组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
                <template v-slot:content>
                    <div class="tc-placeholder-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                        <div class="label">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="label-value">
                            <template v-if="item.type === 'input'">
                                <a-input v-model="iStruct[item.field]" />
                            </template>
                            <template v-else>
                                <div class="color-section" :style="{ backgroundColor: iStruct[item.field] }" @click="handleTriggerColorPicker" />
                                <chrome-picker
                                    v-show="visible"
                                    class="placeholder-color-picker"
                                    @input="handleUpdateColor"
                                    :value="iStruct[item.field]"
                                    :id="`color-picker-${pickerKey}`"
                                />
                            </template>
                        </div>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
    </div>
</template>

<script>
import { Chrome } from 'vue-color';
import { Input } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import struct from '../../struct/placeholder';
import Panel from '../../common/panel.vue';
import Placeholder from './placeholder.vue';
import TCDragable from '../../common/dragable.vue';

export default {
    name: 'tc-placeholder-edit',
    mixins: [editMinix],
    components: {
        'a-input': Input,
        'tc-panel': Panel,
        'tc-dragable': TCDragable,
        'tc-placeholder': Placeholder,
        'chrome-picker': Chrome,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [{
                type: 'input',
                title: '组件高度',
                field: 'height',
            }, {
                type: 'color',
                title: '背景颜色',
                field: 'placeholderBackgroundColor',
            }],
            visible: false,
            pickerKey: +new Date(),
        };
    },
    mounted: function() {
        document.addEventListener('click', (event) => {
            const element = document.getElementById(`color-picker-${this.pickerKey}`);

            if (element && event.path.find(item => item === element)) {
                return;
            }
            this.visible = false;
        }, false);
    },
    methods: {
        handleTriggerColorPicker: function(event) {
            event.stopPropagation();
            this.visible = true;
        },
        handleUpdateColor: function(color) {
            this.iStruct.placeholderBackgroundColor = typeof color === 'string' ? color : color.hex;
        }
    },
}
</script>

<style lang="less" scoped>
    @import "../../styles/base.style.less";

    .color-section {
        top: 3px;
        width: 80px;
        height: 28px;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
    }
    .placeholder-color-picker {
        top: 120;
        z-index: 4;
        left: 180px;
        position: absolute;
    }
</style>
