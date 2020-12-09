import TCPlaceholder from './placeholder.vue';
import TCPlaceholderEdit from './placeholderEdit.vue';
import struct from '../../struct/placeholder';

export default {
    struct,
    type: 'placeholder',
    tagName: 'tc-placeholder',
    tagNameEdit: 'tc-placeholder-edit',
    component: TCPlaceholder,
    componentEdit: TCPlaceholderEdit,
};
