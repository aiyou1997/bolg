<template>
	<ul class="prc-list" :style="style">
		<li v-for="(item,index) in list" :key="index" @click="change(index)">{{item.name}}</li>
	</ul>
</template>

<script>
export default {
	name:'prc-list',
	data(){
		return {
			style:{},
			list:[{
				name:'轮播图',
				src:'/cases/carousel/carousel.html'
			},{
				name:'canvas播放器',
				src:'/cases/player/player.html'
			},{
				name:'canvas动画',
				src:'/cases/canvasAnimation/canvasAnimation.html'
			},{
				name:'飞机大战',
				src:'/cases/planeWar/link.html'
			}]
		}
	},
	methods:{
		keepPosition() {
            this.y = window.scrollY;
            this.style = {
				transform:`translateY(${this.y}px)`
            };
		},
		change(index){
			this.$emit('getIndex',index)
		}
	},
	mounted(){
		window.addEventListener("scroll", this.keepPosition);
	}
}
</script>

<style lang="scss" scoped>
	ul{
		float: left;
		margin: 86px 0 0 36px;
		padding: 0;
		border: black 1px solid;
		border-bottom: none;
		list-style: none;
		text-align: center;
		li{
			display:block;
			padding: 4px;
			border-bottom: black 1px solid;
		}
	}
</style>