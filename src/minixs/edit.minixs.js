export default {
    data: function() {
        return {
            visiabled: false,
        };
    },
    props: {
        componentId: Number,
        data: Object,
    },
    mounted: function() {
        this.data.id && this.handleUpdateIStruct(this.data);
    },
    methods: {
        handleComponentClick: function() {
            this.visiabled = true;
        },

        handleComponentDelete: function() {
            this.$emit('handleComponentDelete', this.componentId);
        },

        handleComponentOk: function() {
            this.$emit('handleComponentOk', this.componentId, this.iStruct);
        },
        
        handleUpdateIStruct: function(data) {
            data && (this.iStruct = data);
        }
    },
    watch: {
        data: function(newValue) {
            this.handleUpdateIStruct(newValue);
        }
    },
}
