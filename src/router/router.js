import Vue        from 'vue'
import Router     from 'vue-router';
Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        { 
            path: '/',                  
            name: 'index',            
            component: () => import('@/pages/index/index.vue'),
        }, 
        {   path: '/invite',            
            name: 'invite',           
            component: () => import('@/pages/invite/invite.vue'),
        }, 
    ]
})
