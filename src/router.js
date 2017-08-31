import index from './pages/index/index.vue';
import vacateApply from './pages/vacateApply/vacateApply.vue';
import applySuccess from './pages/applySuccess/applySuccess.vue';
import vacateDetail from './pages/vacateDetail/vacateDetail.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/vacateApply',
            component: vacateApply
        },
        {
            path: '/applySuccess',
            component: applySuccess
        },
        {
            path: '/vacateDetail',
            component: vacateDetail
        }
    ]
};