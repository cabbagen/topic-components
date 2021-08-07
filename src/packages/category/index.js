import TCCategory from './category.vue';
import TCCategoryEdit from './categoryEdit.vue';
import struct from '../../struct/category';

export default {
    struct,
    type: 'category',
    tagName: 'tc-category',
    tagNameEdit: 'tc-category-edit',
    component: TCCategory,
    componentEdit: TCCategoryEdit,
};
