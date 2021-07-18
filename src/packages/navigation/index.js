import TCNavigation from './navigation.vue';
import TCNavigationEdit from './navigationEdit.vue';
import struct from '../../struct/navigation';

export default {
    struct,
    type: 'navigation',
    tagName: 'tc-navigation',
    tagNameEdit: 'tc-navigation-edit',
    component: TCNavigation,
    componentEdit: TCNavigationEdit,
};
