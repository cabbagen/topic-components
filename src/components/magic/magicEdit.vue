<template>
    <div class="tc-component-edit tc-magic-edit">
		<div class="tc-inner-component">
			<tc-magic @handleClick="handleMagicClick" v-bind="iStruct"></tc-magic>
		</div>
		<tc-dragable :initPosition="initDragabledPosition" key="magic-dragable">
			<tc-panel title="魔方组件编辑" v-model="visiabled" @handlePanelDelete="handleComponentDelete" @handlePanelOk="handleComponentOk">
				<template v-slot:content>
					<div class="tc-magic-panel-header">
                        <a-radio-group v-model="currentTab" button-style="solid">
                            <a-radio-button :key="index" :value="item.value" v-for="(item, index) in tabInfos">{{item.title}}</a-radio-button>
                        </a-radio-group>
                    </div>
				</template>
			</tc-panel>
		</tc-dragable>
	</div>
</template>
<script>
import { Radio } from 'ant-design-vue';
import editMinix from '../../minixs/edit.minixs';
import TCMagic from './magic.vue';
import TCPanel from '../common/panel.vue';
import TCDragable from '../common/dragable.vue';
import struct from '../../struct/magic';

export default {
    name: 'tc-magic-edit',
	mixins: [editMinix],
	components: {
		'a-radio-group': Radio.Group,
        'a-radio-button': Radio.Button,
		'tc-magic': TCMagic,
		'tc-panel': TCPanel,
		'tc-dragable': TCDragable,
	},
	data: function() {
		return {
			iStruct: struct,
			currentMagicId: -1,
			currentTab: 'containerSetting',
			tabInfos: [
				{ title: '魔方配置', value: 'containerSetting' },
                { title: '组件配置', value: 'componentSetting' },
			]
		}
	},
	methods: {
		handleMagicClick: function(options) {
			this.handleComponentClick(options);
			this.currentMagicId = options.options.id;
		},
	}
}
</script>
<style lang="less" scoped>
	.tc-magic-panel-header {
        display: flex;
        justify-content: center;
    }
</style>