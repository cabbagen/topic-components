import ViewUI from 'view-design';
import VueClipboard from 'vue-clipboard2';

import image from './src/components/image/index';
import text from './src/components/text/index';
import placeholder from './src/components/placeholder/index';

import 'view-design/dist/styles/iview.css';

const vuePlugins = [ViewUI, VueClipboard];

const components = [
    image,
    text,
    placeholder,
];

function install(Vue) {
    // plugins
    vuePlugins.forEach(item => {
        Vue.use(item);
    });

    // global register component
    components.forEach(item => {
        Vue.component(item.tagName, item.component);
        Vue.component(item.tagNameEdit, item.componentEdit);
    });
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const groups = [{
    title: '基础组件',
    components: [
        { type: 'image', title: '图片组件' },
        { type: 'text', title: '文本组件' },
        { type: 'placeholder', title: '占位组件' },
    ],
}];

const library = {
    version: '1.0.0',
    install,
    components,
    groups,
};

export default library;
