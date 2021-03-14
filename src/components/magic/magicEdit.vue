<template>
    <div class="tc-component-edit tc-magic-edit">
        <div class="tc-inner-component">
            <tc-magic @handleClick="handleMagicClick" v-bind="iStruct"></tc-magic>
        </div>
        <tc-dragable :initPosition="initDragabledPosition" key="magic-dragable">
            <tc-panel
                from="magic"
                title="魔方组件编辑"
                v-model="visiabled"
                class="tc-magic-panel-modal"
                @handlePanelOk="handleComponentOk"
                @handlePanelDelete="handleComponentDelete"
                @handleComponentDeleteMagicChild="handleComponentDeleteMagicChild"
            >
                <template v-slot:content>
                    <div class="tc-magic-panel-body" v-if="selectedMagicItem">
                        <div class="tc-magic-panel-body-row" v-for="(item, index) in editedFields" :key="index">
                            <div class="tc-magic-panel-body-row-field">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="tc-magic-panel-body-row-value">
                                <a-radio-group v-model="selectedMagicItem.direction" v-if="item.type === 'a-radio-group'">
                                    <a-radio value="row">横向排列</a-radio>
                                    <a-radio value="column">纵向排列</a-radio>
                                </a-radio-group>
                                <a-input-number
                                    v-else-if="item.type === 'a-input-number'"
                                    :disabled="!!selectedMagicItem.injected"
                                    :value="selectedMagicItem.children.length"
                                    @change="handleMagicChildrenChange"
                                />
                                <div v-else-if="item.type === 'a-select'">
                                    <a-select
                                        placeholder="选择组件"
                                        :style="{ width: '120px' }"
                                        :disabled="selectedMagicItem.children.length > 0 || injectEditing"
                                        :value="selectedMagicItem.injected ? selectedMagicItem.injected.type : undefined"
                                        @change="handleInjectComponentChange"
                                    >
                                        <a-select-option v-for="(item, index) in allowInjectable" :value="item.type" :key="index">
                                            {{item.title}}
                                        </a-select-option>
                                    </a-select>
                                    <span class="tc-inject-setting" v-if="!!selectedMagicItem.injected" @click="handleTriggerInjectSetting">组件配置</span>
                                </div>
                                <a-input v-else v-model="selectedMagicItem[item.field]" v-bind="item.props" />
                            </div>
                        </div>
                    </div>
                </template>
            </tc-panel>
        </tc-dragable>
        <component
            from="magic"
            v-if="injectEditing"
            :data="selectedMagicItem.injected.props"
            :componentId="selectedMagicItem.mid"
            :is="`${selectedMagicItem.injected.type}-edit`"
            @visibleMonitor="handleVisibleMonitor"
            @handleComponentOk="handleInjectComponentOk"
            @handleComponentDelete="handleInjectComponentDelete"
        />
    </div>
</template>

<script type="text/javascript">

import { Radio, InputNumber, Input, Select } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import TCMagic from './magic.vue';
import TCPanel from '../common/panel.vue';
import TCDragable from '../common/dragable.vue';
import struct from '../../struct/magic';

const defaultMagicItem = {
    type: 'magic',
    direction: 'row',
    injected: null,
    selected: false,
    children: [],
};

