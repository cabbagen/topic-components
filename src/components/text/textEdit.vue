<template>
    <div class="tc-text-edit tc-component-edit">
        <div class="tc-inner-component">
            <tc-text
                :textContent="iStruct.textContent"
                :textColor="iStruct.textColor"
                :textFontSize="iStruct.textFontSize"
                :textLineHeight="iStruct.textLineHeight"
                :textAlignModel="iStruct.textAlignModel"
                @handleClick="handleComponentClick"
            />
        </div>
        <Panel title="文本组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
            <template v-slot:content>
                <div class="tc-text-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                    <div class="label">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="label-value">
                        <template v-if="item.type === 'input'">
                            <i-input v-model="iStruct[item.field]" />
                        </template>
                        <template v-else-if="item.type === 'color'">
                            <color-picker v-model="iStruct[item.field]" recommend />
                        </template>
                        <template v-else>
                            <RadioGroup v-model="iStruct[item.field]">
                                <Radio :label="1">左对齐</Radio>
                                <Radio :label="2">居中对齐</Radio>
                                <Radio :label="3">右对齐</Radio>
                            </RadioGroup>
                        </template>
                    </div>
                </div>
            </template>
        </Panel>
    </div>
</template>

<script>
import editMinix from '../../minixs/edit.minixs';
import struct from './struct';
import Panel from '../common/panel.vue';

export default {
    name: 'tc-text-edit',
    mixins: [editMinix],
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
        };
    },
    components: {
        Panel,
    },
}
</script>

<style lang="less" scoped>
    @import "../../styles/base.style.less";
</style>