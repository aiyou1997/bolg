<template>
    <div class="production" ref="production">
        <prc-list/>
		<prc-cont/>
    </div>
</template>

<script>
import prcList from './../prc-list/prc-list.vue';
import prcCont from './../prc-cont/prc-cont.vue';

export default {
	name:'production',
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