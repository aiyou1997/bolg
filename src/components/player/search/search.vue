<template>
    <div class="search">
        <div class="searchText">
            <input type="text" v-model="text" @keyup.enter="search" />
            <button @click="search">搜索</button>
        </div>
        <ul class="result" ref="result">
            <div class="scroll" ref="scroll"></div>
            <li v-for="(item,index) in list.data" :key="index" @click="choosePurl(index)">
                <span class="name">{{item.name}}</span>
                <span class="singer">{{item.singer}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "serach",
    data() {
        return {
            text: "",
            list: {},
			M4aUrl:[]
        };
    },
    methods: {
        search() {
			axios.get(`http://localhost:9527/api/getMid/${this.text}`)
				.then(data => {
                    this.list = data;
                    this.$refs.scroll.style.height = 0;
                })
                .then(() => {
                    this.$refs.scroll.style.height =
                        this.$refs.result.clientHeight + "px";
                });
		},
		choosePurl(index){
			axios.get(`http://localhost:9527/api/getM4aUrl/${this.list.data[index].mid}`).then(
				data=>{
					this.M4aUrl=data.data;
					this.$emit('getM4aUrl',this.M4aUrl,this.list.data[index].name,this.list.data[index].pmid,this.list.data[index].singer);
				}
			)
		}
    },
    watch:{
		// M4aUrl(){
		// 	return 
		// }
	}
};
</script>

<style lang="scss" scoped>
.search {
    position: absolute;
    width: 240px;
    margin: 0;
    top: -32px;
    right: 1px;
	z-index: -1;
    div {
        width: 100%;
        background-color: #fff;
        border: 1px black solid;
    }
    ul {
        width: 100%;
        background-color: #fff;
        border-left: 1px black solid;
        border-right: 1px black solid;
        list-style: none;
        padding: 0;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .searchText {
        position: absolute;
        height: 32px;
        top: -2px;
        input {
            float: left;
            margin: 6px;
        }
        button {
            float: right;
            width: 42px;
            height: 22px;
            margin: 5px 6px;
            font-size: 10px;
        }
    }
    .result {
        position: absolute;
        bottom: 0;
        margin: 0;
        max-height: 300px;
        overflow: auto;
        .scroll {
            float: right;
            width: 4px;
            height: 100%;
            background: #ccc;
            border: none;
        }
        li {
            border-bottom: black 1px solid;
            .name {
                display: inline-block;
				margin-left: 14px;
                width: 133px;
				text-align: left;
            }
            .singer {
                display: inline-block;
                width: 87px;
            }
        }
		li:nth-child(2){
			border-top: black 1px solid;
		}
    }
}
</style>