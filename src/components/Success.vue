<template>
    <div class="mainDiv">
        <div class="text" v-if="isSuccess"><span style="font-size: x-large;">图片识别成功，识别结果为：<span style="color: blue;" >{{data}}</span></span></div>
        <div class="text" v-else><span style="font-size: x-large;">图片识别失败</span></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isSuccess:false,
            data:"Success"
        }
    },
    mounted(){
        this.isSuccess = this.$route.query.isSuccess
        this.data = this.$route.query.result
    }
}
</script>
<style>
.mainDiv{
    width: 100%;
    height: 300px;
    background-color: aquamarine;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>