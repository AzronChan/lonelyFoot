<template>
    <div class="main">
        <van-uploader :after-read="onRead" class="vanUp">
            <!-- <van-icon name="photograph" /> 需要图片回显只能使用img后再用js把file.content的值传回-->
            <img src="https://b.yzcdn.cn/vant/icon-demo-1126.png" alt="上传图片" ref="goodsImg" style="width: 1rem;heigth: 1rem">
        </van-uploader>
        
        <van-cell-group>
        <van-field
            v-model="message"
            type="textarea"
            placeholder="请输入留言"
            rows="5"
        />
        </van-cell-group>
        <div>
            <van-tag>客家菜</van-tag>
            <van-tag>潮汕菜</van-tag>
            <van-icon name="plus" size='0.3rem' @click='showText' v-if="flagTwo"/>
            <input type="text" class="tagText" v-if="flagOne">
            <van-button size="mini" @click="textShow" v-if="flagOne">完成</van-button>
        </div>
        <van-rate v-model="value" class="vanRa"/>

    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            value: 5,
            flagOne: false,
            flagTwo: true
        }
    },
    methods: {
        onRead(file) {
            console.log(file)
            this.$refs.goodsImg.src = file.content;
            this.$refs.goodsImg.style.width = "100%";
            this.$refs.goodsImg.style.height = "auto";
        },
        showText() {
            this.flagTwo=!this.flagTwo
            this.flagOne=!this.flagOne
        },
        textShow() {
            this.flagOne=!this.flagOne
            this.flagTwo=!this.flagTwo
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    overflow-y: auto;
    overflow-x: hidden;
    height: auto;
    position: absolute;
    top: 61.33px;
    bottom: 50px;
    width: 100%;
}
.vanUp{
    width: 100%;
    height: 200px;
    border-top: 1px solid #ccc;
    border-bottom:1px solid #ccc;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.vanRa{
    margin-left: 10px;
}
.tagText{
    width: 99%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    border-top: none;
    border-left: none;
    border-right: none;
}
</style>


