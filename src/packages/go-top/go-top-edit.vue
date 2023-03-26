<template>
    <div class="tc-component-edit go-top-edit-container">
        <div class="tc-inner-component" v-if="from === 'normal'">
            <tc-go-top v-bind="iStruct" @handleClick="handleComponentClick" />
        </div>
        <tc-dragable :initPosition="initDragabledPosition" key="image-dragable">
            <tc-panel title="返回顶部组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
                <template v-slot:content>
                    <div class="tc-image-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                        <div class="label">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="label-value">
                            <input-number v-model="iStruct[item.field]" />
                        </div>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
    </div>
</template>

<script type="text/javascript">
import { InputNumber } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import TCPanel from '../../common/panel.vue';
import TCDragable from '../../common/dragable.vue';
import TCGoTop from './go-top.vue';
import struct from '../../struct/go-top';

export default {
    name: 'go-top-edit',
    mixins: [editMinix],
    components: {
        'tc-go-top': TCGoTop,
        'tc-panel': TCPanel,
        'tc-dragable': TCDragable,
        'input-number': InputNumber,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [
                { title: '滚动阀值', field: 'scrollThreshold' },
            ],
        };
    }
};
</script>

<style lang="less">
    @import "../../styles/base.style.less";
</style>
