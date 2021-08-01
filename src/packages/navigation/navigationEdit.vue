<template>
    <div class="tc-component-edit tc-image-edit">
        <div class="tc-inner-component" v-if="from === 'normal'">
            <tc-navigation v-bind="iStruct" @handleClick="handleComponentClick" />
        </div>
        <tc-dragable :initPosition="initDragabledPosition" key="image-dragable">
            <tc-panel title="导航组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
                <template v-slot:content>
                    <div class="tc-navigation-panel-header">
                        <a-radio-group v-model="currentTab" button-style="solid">
                            <a-radio-button :key="index" :value="item.value" v-for="(item, index) in tabInfos">{{item.title}}</a-radio-button>
                        </a-radio-group>
                    </div>
                    <div class="tc-navigation-panel-body-for-base" v-if="currentTab === 'baseSetting'">
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
                            </div>
                        </div>
                    </div>
                    <div class="tc-navigation-panel-body-for-emenus" v-else-if="iStruct.menus.length > 0">
                        <div class="tc-navigation-emenu-item" v-for="(item, index) in iStruct.menus" :key="index">
                            <div class="tc-navigation-emenu-item-header">
                                <a-icon type="minus-circle" v-if="iStruct.menus.length > 2" @click="handleRemoveNavigationMenu(index)" />
                                <a-icon type="plus-circle" v-if="iStruct.menus.length < 7" @click="handleAddNavigationMenu(index)" />
                            </div>
                            <div class="tc-navigation-emenu-item-body">
                                <div class="tc-image-edit-row tc-component-edit-row">
                                    <div class="label">
                                        <span>菜单名称</span>
                                    </div>
                                    <div class="label-value">
                                        <a-input v-model="item.title" placeholder="请输入菜单导航名称" />
                                    </div>
                                </div>
                                <div class="tc-image-edit-row tc-component-edit-row">
                                    <div class="label">
                                        <span>菜单链接</span>
                                    </div>
                                    <div class="label-value">
                                        <a-input v-model="item.link" placeholder="请输入菜单导航链接" />
                                    </div>
                                </div>
                                <div class="tc-image-edit-row tc-component-edit-row">
                                    <div class="label">
                                        <span>菜单图标</span>
                                    </div>
                                    <div class="label-value">
                                        <tc-icon-selector v-model="item.icon"></tc-icon-selector>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tc-navigation-panel-body-for-empty" v-else @click="handleAddNavigationMenu(0)">
                        <a-icon type="plus" />
                        <span class="tc-navigation-menu-add">添加导航</span>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
    </div>
</template>

<script type="text/javascript">

import { Input, Radio, Icon } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import TCPanel from '../../common/panel.vue';
import TCDragable from '../../common/dragable.vue';
import TCIconSelector from '../../common/icon-selector.vue';
import TCNavigation from './navigation.vue';
import struct from '../../struct/navigation';

import { getRegistedTopicGlobalProperty } from '../../utils/hooks';

export default {
    name: 'tc-navigation-edit',
    mixins: [editMinix],
    components: {
        'a-icon': Icon,
        'a-radio': Radio,
        'a-input': Input,
        'a-radio-group': Radio.Group,
        'a-radio-button': Radio.Button,
        'tc-navigation': TCNavigation,
        'tc-panel': TCPanel,
        'tc-dragable': TCDragable,
        'tc-icon-selector': TCIconSelector,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            editedFields: [
                { type: 'input', title: '组件标题', field: 'title' },
                { type: 'radio', title: '使用返回', field: 'hasBack' },
            ],
            currentTab: 'baseSetting',
            tabInfos: [
                { title: '基础配置', value: 'baseSetting' },
                { title: '菜单配置', value: 'menusSetting' },
            ],
        };
    },
    methods: {
        handleRemoveNavigationMenu: function(needRemovedIndex) {
            const menus = this.iStruct.menus.map(item => Object.assign({}, item));

            menus.splice(needRemovedIndex, 1);
            this.iStruct.menus = menus;
        },
        handleAddNavigationMenu: function(needAddedIndex) {
            const menus = this.iStruct.menus.map(item => Object.assign({}, item));

            menus.splice(needAddedIndex, 0, { title: '', link: '', icon: '' });
            this.iStruct.menus = menus;
        },
    }
}
</script>

<style lang="less">
    @import "../../styles/base.style.less";

    .tc-navigation-panel-header {
        display: flex;
        margin-bottom: 10px;
        justify-content: center;
    }
    .tc-navigation-panel-body-for-emenus {
        width: 100%;
        max-height: 270px;
        overflow-y: scroll;
    }
    .tc-navigation-emenu-item-header {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px dashed #dddddd;
    }
    .tc-navigation-emenu-item-header i {
        font-size: 16px;
        margin-left: 8px;

        &:hover {
            color: #2d8cf0;
            cursor: pointer;
        }
    }
    .tc-navigation-emenu-item {
        margin-bottom: 20px;
    }
    .tc-navigation-panel-body-for-empty {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        margin-top: 20px;
        border: 1px dashed #dddddd;
        cursor: pointer;

        i {
            font-size: 18px;
            position: relative;
            top: 3px;
            left: 4px;
        }

        &:hover {
            color: #2d8cf0;
        }
    }
</style>
