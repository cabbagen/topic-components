import TCText from './text.vue';
import TCTextEdit from './text-edit.vue';
import struct from '../../struct/text';

export default {
    struct,
    title: '文本组件',
    type: 'text',
    tagName: 'tc-text',
    tagNameEdit: 'tc-text-edit',
    component: TCText,
    componentEdit: TCTextEdit,
};
