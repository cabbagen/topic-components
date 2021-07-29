<template>
    <div class="tc-navigation">
        <div class="tc-navigation-title">
            {{title}}
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'tc-navigation',
        data: function() {
            return {

            };
        },
        props: {
            title: {
                type: String,
                default: '导航组件',
            },
            searchLink: {
                type: String,
                default: '',
            },
            menus: {
                validator: function(values) {
                    if (!(values instanceof Array)) {
                        return false;
                    }
                    return values.some((item) => {
                        return Object.keys(item).indexOf('title') > -1 && Object.keys(item).indexOf('link') > -1;
                    });
                },
                default: function() {
                    return [
                        { title: '菜单一', link: '' },
                        { title: '菜单二', link: '' },
                        { title: '菜单三', link: '' },
                    ];
                }
            }
        },
    }
</script>

<style lang="less">
    .tc-navigation {
        width: 100%;
        height: .5rem;
        position: relative;
        background-color: #ffffff;
    }
    .tc-navigation-title {
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
</style>
