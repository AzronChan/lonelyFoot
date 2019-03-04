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
    height: 10.8rem;
}
.vanUp{
    width: 100%;
    height: 5rem;
    border-top: 1px solid #ccc;
    border-bottom:1px solid #ccc;
    margin: 0 auto;
    display: flex;//flex布局
    justify-content: center;//使子项目水平居中
    align-items: center;//使子项目垂直居中
}
.vanRa{
    margin-left: 0.3rem;
}
.tagText{
    width: 99%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.4rem;
}
</style>


