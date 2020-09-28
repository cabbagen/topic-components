<template>
    <div class="tc-carousel-edit">
        <div class="tc-inner-component">
            <tc-carousel :imgInfos="iStruct.images" />
        </div>
         <Panel title="轮播图组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
            <template v-slot:content>
                <div>hello world</div>
            </template>
        </Panel>
    </div>
</template>

<script type="text/javascript">

import editMinix from '../../minixs/edit.minixs';
import struct from '../../../struct/carousel';
import CustomInput from '../common/custom-input.vue';
import Panel from '../common/panel.vue';

export default {
    name: 'ct-carousel-edit',
    mixins: [editMinix],
    components: {
        CustomInput,
        Panel
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
        };
    },
}

</script>

<style lang="less" scoped>
    
</style>