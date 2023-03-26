<template>
    <div class="tc-common-icon-selector">
        <a-select :value="value" style="width: 100%" @change="handleSelectChange" placeholder="请选择小图标">
            <a-select-option v-for="item in iconfontResources" :key="item.icon">
                <span>
                    <svg-icon :icon="item.icon" class="tc-selector-iconfont" />
                    <span>{{item.icon}}</span>
                </span>
            </a-select-option>
        </a-select>
    </div>
</template>

<script type="text/javascript">
import { Select } from 'ant-design-vue';
import { handleRegistTopicGlobalProperty, getRegistedTopicGlobalProperty, iconfont } from '../utils/hooks';

import SvgIcon from './svg-icon.vue';

export default {
    name: 'common-icon-selector',
    data: function() {
        return {
            iconfontResources: [],
        };
    },
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    components: {
        'a-select': Select,
        'a-select-option': Select.Option,
        'svg-icon': SvgIcon,
    },
    mounted: function() {
        if (getRegistedTopicGlobalProperty(iconfont)) {
            this.iconfontResources = getRegistedTopicGlobalProperty(iconfont)();
            return;
        }
        this.fetchTopicIconFontPrevResources();
    },
    methods: {
        fetchTopicIconFontPrevResources: function() {
            window.fetch('http://localhost:7001/static/icons/icons.setting.json')
                .then(response => response.json())
                .then(result => {
                    this.iconfontResources = result.glyphs;
                    handleRegistTopicGlobalProperty(iconfont, () => result.glyphs);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleSelectChange: function(value) {
            this.$emit('input', value);
        },
    }
}
</script>

<style lang="less">
    .tc-selector-iconfont {
        margin-right: 10px;
    }
</style>
