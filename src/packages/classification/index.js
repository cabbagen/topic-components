import TCClassification from './classification.vue';
import TCClassificationEdit from './classificationEdit.vue';
import struct from '../../struct/classification';

export default {
    struct,
    type: 'classification',
    tagName: 'tc-classification',
    tagNameEdit: 'tc-classification-edit',
    component: TCClassification,
    componentEdit: TCClassificationEdit,
};
