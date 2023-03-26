import TCCategory from './category.vue';
import TCCategoryEdit from './category-edit.vue';
import struct from '../../struct/category';

export default {
    struct,
    title: '分类组件',
    type: 'category',
    tagName: 'tc-category',
    tagNameEdit: 'tc-category-edit',
    component: TCCategory,
    componentEdit: TCCategoryEdit,
};
