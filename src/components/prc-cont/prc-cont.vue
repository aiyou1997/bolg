<template>
    <div class="prc-cont" ref="prc_cont" @click="text">
        <object :data="list[index].src" frameborder="0"></object>
    </div>
</template>

<script>

export default {
    name: "prc-cont",
    data() {
        return {
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
			}],
			Index:0
        };
	},
    methods: {
		text(){
			console.log(this.Index)
		}
	},
	props:['index'],
    mounted() {
        this.$refs.prc_cont.style.height = window.innerHeight - 40 + "px";
    },
    updated() {
    }
};
</script>

<style lang="scss" scoped>
.prc-cont {
    display: inline-block;
    width: 82%;
    margin: 20px 36px 20px 0;
    border: #000 2px dotted;
    object {
        width: 100%;
        height: 100%;
    }
}
</style>