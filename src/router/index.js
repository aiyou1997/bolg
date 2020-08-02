import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from './../components/homepage/homepage.vue'
import production from './../components/production/production.vue'
import aboutMe from './../components/aboutMe/aboutMe.vue'

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
                path:'/aboutMe',
                component:aboutMe
            }
        ]
    }
)