export default {
    name: 'tc-magic-edit',
    mixins: [editMinix],
    components: {
        'a-radio-group': Radio.Group,
        'a-radio-button': Radio.Button,
        'a-radio': Radio,
        'tc-magic': TCMagic,
        'tc-panel': TCPanel,
        'tc-dragable': TCDragable,
        'a-input-number': InputNumber,
        'a-input': Input,
        'a-select': Select,
        'a-select-option': Select.Option,
    },
    data: function() {
        return {
            mid: '',
            iStruct: Object.assign({}, struct),
            injectEditing: false,
            allowInjectable: [
                { type: 'tc-image', title: '图片组件' },
                { type: 'tc-text', title: '文本组件' },
                { type: 'tc-placeholder', title: '占位组件' },
                { type: 'tc-carousel', title: '轮播组件' },
                { type: '_', title: '不注入组件' },
            ],
            editedFields: [{
                type: 'a-radio-group',
                title: '排列方式',
                field: 'direction',
            }, {
                type: 'a-input-number',
                title: '子块数目',
                field: 'childenLength',
            }, {
                type: 'a-input',
                title: '子块宽度',
                field: 'width',
                props: {
                    placeholder: '请填写子块宽度；例如：100%',
                },
            }, {
                type: 'a-input',
                title: '子块高度',
                field: 'height',
                props: {
                    placeholder: '请填写子块高度；例如：60px',
                },
            }, {
                type: 'a-input',
                title: '子块外边距',
                field: 'margin',
                props: {
                    placeholder: '请填写子块外边距；例如：10px 10px 10px 10px',
                },
            }, {
                type: 'a-input',
                title: '内边距',
                field: 'padding',
                props: {
                    placeholder: '请填写子块内边距；例如：10px 10px 10px 10px',
                },
            }, {
                type: 'a-input',
                title: '背景设置',
                field: 'background',
                props: {
                    placeholder: '请填写子块背景设置；例如：yellow',
                },
            }, {
                type: 'a-select',
                title: '注入组件',
                field: 'injected',
            }],
        }
    },
    computed: {
        selectedMagicItem: function() {
            const result = { current: null };
            this.handleFincSelectMagicItem(this.iStruct, this.mid, result);

            return result.current;
        },
    },
    methods: {
        handleFincSelectMagicItem(tree, mid, result) {
            if (tree.mid === mid) {
                result.current = tree;
            }
            if (result.current) {
                return result;
            }
            if (tree.children && tree.children.length > 0) {
                tree.children.forEach(item => this.handleFincSelectMagicItem(item, mid, result));
            }
        },
        handleMagicClick: function(data) {
            this.mid = data.options.mid;
            this.handleComponentClick(data);

            this.handleUpdateMagicItem(data.options.mid, function(isCurrent, item) {
                return Object.assign({}, item, { selected: isCurrent });
            });
        },
        handleUpdateMagicItem(mid, updator) {
            if (this.iStruct.mid === mid) {
                this.iStruct = updator(true, Object.assign({}, this.iStruct));
                return;
            }
            const children = this.handleRecursionFindMagicChildren(this.iStruct.children, mid, updator);
            this.iStruct = Object.assign({}, this.iStruct, { children });
        },
        handleRecursionFindMagicChildren(children, mid, finder) {
            if (!children || children.length === 0) {
                return [];
            }
            return children.map(item => {
                item.children = this.handleRecursionFindMagicChildren(item.children, mid, finder);
                return finder(item.mid === mid, item);;
            });
        },
        handleMagicChildrenChange: function(value) {
            const result = [];

            for (let i = 0; i < value; i++) {
                result.push(Object.assign({}, defaultMagicItem, { mid: `${this.mid}-${i + 1}` }));
            }
            this.handleUpdateMagicItem(this.mid, (isCurrent, item) => {
                return Object.assign({}, item, { children: isCurrent ? result : item.children });
            });
        },
        handleInjectComponentChange: function(value) {
            this.handleUpdateMagicItem(this.mid, (isCurrent, item) => {
                const injected = value !== '_' ? { type: value, props: {} } : null;
                return isCurrent ? Object.assign({}, item, { injected }) : item;
            });
        },
        handleTriggerInjectSetting: function() {
            this.injectEditing = true;
        },
        handleVisibleMonitor: function(componentId, visible) {
            !visible && (this.injectEditing = false);
        },
        handleInjectComponentOk: function(_, data) {
            this.handleUpdateMagicItem(this.mid, (isCurrent, item) => {
                return isCurrent ? Object.assign({}, item, { injected: Object.assign({}, item.injected, { props: data }) }) : item;
            });
        },
        handleInjectComponentDelete: function() {
            this.injectEditing = false;
            this.handleUpdateMagicItem(this.mid, (isCurrent, item) => {
                return isCurrent ? Object.assign({}, item, { injected: null }) : item;
            });
        },
        handleComponentDeleteMagicChild: function() {
            const childMid = this.mid;

            this.mid = this.mid.replace(/-\d$/, '');

            if (this.mid === childMid) {
                this.handleComponentDelete(this.componentId);
                return;
            }
            this.handleUpdateMagicItem(this.mid, (isCurrent, item) => {
                if (!isCurrent) {
                    return Object.assign({}, item, { selected: false });
                }
                return Object.assign({}, item, {
                    selected: true,
                    children: item.children.filter(subItem => subItem.mid !== childMid),
                });
            });
        },
    }
}
</script>
<style lang="less" scoped>
    .tc-magic-panel-modal {
        width: 560px;
    }
    .tc-magic-panel-body-row {
        width: 100%;
        display: flex;
        line-height: 32px;
        margin-bottom: 8px;
    }
    .tc-magic-panel-body-row-field {
        width: 80px;
        text-align: right;
        margin-right: 18px;

        &::after {
            content: ":";
            position: relative;
            left: 3px;
            top: -2px;
            font-weight: bolder;
        }
    }
    .tc-magic-panel-body-row-value {
        flex: 1;
        width: 100%;
    }
    .tc-inject-setting {
        color: #1890ff;
        cursor: pointer;
        margin-left: 10px;
    }
</style>
