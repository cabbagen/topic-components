import TCCarousel from './carousel.vue';
import TCCarouselEdit from './carouselEdit.vue';
import struct from '../../struct/carousel';

export default {
    struct,
    type: 'carousel',
    tagName: 'tc-carousel',
    tagNameEdit: 'tc-carousel-edit',
    component: TCCarousel,
    componentEdit: TCCarouselEdit,
};
