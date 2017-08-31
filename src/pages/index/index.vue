<template>
    <div>
        <v-no-vacate v-if="tab === 0"></v-no-vacate>
        <v-vacate-history v-if="tab === 1"></v-vacate-history>
    </div>
</template>

<style scoped>
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import noVacate from '../noVacate/noVacate.vue';
    import vacateHistory from '../vacateHistory/vacateHistory.vue';
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                tab: -1
            }
        },
        components: {
            'v-no-vacate': noVacate,
            'v-vacate-history': vacateHistory
        },
        created() {
            SDK.setTitleText('请假');
            Indicator.open();
            this.$http.get(Api.getMenuInfo)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    if (res.status === '200') {
                        this.$http.get(Api.getStudentLeaveRecords)
                            .then(res => {
                                return res.json();
                            })
                            .then(res => {
                                Indicator.close();
                                if (res.datas[0]) {
                                    if (res.datas[0].length === 0) {
                                        this.tab = 0;
                                    } else {
                                        this.tab = 1;
                                    }
                                } else {
                                    this.tab = 0;
                                }
                            })
                            .catch(msg => {
                                Indicator.close();
                                Utils.methods.showTip('请求出错');
                            });
                    } else {
                        Indicator.close();
                        Utils.methods.showTip('获取用户信息失败');
                    }
                })
                .catch(msg => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        }
    }
</script>