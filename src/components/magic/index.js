import Magic from './magic.vue';
import MagicEdit from './magicEdit.vue';
import struct from '../../struct/magic.js';

export default {
    struct,
    type: 'magic',
    tagName: 'tc-magic',
    tagNameEdit: 'tc-magic-edit',
    component: Magic,
    componentEdit: MagicEdit,
};
