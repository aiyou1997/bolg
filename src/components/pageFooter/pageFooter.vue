<template>
	<div class="page-footer">
		此网站还未备案,非商业用途。
	</div>
</template>

<script>
export default {
	name:'page-footer',
}
</script>

<style lang='scss' scoped>
	.page-footer{
		margin: 28px auto;
		text-align: center;
	}
	.page-footer::before{
			content: '';
			display: block;
			margin: 20px auto;
			width: 70%;
			height: 2px;
			background: #ccc;
		}
</style>