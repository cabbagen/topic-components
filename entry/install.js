
import VueClipboard from 'vue-clipboard2';

import Image from '../src/mobile/components/image';
import Text from '../src/mobile/components/text';
import Placeholder from '../src/mobile/components/placeholder';
import Carousel from '../src/mobile/components/carousel';

import 'view-design/dist/styles/iview.css';

const plugins = [
    VueClipboard,
];

export const components = [
    Image,
    Text,
    Placeholder,
    Carousel,
];

export default function install(Vue) {
    // plugins
    plugins.forEach(item => Vue.use(item));
    

    // self library components
    components.forEach(item => {
        Vue.component(item.tagName, item.component);
        Vue.component(item.tagNameEdit, item.componentEdit);
    });
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
