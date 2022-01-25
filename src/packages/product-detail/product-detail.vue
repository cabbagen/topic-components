<template>
    <div class="product-detail-container">
        <div class="pdc-header">
            <tc-navigation title="商品详情" />
        </div>
        <div class="pdc-albums">
            <tc-carousel :images="albums" />
        </div>
        <div class="pdc-infomation">
            <div class="pdc-infomation-top">
                <div class="pdc-infomation-price">¥{{ product.price }}</div>
            </div>
            <div class="pdc-infomation-name">{{ detail.name }}</div>
        </div>
    </div>
</template>

<script type="text/javascript">
import { getQuery } from '../../utils/utils';
import { getRegistedTopicGlobalProperty, request } from '../../utils/hooks';

import Carousel from '../carousel/carousel.vue';
import Navigation from '../navigation/navigation.vue';

export default {
    name: 'product-detail',
    components: {
        'tc-carousel': Carousel,
        'tc-navigation': Navigation,
    },
    data: function() {
        return {
            skus: [],
            detail: {},
            specifications: [],
        };
    },
    computed: {
        albums: function() {
            if (!this.detail.albums) {
                return [];
            }
            return this.detail.albums.split(',').map(item => ({ imgLink: '', imgSource: item }));
        },
        product: function() {
            const { skuId } = getQuery();
            return this.skus.find(item => item.id.toString() === skuId) || {};
        },
    },
    mounted: function() {
        this.handleFetchProductDetailInfo();
    },
    methods: {
        handleFetchProductDetailInfo: function() {
            const { productId } = getQuery();

            getRegistedTopicGlobalProperty(request)(`http://localhost:8787/m/product/skus/completed/detail?productId=${productId}`, 'get').then((result) => {
                if (result.code !== 100200) {
                    return;
                }
                console.log(result);

                this.skus = result.data.skus;
                this.detail = result.data.detail;
                this.specifications = result.data.specifications;
            });
        },
    },
}
</script>

<style lang="less">
.pdc-infomation {
    box-sizing: border-box;
    background-color: #FFFFFF;
    justify-content: space-between;
    padding: 0.05rem 0.1rem 0.08rem 0.1rem;
}
.pdc-infomation-top {
    margin: 0.05rem 0;
}
.pdc-infomation-price {
    color: #f2270c;
    font-size: 22px;
}
.pdc-infomation-name {
    color: #262626;
    font-size: 14px;
    font-weight: bolder;
}
</style>
