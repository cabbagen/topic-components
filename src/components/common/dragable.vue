<template>
	<div :style="dragableStyles" :id="dragableInstanceId" class="common-drag-container" @mousedown="handleMouseDown">
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	
const bindedFnMap = {};
const [boardWidth, boardHeight] = [window.innerWidth, window.innerHeight];
	
export default {
    name: 'common-drag',
    data: function() {
        return {
            draging: false,
            prefix: this.$options.name,
            position: [0 /* translateX */, 0 /* translateY */],
            dragedInitPosition: [0 /* translateX */, 0 /* translateY */],

            willDragedRect: {
                width: 0, height: 0, left: 0, top: 0,
            },
        };
    },
    computed: {
        dragableInstanceId: function() {
            return `${this.$options.name}-${this._uid}`;
        },
        dragableStyles: function() {
            const [translateX, translateY] = this.position;
            return { transform: `translate3d(${translateX}px, ${translateY}px, 0px)` };
        },
    },
    created: function() {
        this.handleInitBindedFn();
    },
    mounted: function() {
        this.handleMouseEventListener();
        this.handleCalcDragedRectWidthAndHeight();
    },
    beforeDestroy: function() {
        this.handleMouseEventListener('removeEventListener');
    },
    methods: {
        handleInitBindedFn: function() {
            Object.assign(bindedFnMap, {
                handleMouseMove: this.handleMouseMove.bind(this),
                handleMouseUp: this.handleMouseUp.bind(this, false),
            });
        },
        handleMouseEventListener: function(type = 'addEventListener') {
            document[type] && document[type]('mouseup', bindedFnMap['handleMouseUp'], false);
            document[type] && document[type]('mousemove', bindedFnMap['handleMouseMove'], false);
        },
        handleCalcDragedRectWidthAndHeight: function() {
            const element = document.getElementById(this.dragableInstanceId);
            
            this.willDragedRect = !element ? { width: 0, height: 0, top: 0, left: 0 } : element.getBoundingClientRect();
        },
        handleMouseDown: function(event) {
            const [translateX, translateY] = this.position;

            this.draging = true;
            this.dragedInitPosition = [event.clientX - translateX, event.clientY - translateY];
        },
        handleMouseMove: function(event) {
            const [dTranslateX, dTranslateY] = this.dragedInitPosition;

            if (!this.draging) {
                return;
            }
            this.position = this.handleAdjustDragedPosition([event.clientX - dTranslateX, event.clientY - dTranslateY]);
        },
        // 修正拖拽边界
        handleAdjustDragedPosition: function(position) {
            let [translateX, translateY] = position;

            if (this.willDragedRect.left + translateX < 0) {
                translateX = -this.willDragedRect.left;
            }

            if (this.willDragedRect.left + translateX > boardWidth - this.willDragedRect.width) {
                translateX = boardWidth - this.willDragedRect.width - this.willDragedRect.left;
            }

            if (this.willDragedRect.top + translateY < 0) {
                translateY = -this.willDragedRect.top;
            }

            if (this.willDragedRect.top + translateY > boardHeight - this.willDragedRect.height) {
                translateY = boardHeight - this.willDragedRect.height - this.willDragedRect.top;
            }

            return [translateX, translateY];
        },
        handleMouseUp: function() {
            this.draging = false;
        }
    },
}
</script>

<style lang="less">
	.mixin-dragable() {
		top: 0;
		left: 0;
		z-index: 1000;
		position: fixed;
		user-select: none;
	}
	.common-drag-container {
		.mixin-dragable();
	}
</style>

