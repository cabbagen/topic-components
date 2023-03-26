import TCLogin from './login.vue';
import TCLoginlEdit from './login-edit.vue';
import struct from '../../struct/login';

export default {
    struct,
    title: '登陆组件',
    type: 'login',
    tagName: 'tc-login',
    tagNameEdit: 'tc-login-edit',
    component: TCLogin,
    componentEdit: TCLoginlEdit,
};
