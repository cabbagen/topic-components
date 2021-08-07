<template>
    <div class="tc-category-container" @click="handleCategoryClick">
        <div class="tc-category-item" v-for="(item, index) in categories" :key="index" @click="handleCategoryJump(item, $event)">
            <div class="tc-category-item-img">
                <img :src="item.icon" alt="" />
            </div>
            <div class="tc-category-item-text">
                <span>{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'tc-category',
    data: function() {
        return {};
    },
    props: {
        categories: {
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
        handleCategoryClick: function(event) {
            this.$emit('handleClick', { event, options: {} });
        },
        handleCategoryJump: function(item, event) {
            event.stopPropagation();
            item.link && this.$router.push(item.link);
        },
    }
}
</script>

<style lang="less">
    .tc-category-container {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        padding: 0.1rem 0.08rem;
    }
    .tc-category-item {
        width: 20%;
        text-align: center;
    }
    .tc-category-item img {
        width: 0.48rem;
        display: inline-block;
    }
    .tc-category-item-text {
        font-size: 13px;
        padding: 0.05rem 0;
    }
</style>
