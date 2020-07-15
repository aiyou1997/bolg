<template>
    <div class="cont">
        <div class="line"></div>

        <ul class="subject">
            <h2>今日要闻</h2>
            <li v-for="(item,index) in newList" :key="index">
                <a :href="item.url">{{item.title}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "cont",
    data() {
        return {
            newList: []
        };
    },
    mounted() {
        axios.get("http://localhost:9527/api/getDayNew/new").then(data => {
            this.newList = JSON.parse(data.data.slice(6).slice(0, -2));
        });
    }
};
</script>

<style lang="scss" scoped>
.cont {
    display: block;
    margin: 0 auto;
    width: 80%;
    .line {
        display: inline-block;
        width: 100%;
        border: #bbb 1px solid;
        margin: 8px 0;
    }
    .subject {
        display: inline-block;
        width: 90%;
        margin-top: 12px;
        list-style: none;
		text-align: left;
        border: black 1px solid;
        li {
			padding: 14px;
            a {
                text-decoration-line: none;
                color: black;
				font-size: 16px;
            }
        }
    }
}
</style>