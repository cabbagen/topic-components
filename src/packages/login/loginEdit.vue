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
                            <template v-if="item.type === 'tc-custom-input'">
                                <tc-custom-input prefix="upload" v-model="iStruct[item.field]" />
                            </template>
                            <template v-if="item.type === 'color'">
                                <div class="tc-color-section" :style="{ backgroundColor: iStruct[item.field] }" @click="handleTriggerColorPicker" />
                                <chrome-picker
                                    v-show="visible"
                                    class="tc-theme-color-picker"
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

<script type="text/javascript">
import { Chrome } from 'vue-color';
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
        'chrome-picker': Chrome,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [
                { type: 'tc-custom-input', title: '网站图标', field: 'logo' },
                { type: 'color', title: '主题颜色', field: 'theme' }
            ],
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
            this.iStruct.theme = typeof color === 'string' ? color : color.hex;
        }
    }
};

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
    .tc-theme-color-picker {
        top: 120;
        z-index: 4;
        left: 180px;
        position: absolute;
    }
</style>
