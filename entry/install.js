import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import Image from '../src/components/image';

Vue.use(VueClipboard);

export const components = [
    Image,
];

export default function install(app) {	
	app.mixin(Vue.options)
	
    components.forEach(item => {
        app.component(item.tagName, item.component);
        app.component(item.tagNameEdit, item.componentEdit);
    });
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
