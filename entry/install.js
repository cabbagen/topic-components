import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';

// 基础组件
import Text from '../src/packages/text';
import Image from '../src/packages/image';
import Magic from '../src/packages/magic';
import Placeholder from '../src/packages/placeholder';

// 业务组件
import Carousel from '../src/packages/carousel';
import Navigation from '../src/packages/navigation';


Vue.use(VueClipboard);

export const components = [
    Text,
    Placeholder,
    Image,
    Carousel,
	Magic,
    // Navigation,
];

export default function install(app) {
    components.forEach(item => {
        app.component(item.tagName, item.component);
        app.component(item.tagNameEdit, item.componentEdit);
    });
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
