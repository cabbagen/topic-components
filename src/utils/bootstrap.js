
export class Bootstrap {

    init() {
        this.loadTopicIconFontResources();
        return new Promise(resolve => resolve());
    }

    loadTopicIconFontResources() {
        const element = document.createElement('link');

        element.rel = 'stylesheet';
        element.href = '//at.alicdn.com/t/font_1410717_ieijunpuxsq.css';

        document.head.appendChild(element);
    }
}
