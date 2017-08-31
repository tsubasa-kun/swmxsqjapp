/**
 * Created by xiekun on 2017/4/12 0012.
 */

export default {
    getMenuInfo: WEBPACK_CONIFG_HOST + '/sys/xsqjapp/MobileServiceStudentApply/getMenuInfo.do',//获取用户权限菜单
    getStudentLeaveRecords: WEBPACK_CONIFG_HOST + '/sys/xsqjapp/MobileServiceStudentApply/getStudentLeaveRecords.do',//获取学生所有请假记录
    getStudentLeaveRecordDetails: WEBPACK_CONIFG_HOST + '/sys/xsqjapp/MobileServiceStudentApply/getStudentLeaveRecordDetails.do',//获取学生请假记录详情
    getDictionaryOfLeaveType: WEBPACK_CONIFG_HOST + '/sys/xsqjapp/MobileServiceStudentApply/getDictionaryOfLeaveType.do',//获取请假类型字典
    getDictionaryOfLeaveProperty: WEBPACK_CONIFG_HOST + '/sys/xsqjapp/MobileServiceStudentApply/getDictionaryOfLeaveProperty.do',//获取请假性质字典
    checkWhetherStudentCanApply: WEBPACK_CONIFG_HOST + '/sys/xsqjapp/MobileServiceStudentApply/checkWhetherStudentCanApply.do',//校验学生是否可申请请假
    saveStudentLeaveRecord: WEBPACK_CONIFG_HOST + '/sys/xsqjapp/MobileServiceStudentApply/saveStudentLeaveRecord.do',//保存请假信息
}
