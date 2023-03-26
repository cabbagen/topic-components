import TCImage from './image.vue';
import TCImageEdit from './image-edit.vue';
import struct from '../../struct/image';

export default {
    struct,
    title: '图片组件',
    type: 'image',
    tagName: 'tc-image',
    tagNameEdit: 'tc-image-edit',
    component: TCImage,
    componentEdit: TCImageEdit,
};
