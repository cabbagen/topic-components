import TCImage from './image.vue';
import TCImageEdit from './imageEdit.vue';
import struct from '../../struct/image';

export default {
    struct,
    type: 'image',
    tagName: 'tc-image',
    tagNameEdit: 'tc-image-edit',
    component: TCImage,
    componentEdit: TCImageEdit,
};
