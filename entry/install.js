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

// 额外的方法
import { handleRegistTopicGlobalProperty, handleRegistTopicGlobalProperties, getRegistedTopicGlobalProperty } from '../src/utils/hooks';

// 加载引导资源
import { Bootstrap } from '../src/utils/bootstrap';

Vue.use(VueClipboard);

export const components = [
    Text,
    Placeholder,
    Image,
    Carousel,
	Magic,
    Navigation,
];

export default function install(app, options) {
    if (app.getRegistedTopicGlobalProperty && app.handleRegistTopicGlobalProperty) {
        return;
    }
    components.forEach(item => {
        app.component(item.tagName, item.component);
        app.component(item.tagNameEdit, item.componentEdit);
    });

    if (typeof options !== 'undefined' && typeof options.properties !== 'undefined') {
        handleRegistTopicGlobalProperties(options.properties);
    }

    app.getRegistedTopicGlobalProperty = getRegistedTopicGlobalProperty;
    app.handleRegistTopicGlobalProperty = handleRegistTopicGlobalProperty;

    (new Bootstrap()).init().then(() => options && options.callback && options.callback());
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
