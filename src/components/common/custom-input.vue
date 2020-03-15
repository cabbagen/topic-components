<template>
    <div class="tc-custom-input">
        <i-input v-model="inputText">
            <template v-if="prefix == 'upload'">
                <span slot="prepend">
                    <Icon type="ios-cloud-upload-outline" />
                </span>
            </template>
            <template v-else>
                <span slot="prepend">
                    <Icon type="ios-link-outline" />
                </span>
            </template>
            <span slot="append" @click="handleCopy">
                <Icon type="ios-copy-outline" />
            </span>
        </i-input>
    </div>
</template>

<script>
export default {
    name: 'tc-custom-input',
    data: function() {
        return {
            inputText: '',
        };
    },
    props: {
        prefix: {
            type: String,	
        },
        value: {
            type: String,
            default: '',
        },
    },
    mounted: function() {
        this.inputText = this.value;
    },
    methods: {
        handleCopy: function() {
            this.$copyText(this.value).then(() => {
                this.$Message.success('copy success');
            }, (e) => {
                this.$Message.error(e.message);
            });
        }
    },
    watch: {
        value: function(newValue) {
            this.inputText = newValue;
        },
        inputText: function(newValue) {
            this.$emit('input', newValue);
        }
    }
}
</script>

<style lang="less" scoped>

</style>