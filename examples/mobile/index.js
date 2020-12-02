
if (typeof window.ATopic.default !== 'undefined') {
    Vue.use(window.ATopic.default);
}

var app = new Vue({
    el: '#root',
    data: {
    },
	methods: {
		handleUpdateData: function() {
			var iframeElement = document.getElementById('mobile');
			iframeElement.contentWindow.postMessage('hello', '*');
		}
	}
});