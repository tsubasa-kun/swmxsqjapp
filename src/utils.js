/**
 * Created by xiekun on 2017/4/21 0021.
 */
import {Toast} from 'mint-ui';
export default {
    components: {
        [Toast.name]: Toast
    },
    methods: {
        //弹出提示
        showTip: function (msg) {
            Toast({
                message: msg,
                position: 'bottom',
                duration: 2000
            });
        },
        //删除数组中元素
        removeByValue: function (arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        },
        //通过token获取文件
        getFileByToken: function (token) {
            return WEBPACK_CONIFG_HOST + '/sys/emapcomponent/file/getFileByToken/' + token + '.do';
        },
        //两个时间对比
        compareDate: function (date1, date2) {
            let oDate1 = new Date(date1);
            let oDate2 = new Date(date2);
            if (oDate1.getTime() > oDate2.getTime()) {
                // console.log('第一个大' + date1);
                return true;
            } else {
                // console.log('第二个大' + date2);
                return false;
            }
        },
        //获取d1-d2的相差天数
        getResidueDay: function (date1, date2) {
            let startDate = date1.substr(0, 10);
            let endDate = date2.substr(0, 10);
            let day = 24 * 60 * 60 * 1000;
            try {
                let dateArr = startDate.split("-");
                let checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
                let startTime = checkDate.getTime();

                let dateArr2 = endDate.split("-");
                let checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
                let endTime = checkDate2.getTime();

                let cha = parseInt((endTime - startTime) / day);
                return cha;
            } catch (e) {
                return false;
            }
        },
        //获取d1-d2的相差天数 方法2
        getResidueDay2: function (sDate1, sDate2) {
            let aDate, oDate1, oDate2, iDays;
            aDate = sDate1.split("-");
            oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);//转换为12/18/2002格式
            aDate = sDate2.split("-");
            oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数
            return iDays;
        }
    }
}