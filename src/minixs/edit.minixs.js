export default {
    data: function() {
        return {
            visiabled: false,
			initDragabledPosition: [0, 0],
        };
    },
    props: {
        data: Object,
        componentId: [Number, String],
        from: {
            type: String,
            default: 'normal'
        },
    },
    mounted: function() {
        this.visiabled = this.from === 'magic';
        Object.keys(this.data).length > 0 && this.handleUpdateIStruct(this.data);
    },
    methods: {
        handleComponentClick: function({ event }) {
			const { clientX, clientY } = event;

			if (!this.visiabled) {
				this.initDragabledPosition = [clientX, clientY];
			}
			this.visiabled = true;
        },
        handleComponentDelete: function() {
            this.visiabled = false;
            this.$emit('handleComponentDelete', this.componentId);
        },
        handleComponentOk: function() {
            this.visiabled = false;
            this.$emit('handleComponentOk', this.componentId, this.iStruct);
        },
        handleUpdateIStruct: function(data) {
            data && (this.iStruct = data);
        }
    },
    watch: {
        data: function(newValue) {
            this.handleUpdateIStruct(newValue);
        },
        visiabled: function(value) {
            this.$emit('visibleMonitor', this.componentId, value);
        }
    },
}
