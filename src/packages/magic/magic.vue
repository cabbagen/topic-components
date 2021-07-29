<template>
    <div
        :style="magicStyles"
        :class="['tc-tree', `tc-tree-${mid}`, direction, `${inner && selected ? 'selected' : ''}`]"
        @click="event => handleMagicClick(event, mid)"
    >
        <tc-magic v-for="(item, index) in children" :key="index" v-bind="item" @handleClick="handleOutMagicClick" :inner="inner">
            <component :is="item.injected.type" v-bind="item.injected.props" v-if="item.injected"></component>
        </tc-magic>
        <slot></slot>
    </div>
</template>

<script>

import TCCarousel from '../carousel/carousel.vue';
import TCImage from '../image/image.vue';
import TCPlaceholder from '../placeholder/placeholder.vue';
import TCText from '../text/text.vue';

export default {
    name: 'tc-magic',
    components: {
        'tc-carousel': TCCarousel,
        'tc-image': TCImage,
        'tc-placeholder': TCPlaceholder,
        'tc-text': TCText,
    },
    data: function() {
        return {

        };
    },
    props: {
        mid: {
            type: String,
            default: '1',
        },
        type: {
            type: String,
            default: 'magic',
        },
        direction: {
            type: String,
            default: 'row',
        },
        selected: {
            type: Boolean,
            default: false,
        },
        injected: null,
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: 'auto',
        },
        margin: {
            type: String,
            default: '',
        },
        padding: {
            type: String,
            default: '',
        },
        background: {
            type: String,
            default: '',
        },
        children: {
            type: Array,
            default: () => [{
                mid: '1-1',
                type: 'magic',
                direction: 'row',
                selected: false,
                injected: null,
                children: [],
            }, {
                mid: '1-2',
                type: 'magic',
                direction: 'column',
                selected: false,
                injected: {
                    type: 'tc-image',
                    props: {
                        imgSource: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3635794697,2478707107&fm=15&gp=0.jpg',
                    },
                },
                children: [],
            }]
        },
        inner: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        magicStyles: function() {
            return {
                width: this.width,
                height: this.height,
                margin: this.margin,
                padding: this.padding,
                background: this.background,
            };
        },
    },
    methods: {
        handleMagicClick: function(event, mid) {
            event.stopPropagation();
            this.$emit('handleClick', { event, options: { mid } });
        },
        handleOutMagicClick: function(options) {
            this.$emit('handleClick', options);
        }
    },
}
</script>
<style lang="less">
    .tc-tree {
        width: 100%;
        display: flex;
        min-height: 60px;
        justify-content: space-between;

        &.row {
            flex-direction: row;
        }
        &.column {
            flex-direction: column;
        }
    }
    .tc-tree.selected {
        margin: -1px;
        border: 1px solid #2780ef;

        .tc-tree {
            margin: -1px;
            border: 1px solid #44f56a;
        }
    }
</style>
