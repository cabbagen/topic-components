import TCCarousel from './carousel.vue';
import TCCarouselEdit from './carousel-edit.vue';
import struct from '../../struct/carousel';

export default {
    struct,
    title: '轮播图组件',
    type: 'carousel',
    tagName: 'tc-carousel',
    tagNameEdit: 'tc-carousel-edit',
    component: TCCarousel,
    componentEdit: TCCarouselEdit,
};
