<template>
  <div class="cont">
    <div class="line"></div>
    <div class="subject"></div>
  </div>
</template>

<script>
export default {
    name:"cont",
    mounted(){
      return this.$el.style.height=window.innerHeight+"px";
    }
}
</script>

<style lang="scss" scoped>
  .cont{
    display: block;
    margin: 0 auto;
    width: 80%;
    .line{
      display: inline-block;
      width: 100%;
      border: #bbb 1px solid;
      margin: 8px 0;
    }
    .subject{
      display: inline-block;
      width: 90%;
      height: 97%;
      background: #009527;
    }
  }
</style>