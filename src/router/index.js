import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from './../components/homepage/homepage.vue'
import production from './../components/production/production.vue'
import other from './../components/other/other.vue'

Vue.use(VueRouter);

export default new VueRouter(
    {
        routes:[
            {
                path:'/',
                redirect:'/homepage'
            },{
                path:'/homepage',
                component:homepage
            },{
                path:'/production',
                component:production
            },{
                path:'/other',
                component:other
            }
        ]
    }
)