<template>
    <div class="homepage">
        <ornament></ornament>
        <dayNew></dayNew>
    </div>
</template>

<script>
import ornament from './../ornament/ornament.vue';
import dayNew from './../dayNew/dayNew.vue';

export default {
    name:'homepage',
    components:{
        ornament,
        dayNew
    }
}
</script>

<style>

</style>