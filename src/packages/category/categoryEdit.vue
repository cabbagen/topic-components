<template>
    <div class="tc-component-edit tc-category-edit">
        <div class="tc-inner-component" v-if="from === 'normal'">
            <tc-category v-bind="iStruct" @handleClick="handleComponentClick" />
        </div>
        <tc-dragable :initPosition="initDragabledPosition">
            <tc-panel title="分类组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
                <template v-slot:content>
                    <div class="tc-category-edit-wrap" v-if="iStruct.categories.length > 0">
                        <div class="tc-category-edit-item" v-for="(item, index) in iStruct.categories" :key="index">
                            <div class="tc-category-item-header">
                                <a-icon type="minus-circle" @click="handleRemoveCategory(index)" />
                                <a-icon type="plus-circle" @click="handleAddCategory(index)" />
                            </div>
                            <div class="tc-category-item-body">
                                <div class="tc-image-edit-row tc-component-edit-row">
                                    <div class="label">
                                        <span>分类名称</span>
                                    </div>
                                    <div class="label-value">
                                        <a-input v-model="item.title" />
                                    </div>
                                </div>
                                <div class="tc-image-edit-row tc-component-edit-row">
                                    <div class="label">
                                        <span>图片地址</span>
                                    </div>
                                    <div class="label-value">
                                        <tc-custom-input v-model="item.icon" prefix="upload" />
                                    </div>
                                </div>
                                <div class="tc-image-edit-row tc-component-edit-row">
                                    <div class="label">
                                        <span>图片链接</span>
                                    </div>
                                    <div class="label-value">
                                        <a-input v-model="item.link" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tc-category-for-empty" v-else @click="handleAddCategory(0)">
                        <a-icon type="plus" />
                        <span class="tc-category-item-add">添加分类项</span>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
    </div>
</template>

<script type="text/javascript">

import { Icon, Radio, InputNumber, Input } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import struct from '../../struct/category';
import CustomInput from '../../common/custom-input.vue';
import Panel from '../../common/panel.vue';
import Category from './category.vue';
import TCDragable from '../../common/dragable.vue';

export default {
    name: 'tc-category-edit',
    mixins: [editMinix],
    components: {
        'a-icon': Icon,
        'a-input': Input,
        'a-radio-group': Radio.Group,
        'a-radio-button': Radio.Button,
        'a-input-number': InputNumber,
        'tc-custom-input': CustomInput,
        'tc-panel': Panel,
        'tc-category': Category,
        'tc-dragable': TCDragable,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
        };
    },
    methods: {
        handleRemoveCategory: function(needRemovedIndex) {
            const categories = this.iStruct.categories.map(item => Object.assign({}, item));

            categories.splice(needRemovedIndex, 1);
            this.iStruct.categories = categories;
        },
        handleAddCategory: function(needAddedIndex) {
            const categories = this.iStruct.categories.map(item => Object.assign({}, item));

            categories.splice(needAddedIndex, 0, { title: '', link: '', icon: '' });
            this.iStruct.categories = categories;
        }
    }
}
</script>

<style lang="less">
    @import "../../styles/base.style.less";

    .tc-category-edit .tc-common-panel-content {
        width: 100%;
        max-height: 270px;
        overflow-y: scroll;
    }
    .tc-category-item-header {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px dashed #dddddd;
    }
    .tc-category-item-header i {
        font-size: 16px;
        margin-left: 8px;

        &:hover {
            color: #2d8cf0;
            cursor: pointer;
        }
    }
    .tc-category-for-empty {
        width: 100%;
        height: 60px;
        margin-top: 20px;
        line-height: 60px;
        text-align: center;
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
