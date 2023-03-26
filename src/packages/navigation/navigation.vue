<template>
    <div :class="['tc-navigation', hasBack === 1 ? 'has-back' : '']" @click="handleNavigationClick">
        <div class="tc-navigation-back" v-if="hasBack === 1" @click="handleGoBack">
            <svg-icon icon="houtui" />
        </div>
        <div class="tc-navigation-title">
            {{title}}
        </div>
        <div class="tc-navigation-menus" v-if="menus.length > 0" @click="handleTriggerMenus">
            <svg-icon icon="caidan" :style="{ position: 'relative', top: '1px' }" />
        </div>
        <common-mask v-model="visible">
            <div class="tc-navigation-menu-content">
                <div class="tc-navigation-menu-group" v-for="(group, gIndex) in groups" :key="gIndex">
                    <div class="tc-navigation-menu-item" v-for="(item, iIndex) in group"  :key="iIndex" @click="handleMenuItemLink(item)">
                        <div class="tc-navigation-menu-item-icon">
                            <svg-icon :icon="item.icon" />
                        </div>
                        <div class="tc-navigation-menu-item-title">
                            <span>{{item.title}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </common-mask>
    </div>
</template>

<script type="text/javascript">
import SvgIcon from '../../common/svg-icon.vue';
import CommonMask from '../../common/mask.vue';

export default {
    name: 'tc-navigation',
    data: function() {
        return {
            visible: false,
        };
    },
    components: {
        'svg-icon': SvgIcon,
        'common-mask': CommonMask,
    },
    computed: {
        groups: function() {
            const groups = [];

            for (let i = 0, len = this.menus.length; i < len; i++) {
                if (groups.length === 0 || groups[groups.length - 1].length === 3) {
                    groups.push([this.menus[i]]);
                    continue;
                }
                groups[groups.length - 1].push(this.menus[i]);
            }
            return groups;
        },
    },
    props: {
        title: {
            type: String,
            default: '导航组件',
        },
        hasBack: {
            type: Number,
            default: 0,
        },
        menus: {
            validator: function(values) {
                if (!(values instanceof Array)) {
                    return false;
                }
                if (values.length === 0) {
                    return true;
                }
                return values.every((item) => {
                    return typeof item.title !== 'undefined' && typeof item.link !== 'undefined' && typeof item.icon !== 'undefined';
                });
            },
            default: function() {
                return [];
            }
        }
    },
    methods: {
        handleNavigationClick: function(event) {
            this.$emit('handleClick', { event, options: {} });
        },
        handleGoBack: function(event) {
            event.stopPropagation();
            window.history.back();
        },
        handleTriggerMenus: function(event) {
            event.stopPropagation();
            this.visible = true;
        },
        handleMenuItemLink: function(item) {
            if (!item || typeof item !== 'string') {
                return;
            }
            window.location.href = item.link;
        },
    }
}
</script>

<style lang="less">
    .tc-navigation {
        width: 100%;
        height: .46rem;
        position: relative;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 0.08rem;
        box-sizing: border-box;

        &.has-back {
            justify-content: space-between;
        }
    }
    .tc-navigation-title {
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
    .tc-navigation-back .iconfont {
        font-size: 24px;
    }
    .tc-navigation-menus .iconfont {
        font-size: 21px;
        margin-right: 0.06rem;
    }
    .tc-navigation-menu-content {
        width: 90%;
        margin: 1rem auto 0;
        border-radius: 0.02rem;
        background-color: #ffffff;
    }
    .tc-navigation-menu-group {
        display: flex;
        justify-content: space-between;
    }
    .tc-navigation-menu-item {
        width: 33.33%;
        height: 0.8rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .tc-navigation-menu-item .iconfont {
        font-size: 30px;
    }
</style>
