

if (typeof window.ATopic.default !== 'undefined') {
    Vue.use(window.ATopic.default);
}

var app = new Vue({
    el: '#root',
    data: {
        imgInfos: [{
            imgSource: 'https://upload-images.jianshu.io/upload_images/1966045-27a4df5adf08fcfc.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/690/format/webp',
            imgLink: 'http://www.baidu.com',
        }, {
            imgSource: 'https://upload-images.jianshu.io/upload_images/1966045-27a4df5adf08fcfc.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/690/format/webp',
            imgLink: 'http://www.baidu.com',
        }]
    },
});