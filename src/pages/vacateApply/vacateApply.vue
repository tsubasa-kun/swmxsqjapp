<template>
    <div>
        <div class="tip-div">请假信息</div>
        <div class="content">
            <div class="item-div">
                <span>请假类型</span>
                <input type="text" placeholder="请选择" v-model="type" readOnly="true" @click="showTypePicker"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>请假性质</span>
                <input type="text" placeholder="请选择" v-model="form" readOnly="true" @click="showFormPicker"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>请假开始时间</span>
                <input type="text" placeholder="请选择" v-model="startDate" readOnly="true" @click="showStartDatePicker"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>请假结束时间</span>
                <input type="text" placeholder="请选择" v-model="endDate" readOnly="true" @click="showEndDatePicker"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>请假天数</span>
                <input class="vacate-days-text" type="text" v-model="days" readOnly="true"/>
            </div>
        </div>

        <div class="tip-div">请假理由</div>
        <div class="content">
            <div class="item-div">
                <textarea class="model-inst-input" placeholder="请输入" v-model="reason" maxlength="1000"></textarea>
            </div>
        </div>

        <mt-button class="submit-btn" @click="submit">提交</mt-button>

        <div class="cover"></div>
        <div id="type_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="types" @change="onTValuesChange"></mt-picker>
        </div>

        <div id="form_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="forms" @change="onFValuesChange"></mt-picker>
        </div>

        <mt-datetime-picker
                ref="startDatePicker"
                type="date"
                v-model="defaultStartDate"
                year-format="{value}"
                month-format="{value}"
                date-format="{value}"
                @confirm="startDatePickerConfirm">
        </mt-datetime-picker>

        <mt-datetime-picker
                ref="endDatePicker"
                type="date"
                v-model="defaultEndDate"
                year-format="{value}"
                month-format="{value}"
                date-format="{value}"
                @confirm="endDatePickerConfirm">
        </mt-datetime-picker>
    </div>
</template>

