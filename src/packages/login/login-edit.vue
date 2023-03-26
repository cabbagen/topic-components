<template>
    <div class="tc-component-edit tc-login-edit">
        <div class="tc-inner-component" v-if="from === 'normal'">
            <tc-login v-bind="iStruct" @handleClick="handleComponentClick" />
        </div>
        <tc-dragable :initPosition="initDragabledPosition" key="image-dragable">
            <tc-panel title="登录组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
                <template v-slot:content>
                    <div class="tc-login-edit-row tc-component-edit-row" v-for="(item, index) in editedFields" :key="index">
                        <div class="label">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="label-value">
                            <tc-custom-input prefix="upload" v-model="iStruct[item.field]" />
                        </div>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
    </div>
</template>

<script type="text/javascript">
import editMinix from '../../minixs/edit.minixs';
import TCPanel from '../../common/panel.vue';
import TCDragable from '../../common/dragable.vue';
import TCCustomInput from '../../common/custom-input.vue';
import TCLogin from './login.vue';
import struct from '../../struct/login';

export default {
    name: 'tc-login-edit',
    mixins: [editMinix],
    components: {
        'tc-login': TCLogin,
        'tc-panel': TCPanel,
        'tc-dragable': TCDragable,
        'tc-custom-input': TCCustomInput,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [
                { type: 'tc-custom-input', title: '网站图标', field: 'logo' },
            ],
        };
    }
};

</script>

<style lang="less">
    @import "../../styles/base.style.less";
</style>
