<template>
    <div class="tc-custom-input">
        <a-input v-model="inputText">
            <span solt="addonBefore">
                <a-icon :type="prefix == 'upload' ? 'upload' : 'link'" />
            </span>
            <span slot="addonAfter" @click="handleCopy">
                <a-icon type="copy" />
            </span>
        </a-input>
    </div>
</template>

<script type="text/javascript">
import { Icon, Input, message } from 'ant-design-vue';

export default {
    name: 'tc-custom-input',
    data: function() {
        return {
            inputText: '',
        };
    },
    components: {
        'a-icon': Icon,
        'a-input': Input,
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
                message.success('copy success', 2);
            }, (e) => {
                message.error(e.message, 2);
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