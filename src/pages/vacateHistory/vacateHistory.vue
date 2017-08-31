<template>
    <div class="content">
        <div class="item-div" v-for="vacate in vacates" @click="toVacateDetail(vacate.leaveId)">
            <span class="describe">{{ vacate.leaveType }}</span>
            <span class="status pass" v-if="vacate.auditState.indexOf('已通过') >= 0">{{ vacate.auditState }}</span>
            <span class="status refused" v-else-if="vacate.auditState.indexOf('不通过') >= 0">{{ vacate.auditState }}</span>
            <span class="status waiting" v-else>{{ vacate.auditState }}</span>
            <div>
                <span class="time">{{ formatInfoDate(vacate.beginDate) }} ~ {{ formatInfoDate(vacate.endDate) }} 共{{ vacate.numberOfLeaveDays }}天</span>
            </div>
        </div>

        <div class="add-btn-bg"></div>
        <i class="iconfont icon-tianjia add-btn" @click="toApply"></i>
    </div>
</template>

<style scoped>
    .content {

    }

    .item-div {
        position: relative;
        width: 100%;
        border-bottom: solid 1PX #e8e8e8;
        padding: 10PX;
    }

    .describe {
        display: inline-block;
        width: 82%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
        color: #000;
        font-size: 15PX;
    }

    .status {
        position: absolute;
        top: 10PX;
        right: 10PX;
        font-size: 12PX;
        padding-left: 5PX;
        padding-right: 5PX;
    }

    .time {
        font-size: 14PX;
        color: #92969c;
    }

    .mint-button--default {
        box-shadow: 0 0 2PX #06c1ae;
    }

    .mint-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 20PX;
        border: 0;
        box-sizing: border-box;
        color: inherit;
        font-size: 10PX;
        height: 30px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
    }

    .add-btn {
        position: fixed;
        bottom: 20PX;
        right: 20PX;
        color: #06c1ae;
        font-size: 50PX;
    }

    .add-btn-bg {
        display: block;
        position: fixed;
        bottom: 19PX;
        right: 31PX;
        width: 25PX;
        height: 25PX;
        background-color: white;
    }

    .pass {
        color: #06c1ae;
    }

    .waiting {
        color: #ffb200;
    }

    .refused {
        color: #ff571a;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, Button} from 'mint-ui';
    export default {
        data() {
            return {
                vacates: []
            }
        },
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button
        },
        methods: {
            toVacateDetail: function (leaveId) {
                this.$router.push({path: '/vacateDetail', query: {'leaveId': leaveId}});
            },
            toApply: function () {
                Indicator.open();
                this.$http.get(Api.checkWhetherStudentCanApply)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        Indicator.close();
                        if (res.status === '200') {
                            if (res.datas[0].applicable) {
                                this.$router.push('/vacateApply');
                            } else {
                                Utils.methods.showTip(res.datas[0].reason);
                            }
                        } else {
                            Utils.methods.showTip('校验是否可申请请假失败');
                        }
                    })
                    .catch(msg => {
                        Indicator.open();
                        Utils.methods.showTip('请求出错');
                    });
            },
            formatInfoDate(str) {
                if (!str) {
                    return;
                }
                let date = str.replace(/-/g, '.');
                return date;
            }
        },
        created() {
            SDK.setTitleText('请假');
            Indicator.open();
            this.$http.get(Api.getStudentLeaveRecords)
                .then(res => {
                    return res.json();
                }).then(res => {
                    this.vacates = res.datas[0];
                    Indicator.close();
                });
        }
    }
</script>