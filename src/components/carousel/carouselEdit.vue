<template>
    <div class="tc-component-edit tc-carousel-edit">
        <div class="tc-inner-component">
            <tc-carousel :images="iStruct.images" @handleClick="handleComponentClick" />
        </div>
         <Panel title="轮播图组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
            <template v-slot:content>
                <div class="tc-carousel-panel-header">
                    <RadioGroup v-model="currentTab" type="button">
                        <Radio :key="index" :label="item.value" v-for="(item, index) in tabInfos">{{item.title}}</Radio>
                    </RadioGroup>
                </div>
                <div class="tc-carousel-panel-body-for-base" v-if="currentTab === 'baseSetting'">
                    <div class="tc-image-edit-row tc-component-edit-row" v-for="(item, index) in basePaneleditedFields" :key="index">
                        <div class="label">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="label-value">
                            <template v-if="item.type === 'input'">
                                <i-input v-model="iStruct[item.field]" />
                            </template>
                            <template v-else>
                                <InputNumber :min="1000" v-model="iStruct[item.field]"></InputNumber>
                                <span class="tc-carousel-delay-description">{{item.description}}</span>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="tc-carousel-panel-body-for-picture" v-else-if="iStruct.images.length > 0">
                    <div class="tc-carousel-picture-item" v-for="(item, index) in iStruct.images" :key="index">
                        <div class="tc-carousel-picture-item-header">
                            <Icon
                                v-if="iStruct.images.length > 2"
                                type="ios-remove-circle-outline"
                                @click="handleRemoveCarouseImage(index)"
                            />
                            <Icon
                                v-if="iStruct.images.length < 7"
                                type="ios-add-circle-outline"
                                @click="handleAddCarouseImgage(index)"
                            />
                        </div>
                        <div class="tc-carousel-picture-item-body">
                            <div class="tc-image-edit-row tc-component-edit-row">
                                <div class="label">
                                    <span>图片链接</span>
                                </div>
                                <div class="label-value">
                                    <i-input v-model="item.imgLink" />
                                </div>
                            </div>
                            <div class="tc-image-edit-row tc-component-edit-row">
                                <div class="label">
                                    <span>图片地址</span>
                                </div>
                                <div class="label-value">
                                    <custom-input v-model="item.imgSource" prefix="upload" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tc-carousel-panel-body-for-empty" v-else @click="handleAddCarouseImgage(0)">
                    <Icon type="ios-add" />
                    <span class="tc-carousel-img-add">添加图片</span>
                </div>
            </template>
        </Panel>
    </div>
</template>

<script type="text/javascript">

import { RadioGroup, Radio } from 'view-design';
import editMinix from '../../minixs/edit.minixs';
import struct from '../../struct/carousel';
import CustomInput from '../common/custom-input.vue';
import Panel from '../common/panel.vue';

export default {
    name: 'ct-carousel-edit',
    mixins: [editMinix],
    components: {
        Panel,
        Radio,
        RadioGroup,
        CustomInput,
    },
    data: function() {
        return {
            iStruct: Object.assign({}, struct),
            currentTab: 'baseSetting',
            tabInfos: [
                { title: '基础配置', value: 'baseSetting' },
                { title: '图片配置', value: 'pictureSetting' },
            ],
            basePaneleditedFields: [
                { type: 'input', title: '组件宽度', field: 'width' },
                { type: 'input', title: '组件高度', field: 'height' },
                { type: 'input-number', title: '轮播延迟', field: 'delay', description: '调整数值，可改变轮播速度(ms)' },
            ],
        };
    },
    methods: {
        handleAddCarouseImgage: function(needAddedIndex) {
            const images = this.iStruct.images.map(item => Object.assign({}, item));

            images.splice(needAddedIndex, 0, { imgSource: '', imgLink: '' });
            this.iStruct.images = images;
        },

        handleRemoveCarouseImage: function(needRemovedIndex) {
            const images = this.iStruct.images.map(item => Object.assign({}, item));

            images.splice(needRemovedIndex, 1);
            this.iStruct.images = images;
        }
    },
}

</script>

<style lang="less" scoped>
    @import "../../styles/base.style.less";

    .tc-carousel-panel-header {
        display: flex;
        justify-content: center;
    }
    .tc-carousel-delay-description {
        color: #ff6161;
        padding-left: 8px;
        position: relative;
        top: 2px;
    }
    .tc-carousel-panel-body-for-picture {
        width: 100%;
        max-height: 270px;
        overflow-y: scroll;
    }
    .tc-carousel-picture-item-header {
        line-height: 30px;
        text-align: right;
        border-bottom: 1px dashed #dddddd;
    }
    .tc-carousel-picture-item-header i {
        font-size: 20px;
        margin-left: 4px;

        &:hover {
            color: #2d8cf0;
            cursor: pointer;
        }
    }
    .tc-carousel-picture-item {
        margin-bottom: 20px;
    }
    .tc-carousel-panel-body-for-empty {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        margin-top: 20px;
        border: 1px dashed #dddddd;
        cursor: pointer;

        i {
            font-size: 28px;
            position: relative;
            top: 3px;
            left: 4px;
        }

        &:hover {
            color: #2d8cf0;
        }
    }
</style>

