import TCProductDetail from './product-detail.vue';
import TCProductDetailEdit from './product-detail-edit.vue';
import struct from '../../struct/product-detail';

export default {
    struct,
    title: '商品详情组件',
    type: 'product-detail',
    tagName: 'tc-product-detail',
    tagNameEdit: 'tc-product-detail-edit',
    component: TCProductDetail,
    componentEdit: TCProductDetailEdit,
};
