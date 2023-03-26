import TCClassification from './classification.vue';
import TCClassificationEdit from './classification-edit.vue';
import struct from '../../struct/classification';

export default {
    struct,
    title: '商品分类组件',
    type: 'classification',
    tagName: 'tc-classification',
    tagNameEdit: 'tc-classification-edit',
    component: TCClassification,
    componentEdit: TCClassificationEdit,
};
