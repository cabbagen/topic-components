<template>
    <div class="tc-common-icon-selector">
        <a-select :value="value" style="width: 312px" @change="handleSelectChange" placeholder="请选择小图标">
            <a-select-option v-for="item in iconfontResources" :key="`icon${item.font_class}`">
                <span>
                    <i :class="['tc-selector-iconfont', 'iconfont', `icon${item.font_class}`]"></i>
                    <span>{{item.name}}</span>
                </span>
            </a-select-option>
        </a-select>
    </div>
</template>

<script type="text/javascript">
import { Select } from 'ant-design-vue';
import { handleRegistTopicGlobalProperty, getRegistedTopicGlobalProperty, iconfont } from '../utils/hooks';

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
            window.fetch('//at.alicdn.com/t/font_1410717_ieijunpuxsq.json?spm=a313x.7781069.1998910419.36&file=font_1410717_ieijunpuxsq.json')
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
