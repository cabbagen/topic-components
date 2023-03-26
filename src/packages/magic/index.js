import Magic from './magic.vue';
import MagicEdit from './magic-edit.vue';
import struct from '../../struct/magic.js';

export default {
    struct,
    title: '魔方组件',
    type: 'magic',
    tagName: 'tc-magic',
    tagNameEdit: 'tc-magic-edit',
    component: Magic,
    componentEdit: MagicEdit,
};
