
export class Bootstrap {

    init() {
        this.loadTopicIconFontResources();
        return new Promise(resolve => resolve());
    }

    loadTopicIconFontResources() {
        const element = document.createElement('script');

        element.type = 'text/javascript';
        element.src = 'http://localhost:7001/static/icons/icons.boudle.js';

        document.head.appendChild(element);
    }
}