<style scoped>
    .cover {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .tip-div {
        background-color: #f9f9f9;
        color: #92969c;
        padding: 10PX;
        border-bottom: solid 1PX #e8e8e8;
        font-size: 14PX;
    }

    .content {
        padding-left: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .item-div {
        position: relative;
        padding: 10PX 10PX 10PX 0;
    }

    .item-div span {
        display: inline-block;
        width: 36%;
        font-size: 16PX;
    }

    .item-div input {
        border: 0;
        width: 60%;
        outline: none;
        font-size: 16PX;
    }

    .at-top {
        vertical-align: top;
    }

    .model-inst-input {
        display: inline-block;
        height: 150PX;
        resize: none;
        outline: none;
        border: 0;
        font-size: 16PX;
        width: 100%;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .vacate-days-text {
        color: #ffb300;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 25PX 10PX 10PX 10PX;
    }

    .m-picker {
        display: none;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
    }

    .picker-title-div {
        padding-top: 10PX;
        padding-bottom: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .picker-btn {
        color: #06c1ae;
        font-size: 15PX;
    }

    .picker-btn.ok {
        position: absolute;
        right: 10PX;
    }

    .picker-btn.cancel {
        margin-left: 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import moment from 'moment';
    import {Indicator, Picker, Button, DatetimePicker} from 'mint-ui';
    export default {
        data() {
            return {
                type: '',
                typesValue: [],
                typesMap: [],
                types: [
                    {
                        flex: 1,
                        values: [],
                        className: 'types',
                        textAlign: 'center',
                    }
                ],
                typeKey: '',

                form: '',
                formsValue: [],
                formsMap: [],
                forms: [
                    {
                        flex: 1,
                        values: [],
                        className: 'forms',
                        textAlign: 'center',
                    }
                ],
                formKey: '',

                defaultStartDate: '',
                defaultEndDate: '',
                startDate: '',
                endDate: '',
                days: '',

                reason: ''
            }
        },
        components: {
            [Indicator.name]: Indicator,
            [Picker.name]: Picker,
            [Button.name]: Button,
            [DatetimePicker.name]: DatetimePicker
        },
        methods: {
            onTValuesChange(picker, values) {
                this.type = picker.getValues();
                this.getTypeKey(this.type);
            },
            showTypePicker: function () {
                $('.cover').show();
                $('#type_picker').slideDown('fast');
            },
            getTypeKey: function (value) {
                for (let i = 0; i < this.typesMap.length; i++) {
                    if (this.typesMap[i].leaveType == value) {
                        this.typeKey = this.typesMap[i].leaveTypeId;
                    }
                }
            },
            onFValuesChange(picker, values) {
                this.form = picker.getValues();
                this.getFormKey(this.form);
            },
            showFormPicker: function () {
                $('.cover').show();
                $('#form_picker').slideDown('fast');
            },
            getFormKey: function (value) {
                for (let i = 0; i < this.formsMap.length; i++) {
                    if (this.formsMap[i].leaveProperty == value) {
                        this.formKey = this.formsMap[i].leavePropertyId;
                    }
                }
            },
            pickerOK: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            pickerCancel: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            showStartDatePicker: function () {
                this.$refs.startDatePicker.open();
            },
            startDatePickerConfirm: function (value) {
                this.startDate = moment(value).format('YYYY-MM-DD');

                if (this.endDate.length > 0) {
                    let illegal = Utils.methods.compareDate(this.startDate, this.endDate);
                    if (!illegal) {
                        this.days = Utils.methods.getResidueDay2(this.startDate, this.endDate) + 1;
                    } else {
                        Utils.methods.showTip('开始时间不能大于结束时间');
                        this.days = '';
                    }
                }
            },
            showEndDatePicker: function () {
                this.$refs.endDatePicker.open();
            },
            endDatePickerConfirm: function (value) {
                this.endDate = moment(value).format('YYYY-MM-DD');

                if (this.startDate.length > 0) {
                    let illegal = Utils.methods.compareDate(this.startDate, this.endDate);
                    if (!illegal) {
                        this.days = Utils.methods.getResidueDay2(this.startDate, this.endDate) + 1;
                    } else {
                        Utils.methods.showTip('结束时间不能小于开始时间');
                        this.days = '';
                    }
                }
            },
            submit: function () {
                console.log(this.typeKey);
                if(this.type.length <= 0 || this.typeKey.length <= 0) {
                    Utils.methods.showTip('请选择请假类型');
                } else if(this.form.length <= 0) {
                    Utils.methods.showTip('请选择请假性质');
                } else if(this.startDate.length <= 0) {
                    Utils.methods.showTip('请选择请假开始时间');
                } else if(this.endDate.length <= 0) {
                    Utils.methods.showTip('请选择请假结束时间');
                } else if(this.reason.length <= 0) {
                    Utils.methods.showTip('请输入请假理由');
                } else {
                    Indicator.open();
                    let params = '?leaveTypeId=' + this.typeKey + '&leavePorpertyId=' + this.formKey
                        + '&beginDate=' + this.startDate + '&endDate=' + this.endDate + '&reason=' + encodeURI(encodeURI(this.reason));
                    this.$http.get(Api.saveStudentLeaveRecord + params)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if(res.status === '200') {
                                Utils.methods.showTip(res.msg || '提交请假成功');
                                this.$router.push('/applySuccess');
                            } else {
                                Utils.methods.showTip(res.msg || '提交请假失败');
                            }
                        })
                        .catch(msg => {
                            Indicator.open();
                            Utils.methods.showTip('请求出错');
                        });
                }
            },
        },
        created() {
            SDK.setTitleText('发起请假');

            this.defaultStartDate = moment(new Date()).format('YYYY-MM-DD');
            this.defaultEndDate = moment(new Date()).format('YYYY-MM-DD');


            Indicator.open();
            this.$http.get(Api.getDictionaryOfLeaveType)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    this.typesMap = res.datas[0];
                    for (let i = 0; i < this.typesMap.length; i++) {
                        this.typesValue.push(this.typesMap[i].leaveType);
                    }
                    this.types[0].values = this.typesValue;
                })
                .catch(msg => {
                    Indicator.open();
                    Utils.methods.showTip('请求出错');
                });

            Indicator.open();
            this.$http.get(Api.getDictionaryOfLeaveProperty)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    this.formsMap = res.datas[0];
                    for (let i = 0; i < this.formsMap.length; i++) {
                        this.formsValue.push(this.formsMap[i].leaveProperty);
                    }
                    this.forms[0].values = this.formsValue;
                })
                .catch(msg => {
                    Indicator.open();
                    Utils.methods.showTip('请求出错');
                });
        },
        watch: {
        }
    }
</script>