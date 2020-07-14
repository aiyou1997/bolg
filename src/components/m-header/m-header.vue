<template>
    <div class="m-header">
        <ul>
            <router-link tag="li" class="tab-item" to="homepage" exact-active-class="underline">
                <span class="tab-link">首页</span>
            </router-link>
            <router-link tag="li" class="tab-item" to="production" exact-active-class="underline">
                <span class="tab-link">个人作品</span>
            </router-link>
            <router-link tag="li" class="tab-item" to="other" exact-active-class="underline">
                <span class="tab-link">其他</span>
            </router-link>
            <li>
                <span>联系</span>
                <contact></contact>
            </li>
        </ul>
    </div>
</template>

<script>
import contact from "./contact/contact";
export default {
    name:'m-header',
    methods:{
    },
    props:{
        msg: String
    },
    components:{
        contact
    }
}
</script>

<style lang="scss" scoped>
    .m-header {
        display: flex;
        justify-content: space-around;
        h1 {
            display: none;
        }
        ul {
            display: flex;
            justify-content: space-around;
            width: 70%;
            margin: 0;
            padding: 0;
            list-style: none;
            flex-wrap: wrap;
            border-bottom: 2px solid #dddddd;
            li {
                display: inline-block;
                padding: 10px 0;
                margin: 0 10px;
                font-size: 20px;
            }
            .underline::after{
                content: "";
                display: block;
                width: 150%;
                border-bottom: 2px solid red;
                transform: translateY(11px) translateX(-16.6%);
            }
            li:last-child:hover .contact{
                display: block;
                position: absolute;
                transform: translateX(-80px) translateY(12px);
            }
        }
    }
</style>