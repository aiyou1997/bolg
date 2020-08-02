<template>
    <div class="about-me">
		<p>你好</p>
        <p>我叫陈楚楠</p>
		<p>熟悉并且理解原生js，对于es5和es6都有深刻的理解，并且会使用canvas。</p>
		<P>熟练掌握的主流框架是vue，虽然这个blog没有用到vuex，但是vuex我也是会的。</P>
		<p>熟练掌握的css框架是sass。</p>
		<p>熟练掌握的后端node。理解于http协议，和善于使用fs,express,request等等模块。</p>
		<p>熟练掌握mongoDB数据库的增删改查。</p>
		<p>熟练掌握git。</p>
		<p>关于网站</p>
		<p>网站使用了qq音乐的api，以及腾讯新闻的api。</p>
		<p>此页面仅用于面试，并不会用于任何商业用途。</p>
    </div>
</template>

<script>
export default {
    name:'aboutMe'
}
</script>

<style lang='scss' scoped>
	.about-me{
		width: 60%;
		margin: 20px auto;
		p{
			text-align: left;
		}
	}
</style>