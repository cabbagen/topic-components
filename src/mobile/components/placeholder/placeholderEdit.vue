<template>
    <div class="tc-placeholder-edit tc-component-edit">
        <div class="tc-inner-component">
            <tc-placeholder
                :height="iStruct.height"
                :placeholderBackgroundColor="iStruct.placeholderBackgroundColor"
                @handleClick="handleComponentClick"
            />
        </div>
        <Panel title="占位组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
            <template v-slot:content>
                <div class="tc-placeholder-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                    <div class="label">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="label-value">
                        <template v-if="item.type === 'input'">
                            <i-input v-model="iStruct[item.field]" />
                        </template>
                        <template v-else>
                            <color-picker v-model="iStruct[item.field]" recommend />
                        </template>
                    </div>
                </div>
            </template>
        </Panel>
    </div>
</template>

<script>
import { Input, ColorPicker } from 'view-design';
import editMinix from '../../minixs/edit.minixs';
import struct from '../../../struct/placeholder';
import Panel from '../common/panel.vue';

export default {
    name: 'tc-placeholder-edit',
    mixins: [editMinix],
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
        };
    },
    components: {
        Panel,
        ColorPicker,
        'i-input': Input,
    },
}
</script>

<style lang="less" scoped>
    @import "../../styles/base.style.less";
</style>