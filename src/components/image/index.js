import TCImage from './image.vue';
import TCImageEdit from './imageEdit.vue';
import struct from './struct';

export default {
    struct,
    type: 'image',
    tagName: 'tc-image',
    tagNameEdit: 'tc-image-edit',
    component: TCImage,
    componentEdit: TCImageEdit,
};
