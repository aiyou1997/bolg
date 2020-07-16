<template>
    <div class="search">
        <div class="searchText">
            <input type="text" v-model="text" @keyup.enter="search" />
            <button @click="search">搜索</button>
        </div>
        <ul class="result" ref="result" @mousewheel="mousewheel($event)">
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
			M4aUrl: [],
			result:{
				height:11, //总高度，11是li之间border的总高度
				hideY:0, //隐藏高度
				Y:0 //累计滚动的距离
			},
			scroll:{
				height:0,
				top:0,
				PCT:0
			}
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
					this.init();
                    this.$refs.scroll.style.height =
                        this.$refs.result.clientHeight + "px";
				})
				.then(()=>{
					if(this.$refs.result.clientHeight===300){
						let length=this.$refs.result.children.length;
						for(let i=1;i<length;i++){
							this.result.height=this.result.height+this.$refs.result.children[i].clientHeight;//搜索结果框的总高度（包括隐藏起来的高度）
						}
						this.result.hideY=this.result.height-300;//隐藏起来的高度
						this.scroll.height=300/this.result.height*300;//滚动条的高度
						this.scroll.PCT=this.scroll.height/3;//设置滚动条的高度
						this.$refs.scroll.style.background=`linear-gradient(to bottom,white 0, #ccc 0,#ccc ${this.scroll.PCT}%, white ${this.scroll.PCT}%)`;
						return this.$refs.result.children[0].style.display="block"
					}else{
						return this.$refs.result.children[0].style.display="none"
					}
				})
            
        },
        choosePurl(index) {
            axios
                .get(
                    `http://localhost:9527/api/getM4aUrl/${this.list.data[index].mid}`
                )
                .then(data => {
                    this.M4aUrl = data.data;
                    this.$emit(
                        "getM4aUrl",
                        this.M4aUrl,
                        this.list.data[index].name,
                        this.list.data[index].pmid,
                        this.list.data[index].singer
                    );
                });
		},
		mousewheel(event){
			console.log(event)
			if(event.deltaY>0){
				if(this.result.hideY-this.result.Y>100){
					this.result.Y=this.result.Y+100;
					this.scroll.top=this.scroll.top+100;
					let bigPCT=this.result.Y/this.result.hideY*(100-this.scroll.PCT);
					this.$refs.scroll.style.transform=`translateY(${this.scroll.top}px)`;
					return this.$refs.scroll.style.background=`linear-gradient(to bottom,white ${bigPCT}%, #ccc ${bigPCT}%,#ccc ${bigPCT+this.scroll.PCT}%, white ${bigPCT+this.scroll.PCT}%)`;
				}else{
					this.result.Y=this.result.hideY;
					this.scroll.top=this.result.hideY;
					let bigPCT=this.result.Y/this.result.hideY*(100-this.scroll.PCT);
					this.$refs.scroll.style.transform=`translateY(${this.scroll.top}px)`;
					return this.$refs.scroll.style.background=`linear-gradient(to bottom,white ${bigPCT}%, #ccc ${bigPCT}%,#ccc ${bigPCT+this.scroll.PCT}%, white ${bigPCT+this.scroll.PCT}%)`;
				}
			}else{
				if(this.result.Y>100){
					this.result.Y=this.result.Y-100;
					this.scroll.top=this.scroll.top-100;
					let bigPCT=this.result.Y/this.result.hideY*(100-this.scroll.PCT);
					this.$refs.scroll.style.transform=`translateY(${this.scroll.top}px)`;
					return this.$refs.scroll.style.background=`linear-gradient(to bottom,white ${bigPCT}%, #ccc ${bigPCT}%,#ccc ${bigPCT+this.scroll.PCT}%, white ${bigPCT+this.scroll.PCT}%)`;
				}else{
					this.result.Y=0;
					this.scroll.top=0;
					let bigPCT=this.result.Y/this.result.hideY*(100-this.scroll.PCT);
					this.$refs.scroll.style.transform=`translateY(${this.scroll.top}px)`;
					return this.$refs.scroll.style.background=`linear-gradient(to bottom,white ${bigPCT}%, #ccc ${bigPCT}%,#ccc ${bigPCT+this.scroll.PCT}%, white ${bigPCT+this.scroll.PCT}%)`;
				}
			}
		},
		init(){
			this.result.height=11;
			this.result.hideY=0;
			this.result.Y=0;
			this.scroll.height=0;
			return this.scroll.top=0;
		}
	},
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
			display: none;
            float: right;
            width: 4px;
			height: 300px;
            border: none;
			transition: 0.1s;
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
        li:nth-child(2) {
            border-top: black 1px solid;
        }
    }
}
</style>