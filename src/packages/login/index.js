import TCLogin from './login.vue';
import TCLoginlEdit from './loginEdit.vue';
import struct from '../../struct/login';

export default {
    struct,
    type: 'login',
    tagName: 'tc-login',
    tagNameEdit: 'tc-login-edit',
    component: TCLogin,
    componentEdit: TCLoginlEdit,
};
