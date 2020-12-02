
if (typeof window.ATopic.default !== 'undefined') {
    Vue.use(window.ATopic.default);
}

console.log(ATopic);

var app = new Vue({
    el: '#root',
    data: {
        // imgInfos: [{
            // imgSource: 'http://cdn.dev.egret.com/asset/20160803/57a1cf2ee7c1a.jpg',
            // imgLink: 'http://www.baidu.com',
        // }, {
            // imgSource: 'http://cdn.dev.egret.com/asset/20160803/57a1cf0d45a60.jpg',
            // imgLink: 'http://www.baidu.com',
        // }]
		imgSource: 'http://cdn.dev.egret.com/asset/20160803/57a1cf2ee7c1a.jpg',
    },
	mounted: function() {
		window.addEventListener('message', function(event) {
			if (event.data.type === 'webpackOk' || !event.data) {
				return
			}
			console.log(event.data);
		}, false);
	}
});