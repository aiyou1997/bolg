<template>
  <div class="ornament">
    <div class="sky">
      <div class="text"><span>aiyou's blog</span></div>
      <div class="time">{{hours}}:{{minutes}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ornament",
  data:function(){
    return{
      hours:'12',
      minutes:'00',
    }
  },
  methods:{
    getTime(){
      let time=new Date;
      return (this.hours=time.getHours(),this.minutes=(time.getMinutes()<10)?('0'+time.getMinutes()):time.getMinutes());
    }
  },
  created(){
    this.getTime();
    setInterval(this.getTime,5000)
  }
};
</script>

<style lang="scss" scoped>
.ornament {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
  .sky {
    width: 85%;
    background: url(../../common/images/sky.jpg) no-repeat;
    // background-position: center;
    background-size: auto 400px;
  }
  .text{
    float: left;
    margin: 26px 0 0 40px;
    font-size: 36px;
  }
  .time{
    float: left;
    clear: left;
    margin: 40px 0 0 40px;
    font-size: 54px;
  }
}
</style>