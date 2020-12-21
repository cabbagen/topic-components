<template>
    <div :class="['tc-tree', `tc-tree-${id}`, direction, `${selected ? 'selected' : ''}`]" @click="event => handleMagicClick(event, id)">
		<tc-magic v-for="(item, index) in children" :key="index" v-bind="item" @handleClick="handleOutMagicClick">
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
		id: {
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
		children: {
			type: Array,
			default: () => [{
				id: '1-1',
				type: 'magic',
				direction: 'row',
				selected: false,
				injected: null,
				children: [],
			}, {
				id: '1-2',
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
	},
	methods: {
		handleMagicClick: function(event, id) {
			event.stopPropagation();
			this.$emit('handleClick', { event, options: { id } });
		},
		handleOutMagicClick: function(options) {
			this.$emit('handleClick', options);
		}
	},
}
</script>
<style lang="less" scoped>
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
	.selected {
		margin: -1px;
		border: 1px solid blue;
	}
</style>
