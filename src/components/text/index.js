import TCText from './text.vue';
import TCTextEdit from './textEdit.vue';
import struct from './struct';

export default {
    struct,
    type: 'text',
    tagName: 'tc-text',
    tagNameEdit: 'tc-text-edit',
    component: TCText,
    componentEdit: TCTextEdit,
};
