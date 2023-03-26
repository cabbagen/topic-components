<template>
    <svg class="common-svg-icon">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script type="text/javascript">
export default {
    name: 'svg-icon',
    props: {
        icon: {
            type: String,
            isRequired: true,
        }
    },
}
</script>

<style lang="less">
.common-svg-icon {
    width: 1.2em;
    height: 1.2em;
    color: #666666;
    overflow: hidden;
    fill: currentColor;
    vertical-align: -0.2em;
}
</style>
