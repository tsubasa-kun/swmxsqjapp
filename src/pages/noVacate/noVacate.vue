<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/no_data.png">
        </div>
        <span class="main-label">你还没有申请过请假哦</span>
        <mt-button class="submit-btn" @click="toApply">申请请假</mt-button>
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
        padding-top: 60PX;
    }

    .img-div img {
        width: 120PX;
        height: 120PX;
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
            toApply: function () {
                this.$router.push('/vacateApply')
            }
        },
        created() {
            SDK.setTitleText('请假');
        }
    }
</script>