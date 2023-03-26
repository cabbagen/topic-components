<template>
    <div class="tc-login" @click="handleClick">
        <div class="tc-login-logo">
            <img :src="logo" alt="logo" />
        </div>
        <form class="tc-login-form" src="">
            <div class="tc-login-form-row">
                <input type="text" v-model="username" name="username" placeholder="请输入用户名" />
            </div>
            <div class="tc-login-form-row">
                <input type="password" v-model="password" name="password" placeholder="请输入用户密码" />
            </div>
            <div :class="['tc-login-form-btn', disabled]">
                <button type="button" @click="handleSubmitLogin">登录 / 注册</button>
            </div>
        </form>
    </div>
</template>

<script type="text/javascript">
import { Toast } from 'vant';
import { getQuery, linkTo } from '../../utils/utils';
import { getRegistedTopicGlobalProperty, request } from '../../utils/hooks';

export default {
    name: 'tc-login',
    data: function() {
        return {
            username: '',
            password: ''
        };
    },
    computed: {
        disabled: function() {
            return !this.username || !this.password ? 'disabled' : '';
        },
    },
    props: {
        logo: {
            type: String,
            default: 'https://file.iviewui.com/dev-dist/5fbd2906a125dd0ba4fbd502263ca524.png',
        },
        model: {
            type: String,
            default: 'tcm-login',
        },
    },
    methods: {
        handleSubmitLogin: function(event) {
            event.stopPropagation();

            if (this.disabled || !getRegistedTopicGlobalProperty(request)) {
                return;
            }

            const params = { username: this.username, password: this.password };

            getRegistedTopicGlobalProperty(request)(`/tc-proxy/${this.model}/login`, 'post', params).then((result) => {
                if (result.code !== 100200) {
                    Toast.fail(result.message || '系统繁忙');
                    return;
                }
                linkTo(getQuery().returnUrl || '/');
            });
        },
        handleClick: function(event) {
            this.$emit('handleClick', { event, options: {} });
        }
    }
};

</script>

<style lang="less">
.tc-login {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 0 0.4rem;
    background-color: #ffffff;
}
.tc-login-logo {
    display: flex;
    justify-content: center;
    margin: 1rem 0 0.4rem 0;
}
.tc-login-logo img {
    width: 1rem;
    height: auto;
    display: inline-block;
}
.tc-login-form, .tc-login-form-row {
    width: 100%;
}
.tc-login-form-row {
    height: 0.45rem;
    margin-bottom: 0.2rem;
    border-radius: 0.22rem;
    background-color: #F9F9FC;
}
.tc-login-form-row input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 0.2rem;
    display: inline-block;
    border-radius: 0.22rem;
    background-color: #F9F9FC;

    &:-internal-autofill-previewed, &:-internal-autofill-selected {
        transition: background-color 5000s ease-out 0.5s;
    }
}
.tc-login-form-btn, .tc-login-form-btn button {
    width: 100%;
    height: 0.4rem;
    border-radius: 0.22rem;
}
.tc-login-form-btn {
    margin-top: 0.4rem;

    &.disabled button {
        opacity: 0.4;
    }
}
.tc-login-form-btn button {
    border: none;
    outline: none;
    color: #ffffff;
    display: inline-block;
    background-color: #3b66fc;
}
</style>
