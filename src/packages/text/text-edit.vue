<template>
    <div class="tc-component-edit tc-text-edit">
        <div class="tc-inner-component" v-if="from === 'normal'">
            <tc-text v-bind="iStruct" @handleClick="handleComponentClick" />
        </div>
        <tc-dragable :initPosition="initDragabledPosition" key="text-dragable">
            <tc-panel title="文本组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
                <template v-slot:content>
                    <div class="tc-text-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                        <div class="label">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="label-value">
                            <template v-if="item.type === 'input'">
                                <a-input v-model="iStruct[item.field]" />
                            </template>
                            <template v-else-if="item.type === 'color'">
                                <div class="tc-color-section" :style="{ backgroundColor: iStruct[item.field] }" @click="handleTriggerColorPicker" />
                                <chrome-picker
                                    v-show="visible"
                                    class="tc-text-color-picker"
                                    @input="handleUpdateColor"
                                    :value="iStruct[item.field]"
                                    :id="`color-picker-${pickerKey}`"
                                />
                            </template>
                            <template v-else>
                                <a-radio-group v-model="iStruct[item.field]">
                                    <a-radio :value="1">左对齐</a-radio>
                                    <a-radio :value="2">居中对齐</a-radio>
                                    <a-radio :value="3">右对齐</a-radio>
                                </a-radio-group>
                            </template>
                        </div>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
    </div>
</template>

<script type="text/javascript">
import { Chrome } from 'vue-color';
import { Radio, Input } from 'ant-design-vue';
import struct from '../../struct/text';
import editMinix from '../../minixs/edit.minixs';
import Panel from '../../common/panel.vue';
import Text from './text.vue';
import TCDragable from '../../common/dragable.vue';

export default {
    name: 'tc-text-edit',
    mixins: [editMinix],
    components: {
        'a-radio': Radio,
        'a-input': Input,
        'a-radio-group': Radio.Group,
        'tc-panel': Panel,
        'tc-dragable': TCDragable,
        'tc-text': Text,
        'chrome-picker': Chrome,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [{
                type: 'input',
                title: '文本内容',
                field: 'textContent',
            }, {
                type: 'color',
                title: '文本颜色',
                field: 'textColor',
            }, {
                type: 'input',
                title: '文本大小',
                field: 'textFontSize',
            }, {
                type: 'input',
                title: '文本行高',
                field: 'textLineHeight',
            }, {
                type: 'radio',
                title: '文本对齐',
                field: 'textAlignModel',
            }],
            visible: false,
            pickerKey: +new Date(),
        };
    },
    mounted: function() {
        document.addEventListener('click', (event) => {
            if (event.target && event.target.querySelector(`#color-picker-${this.pickerKey}`)) {
                this.visible = false;
            }
        }, false);
    },
    methods: {
        handleTriggerColorPicker: function(event) {
            event.stopPropagation();
            this.visible = true;
        },
        handleUpdateColor: function(color) {
            this.iStruct.textColor = typeof color === 'string' ? color : color.hex;
        }
    },
}
</script>

<style lang="less">
    @import "../../styles/base.style.less";

    .tc-color-section {
        top: 3px;
        width: 80px;
        height: 28px;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
    }
    .tc-text-color-picker {
        top: 120;
        z-index: 4;
        left: 180px;
        position: absolute;
    }
</style>
