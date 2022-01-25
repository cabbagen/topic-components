import TCProductDetail from './product-detail.vue';
import TCProductDetailEdit from './product-detail-edit.vue';
import struct from '../../struct/product-detail';

export default {
    struct,
    type: 'product-detail',
    tagName: 'tc-product-detail',
    tagNameEdit: 'tc-product-detail-edit',
    component: TCProductDetail,
    componentEdit: TCProductDetailEdit,
};
