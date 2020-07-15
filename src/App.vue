<template>
    <div id="app">
        <m-header msg="Aiyou'blog" />
        <router-view></router-view>
        <player />
		<page-footer/>
    </div>
</template>

<script>
import Mheader from "./components/m-header/m-header.vue";
import player from "./components/player/player.vue";
import pageFooter from "./components/pageFooter/pageFooter.vue";

export default {
    name: "App",
    components: {
        "m-header": Mheader,
		player,
		'page-footer':pageFooter
    }
};
</script>

<style>
body {
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>

