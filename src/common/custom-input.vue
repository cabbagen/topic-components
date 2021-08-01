<template>
    <div class="tc-custom-input">
        <a-input v-model="inputText">
            <span slot="addonBefore">
                <a-icon v-if="prefix !== 'upload'" type="link"></a-icon>
                <a-upload v-else v-bind="uploadProps" @change="handleUploadChange">
                    <a-icon type="upload"></a-icon>
                </a-upload>
            </span>
            <span slot="addonAfter" @click="handleCopy">
                <a-icon type="copy" />
            </span>
        </a-input>
    </div>
</template>

<script type="text/javascript">
import { Icon, Input, message, Upload } from 'ant-design-vue';
import { getRegistedTopicGlobalProperty, upload } from '../utils/hooks';

export default {
    name: 'tc-custom-input',
    data: function() {
        return {
            inputText: '',
        };
    },
    computed: {
        uploadProps: function() {
            const { prevFile, ...other } = getRegistedTopicGlobalProperty(upload)();
            return {
                ...other,
                showUploadList: false,
            };
        },
    },
    components: {
        'a-icon': Icon,
        'a-input': Input,
        'a-upload': Upload,
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
        handleUploadChange: function(info) {
            const { prevFile } = getRegistedTopicGlobalProperty(upload)();

            if (info.file.status === 'error') {
                message.error('文件上传失败');
            }
            if (info.file.status === 'done') {
                const response = info.file.response;

                if (response.status !== 200) {
                    return;
                }
                message.success('文件上传成功');
                this.inputText = prevFile(response.data);
            }
        },
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

<style lang="less">

</style>
