<template>
    <div class="content">
        <div class="img-div">
            <i class="iconfont success">&#xe68c;</i>
        </div>
        <span class="main-label">提交成功</span>
        <mt-button class="submit-btn" @click="toMain">完成</mt-button>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        text-align: center;
        padding: 15PX;
    }

    .img-div {
        width: 100%;
        text-align: center;
        padding-top: 80PX;
    }

    .success {
        color: #06c1ae;
        font-size: 80PX;
    }

    .main-label {
        display: block;
        font-size: 18PX;
        color: #000;
        margin-top: 20PX;
        margin-bottom: 20PX;
    }

    .mint-button--default {
        box-shadow: 0 0 2PX #06c1ae;
    }

    .submit-btn {
        width: calc(100% - 40PX);
        color: #06c1ae;
        background-color: white;
    }
</style>

<script type="text/javascript">
    import {Button} from 'mint-ui';
    export default {
        components: {
            [Button.name]: Button
        },
        methods: {
            toMain: function () {
                this.$router.go(-2);
            }
        },
        created() {
            SDK.setTitleText('发起请假');
        }
    }
</script>