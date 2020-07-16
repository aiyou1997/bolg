<template>
	<div class="prc-cont" ref="prc_cont"></div>
</template>

<script>
export default {
	name:'prc-cont',
	mounted(){
		this.$refs.prc_cont.style.height=(window.innerHeight-40)+'px';
	}
}
</script>

<style lang="scss" scoped>
	.prc-cont{
		display: inline-block;
		width: 80%;
		margin: 20px 36px 20px 0;
		border: #000 2px dotted;
	}
</style>