<template>
    <div class="content">
        <div class="info-div">
            <span class="main-label">请假信息</span>
            <div class="sub-div">
                <span class="sub-label">请假类型</span>
                <span class="sub-text">{{ vacate.leaveType }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">请假性质</span>
                <span class="sub-text">{{ vacate.leaveProperty }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">请假时间</span>
                <span class="sub-text">{{ formatInfoDate(vacate.beginDate) }} ~ {{ formatInfoDate(vacate.endDate) }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">请假天数</span>
                <span class="sub-text">{{ vacate.numberOfLeaveDays }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label align-top">请假理由</span>
                <div class="sub-text-area">{{ vacate.leaveReason }}</div>
            </div>
        </div>
        <div class="holder"></div>
        <div v-if="vacate.isImport === '1'" class="info-div">
            <span class="main-label">审核进度</span>
            <span class="sub-label">请假记录由管理员导入，无审核流程</span>
        </div>

        <div v-else class="info-div">
            <span class="main-label">审核进度</span>
            <div class="check-steps-div">
                <div class="step-item-div" v-for="step in logInfo">
                    <div class="status-item-left">
                        <div class="status-item-time">
                            <span v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">{{ formatCheckDate(step.SHYJ[0].SHSJ) }}</span>
                        </div>

                        <img src="../../assets/waiting.png" v-if="step.DQZTDM === DQSHZT">
                        <i class="iconfont status-icon-refused"
                           v-else-if="step.PX === curPX && refused">&#xe67a;</i>
                        <i class="iconfont status-icon-pass" v-else-if="step.PX < curPX || curPX === 0">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe706;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text" v-if="step.PX === curPX && vacate.returnState === '1'">{{ step.DQZTDM_DISPLAY }}（<span class="status-status-tuihui">被退回</span>）</span>
                        <span class="step-text" v-else-if="curPX === 1 && step.PX === curPX && vacate.returnState === '0'">{{ step.DQZTDM_DISPLAY }}（<span class="status-status-chehui">撤回</span>）</span>
                        <span class="step-text" v-else>{{ step.DQZTDM_DISPLAY }}</span>
                        <span class="status-tip-refused" v-if="step.PX === curPX && refused">审核不通过</span>
                        <span class="status-tip-pass" v-else-if="step.PX < curPX && step.DQZTDM != 0">审核通过</span>
                        <span class="opinion-text" v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">审核人：{{ step.SHYJ[0].SHR }}</span>
                        <span class="opinion-text" v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">审核意见：{{ step.SHYJ[0].SHYJ }}</span>
                    </div>
                </div>
                <div class="step-item-div">
                    <div class="status-item-left-end">
                        <div class="status-item-time">
                            <span></span>
                        </div>

                        <i class="iconfont status-icon-pass" v-if="DQSHZT === '99'">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe706;</i>
                    </div>
                    <div class="status-item-right-end">
                        <span class="step-text">已通过</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        height: 100%;
        background-color: white;
    }

    .holder {
        width: 100%;
        height: 20PX;
    }

    .info-div {
        padding: 10PX 0PX 10PX 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        text-align: left;
    }

    .main-label {
        display: block;
        height: 35PX;
        font-size: 20PX;
        color: #000;
        margin-bottom: 15PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .sub-div {
        margin-top: 5PX;
    }

    .sub-label {
        display: inline-block;
        font-size: 15PX;
        color: #92969c;
    }

    .sub-text {
        display: inline-block;
        font-size: 15PX;
        color: #000;
        margin-left: 10PX;
    }

    .align-top {
        vertical-align: top;
    }

    .sub-text-area {
        display: inline-block;
        font-size: 15PX;
        color: #000;
        margin-left: 10PX;
        width: 75%;
        white-space: normal;
        word-break: break-all;
    }

    .check-steps-div {
        width: 100%;
        background-color: white;
    }

    .step-item-div {
        width: 100%;
        height: auto;
        min-height: 70PX;
        text-align: left;
    }

    .status-item-time {
        display: inline-block;
        vertical-align: top;
        text-align: right;
        width: 80PX;
        font-size: 12PX;
        color: #92969c;
    }

    .status-item-left {
        display: inline-block;
        /*height: 100%;*/
        height: auto;
        min-height: 70PX;
        padding-right: 15PX;
        position: relative;
    }

    .status-item-left i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-left img {
        width: 20PX;
        height: 20PX;
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-right {
        display: inline-block;
        margin-left: -4PX;
        padding-left: 16PX;
        vertical-align: top;
        height: auto;
        border-left: solid 1PX #e8e8e8;
        min-height: 70PX;
        max-width: 66%;
        padding-bottom: 10PX;
    }

    .status-item-right-end {
        display: inline-block;
        margin-left: -4PX;
        padding-left: 16PX;
        vertical-align: top;
        height: auto;
        min-height: 70PX;
        max-width: 66%;
        padding-bottom: 10PX;
    }

    .step-text {
        display: block;
        text-align: left;
        font-size: 15PX;
    }

    .opinion-text {
        display: block;
        font-size: 12PX;
        color: #92969c;
        white-space: normal;
        word-break: break-all;
    }

    .status-icon-pass {
        font-size: 20PX;
        color: #06c1ae;
        /*background-color: white;*/
    }

    .status-icon-refused {
        font-size: 20PX;
        color: #ff571a;
        /*background-color: white;*/
    }

    .status-tip-pass {
        font-size: 12PX;
        color: #06c1ae;
        /*background-color: white;*/
    }

    .status-tip-refused {
        font-size: 12PX;
        color: #ff571a;
        /*background-color: white;*/
    }

    .status-status-tuihui {
        color: #ff571a;
    }

    .status-status-chehui {
        color: #f9b220;
    }

    .status-icon-dot {
        font-size: 20PX;
        color: #e8e8e8;
        /*background-color: white;*/
    }

    .status-item-left-end {
        display: inline-block;
        height: 100%;
        padding-right: 15PX;
        position: relative;
        vertical-align: top;
    }

    .status-item-left-end i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, Button} from 'mint-ui';
    export default {
        data() {
            return {
                leaveId: this.$route.query.leaveId,
                vacate: {},
                logInfo: {},
                refused: false,
                DQSHZT: '',
                curPX: 0,
            }
        },
        created() {
            SDK.setTitleText('请假详情');
            Indicator.open();
            var params = '?leaveId=' + this.leaveId;
            this.$http.get(Api.getStudentLeaveRecordDetails + params)
                .then(res => {
                    return res.json();
                }).then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        this.vacate = res.datas[0].leaveInfo;
                        if (res.datas[0].auditInfo) {
                            this.logInfo = res.datas[0].auditInfo;
                            this.DQSHZT = this.vacate.auditState;
                            this.getCurrentPX(this.DQSHZT);
                        }
                    } else {
                        Utils.methods.showTip('获取请假详情失败');
                    }
                })
                .catch(msg => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button,
        },
        methods: {
            getCurrentPX: function (curSHZT) {
                if (curSHZT.indexOf('-') === 0) {
                    this.refused = true;
                    curSHZT = curSHZT.substr(1, curSHZT.length);
                }
                for (var i = 0; i < this.logInfo.length; i++) {
                    if (curSHZT === this.logInfo[i].DQZTDM) {
                        this.curPX = this.logInfo[i].PX;
                        console.log(this.curPX);
                    }
                }
            },
            formatCheckDate(str) {
                if (!str) {
                    return;
                }
                let date = str.replace(/-/g, '.');
                date = date.split(' ');
                return date[1].substr(0, 5) + ' ' + date[0];
            },
            formatInfoDate(str) {
                if (!str) {
                    return;
                }
                let date = str.replace(/-/g, '.');
                return date;
            }
        }
    }
</script>