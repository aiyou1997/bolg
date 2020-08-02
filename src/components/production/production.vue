<template>
    <div class="production" ref="production">
        <prc-list @getIndex="getIndex" />
		<prc-cont v-bind:index='index' />
    </div>
</template>

<script>
import prcList from './../prc-list/prc-list.vue';
import prcCont from './../prc-cont/prc-cont.vue';

export default {
	name:'production',
	data(){
		return {
			index:0
		}
	},
	methods:{
		getIndex(index){
			this.index=index;
		}
	},
	components:{
		'prc-list':prcList,
		'prc-cont':prcCont
	},
	mounted(){
		this.$refs.production.style.height=window.innerHeight+'px';
	}
}
</script>

<style lang="scss" scoped>
	.production{
		margin: 46px auto;
		width: 92%;
		text-align: right;
	}
</style>