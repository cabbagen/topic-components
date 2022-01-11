<template>
    <div class="classification-container" @click="handleClick">
        <div class="classification-header" id="classification-header">
            <h2 class="classification-header-title">{{ title }}</h2>
        </div>
        <div class="classification-content">
            <div class="classification-menus" @scroll="handleMenuScroll">
                <div
                    :key="category.id"
                    :id="`menu-${category.id}`"
                    :class="['classification-menu-item', category.selected ? 'selected' : '']"
                    v-for="category in categories"
                    @click.stop="handleSelectCategory(category)"
                >
                    <span>{{ category.name }}</span>
                </div>
                <div :key="-1" class="classification-menu-item selected fixed" :style="{ display: visiable ? 'block' : 'none' }">
                    <span>{{ category.name }}</span>
                </div>
            </div>
            <div class="classification-panel">
                <div class="classification-panel-group" v-for="item in category.children"  :key="item.id">
                    <div class="classification-group-title">{{ item.name }}</div>
                    <div class="classification-group-content">
                        <div class="classification-group-item" v-for="subItem in item.children"  :key="subItem.id">
                            <div class="classification-group-item-pic">
                                <img :src="subItem.picture" :alt="subItem.name" />
                            </div>
                            <div class="classification-group-item-name">{{ subItem.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import { getRegistedTopicGlobalProperty, request } from '../../utils/hooks';

export default {
    name: 'tc-classification',
    data: function() {
        return {
            visiable: false,
            categories: [],
        };
    },
    props: {
        title: {
            type: String,
            default: '全部分类',
        },
        model: {
            type: String,
            default: 'tcm-product',
        },
    },
    computed: {
        category: function() {
            return this.categories.find(item => item.selected) || { children: [] };
        },
        headerHeight: function() {
            const headerElement = document.getElementById('classification-header');
            return headerElement.getBoundingClientRect().height;
        },
    },
    mounted: function() {
        this.handleFetchAllClassifications();
    },
    methods: {
        handleFetchAllClassifications: function() {
            getRegistedTopicGlobalProperty(request)('http://localhost:8787/category/level?deep=1', 'get').then((result) => {
                this.categories = result.data.map((item, index) => {
                    return Object.assign({}, item, { selected: index === 0 });
                });
            });
        },
        handleSelectCategory: function(category) {
            this.visiable = false;
            this.categories = this.categories.map((item) => Object.assign({}, item, { selected: category.id === item.id }));
        },
        handleMenuScroll: function() {
            const element = document.getElementById(`menu-${this.category.id}`);

            if (!element) {
                return;
            }
            this.visiable = element.getBoundingClientRect().top <= this.headerHeight;
        },
        handleClick: function(event) {
            this.$emit('handleClick', { event, options: {} });
        },
    }
}
</script>

<style lang="less">
.classification-container {
    position: relative;
}
.classification-header {
    top: 0;
    width: 100%;
    color: #333333;
    height: 0.44rem;
    position: absolute;
    background: #EEEEEE;
    line-height: 0.44rem;
    border-bottom: 1px solid #E1E1E1;
}
.classification-header-title {
    width: 0.86rem;
    font-size: 14px;
    text-align: center;
    font-weight: normal;
}
.classification-content {
    width: 100%;
    height: 100vh;
    display: flex;
    padding-top: 0.44rem;
    box-sizing: border-box;
    background-color: #FFFFFF;
}
.classification-menus {
    height: 100%;
    width: 0.86rem;
    position: relative;
    overflow-y: scroll;
}
.classification-menu-item {
    color: #A1A1A1;
    height: 0.5rem;
    width: 0.86rem;
    text-align: center;
    line-height: 0.5rem;
    background-color: #EEEEEE;
    border-bottom: 1px solid #E1E1E1;

    &:last-child {
        border-bottom: none;
    }
    &.selected {
        background-color: #FFFFFF;
    }
    &.fixed {
        top: 0.44rem;
        position: fixed;
    }
}
.classification-panel {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0 3%;
    overflow-y: scroll;
    box-sizing: border-box;
}
.classification-group-title {
    color: #9B9B9B;
    font-size: 14px;
    padding: 0.15rem 0;
}
.classification-group-content {
    display: flex;
    flex-wrap: wrap;
}
.classification-group-item {
    width: 33.33%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0.1rem;
}
.classification-group-item-pic {
    width: 0.6rem;
    height: 0.6rem;

    img {
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: 50%;
    }
}
.classification-group-item-name {
    font-size: 12px;
}
</style>
