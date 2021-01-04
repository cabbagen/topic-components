import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import Image from '../src/components/image';
import Text from '../src/components/text';
import Placeholder from '../src/components/placeholder';
import Carousel from '../src/components/carousel';
import Magic from '../src/components/magic';

Vue.use(VueClipboard);

export const components = [
    Image,
    Text,
    Placeholder,
    Carousel,
	Magic,
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
