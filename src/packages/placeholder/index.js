import TCPlaceholder from './placeholder.vue';
import TCPlaceholderEdit from './placeholder-edit.vue';
import struct from '../../struct/placeholder';

export default {
    struct,
    title: '占位组件',
    type: 'placeholder',
    tagName: 'tc-placeholder',
    tagNameEdit: 'tc-placeholder-edit',
    component: TCPlaceholder,
    componentEdit: TCPlaceholderEdit,
};
