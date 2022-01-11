<template>
    <div class="tc-component-edit tc-classification-edit">
        <div class="tc-inner-component" v-if="from === 'normal'">
            <tc-classification v-bind="iStruct" @handleClick="handleComponentClick" />
        </div>
        <tc-dragable :initPosition="initDragabledPosition" key="classification-dragable">
            <tc-panel title="分类组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
                <template v-slot:content>
                    <div class="tc-classification-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                        <div class="label">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="label-value">
                            <a-input v-model="iStruct[item.field]" />
                        </div>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
    </div>
</template>

<script type="text/javascript">
import { Input } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import TCPanel from '../../common/panel.vue';
import TCDragable from '../../common/dragable.vue';
import TCClassification from './classification.vue';
import struct from '../../struct/classification';

export default {
    name: 'tc-classification-edit',
    mixins: [editMinix],
    components: {
        'a-input': Input,
        'tc-panel': TCPanel,
        'tc-dragable': TCDragable,
        'tc-classification': TCClassification,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [
                { type: 'input', title: '分类标题', field: 'title' }
            ],
        };
    },
}
</script>

<style lang="less">
@import "../../styles/base.style.less";
</style>
