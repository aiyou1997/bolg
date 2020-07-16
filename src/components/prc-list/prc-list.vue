<template>
	<ul class="prc-list" :style="style">
		<li v-for="(item,index) in list" :key="index">{{item}}</li>
	</ul>
</template>

<script>
export default {
	name:'prc-list',
	data(){
		return {
			style:{},
			list:[0,1,2,3,4,5,6,'7777777',8,9,]
		}
	},
	methods:{
		keepPosition() {
            this.y = window.scrollY;
            this.style = {
				transform:`translateY(${this.y}px)`
            };
        },
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