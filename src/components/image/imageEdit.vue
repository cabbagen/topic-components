<template>
    <div class="tc-component-edit tc-image-edit">
        <div class="tc-inner-component">
            <tc-image
                :width="iStruct.width"
                :height="iStruct.height"
                :imgSource="iStruct.imgSource"
                :imgLink="iStruct.imgLink"
                :isUsedAnchor="iStruct.isUsedAnchor"
                @handleClick="handleComponentClick"
            />
        </div>
        <ct-panel title="图片组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
            <template v-slot:content>
                <div class="tc-image-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                    <div class="label">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="label-value">
                        <template v-if="item.type === 'input'">
                            <a-input v-model="iStruct[item.field]" />
                        </template>
                        <template v-else-if="item.type === 'radio'">
                            <a-radio-group v-model="iStruct[item.field]">
                                <a-radio :value="1">使用</a-radio>
                                <a-radio :value="0">不使用</a-radio>
                            </a-radio-group>
                        </template>
                        <template v-else>
                            <ct-custom-input v-model="iStruct[item.field]" prefix="upload" />
                        </template>
                    </div>
                </div>
            </template>
        </ct-panel>
    </div>
</template>

<script type="text/javascript">
import { Input, Radio } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import CustomInput from '../common/custom-input.vue';
import Panel from '../common/panel.vue';
import struct from '../../struct/image';

export default {
    name: 'tc-image-edit',
    mixins: [editMinix],
    components: {
		'a-radio': Radio,
		'a-input': Input,
		'a-radio-group': Radio.Group,
		'ct-panel': Panel,
		'ct-custom-input': CustomInput,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [
                { type: 'input', title: '组件宽度', field: 'width' },
                { type: 'input', title: '组件高度', field: 'height' },
                { type: 'custom-input', title: '组件图片', field: 'imgSource' },
                { type: 'input', title: '组件链接', field: 'imgLink' },
                { type: 'radio', title: '使用锚点', field: 'isUsedAnchor' },
            ],
        };
    }
}
</script>

<style lang="less" scoped>
    @import "../../styles/base.style.less";
</style>
