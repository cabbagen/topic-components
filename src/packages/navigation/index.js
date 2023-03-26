import TCNavigation from './navigation.vue';
import TCNavigationEdit from './navigation-edit.vue';
import struct from '../../struct/navigation';

export default {
    struct,
    title: '导航组件',
    type: 'navigation',
    tagName: 'tc-navigation',
    tagNameEdit: 'tc-navigation-edit',
    component: TCNavigation,
    componentEdit: TCNavigationEdit,
};
