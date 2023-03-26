import TCGoTop from './go-top.vue';
import TCGoTopEdit from './go-top-edit.vue';
import struct from '../../struct/go-top';

export default {
    struct,
    title: '返回顶部组件',
    type: 'go-top',
    tagName: 'tc-go-top',
    tagNameEdit: 'tc-go-top-edit',
    component: TCGoTop,
    componentEdit: TCGoTopEdit,
};
