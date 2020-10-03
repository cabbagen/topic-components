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
        <Panel title="图片组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
            <template v-slot:content>
                <div class="tc-image-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                    <div class="label">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="label-value">
                        <template v-if="item.type === 'input'">
                            <i-input v-model="iStruct[item.field]" />
                        </template>
                        <template v-else-if="item.type === 'radio'">
                            <RadioGroup v-model="iStruct[item.field]">
                                <Radio :label="1">使用</Radio>
                                <Radio :label="0">不使用</Radio>
                            </RadioGroup>
                        </template>
                        <template v-else>
                            <custom-input v-model="iStruct[item.field]" prefix="upload" />
                        </template>
                    </div>
                </div>
            </template>
        </Panel>
    </div>
</template>

<script type="text/javascript">
import { Input, RadioGroup, Radio } from 'view-design';
import editMinix from '../../minixs/edit.minixs';
import struct from '../../../struct/image';
import CustomInput from '../common/custom-input.vue';
import Panel from '../common/panel.vue';

export default {
    name: 'tc-image-edit',
    mixins: [editMinix],
    components: {
        Panel,
        CustomInput,
        RadioGroup,
        Radio,
        'i-input': Input,
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
