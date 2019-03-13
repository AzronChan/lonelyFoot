<template>
    <div class="main">
        <!-- 上传图片区域 -->
        <van-uploader :after-read="onRead" class="vanUp">
            <!-- <van-icon name="photograph" /> 需要图片回显只能使用img后再用js把file.content的值传回-->
            <img src="https://b.yzcdn.cn/vant/icon-demo-1126.png" alt="上传图片" ref="goodsImg" style="width: 1rem;heigth: 1rem">
        </van-uploader>
        <!-- 展示图片区域 -->
        <div class="imgList" v-for="item in imgList" :key="item">
            <img :src="item" alt="">
        </div>
        <!-- 留言区域 -->
        <van-cell-group>
        <van-field
            v-model="message"
            type="textarea"
            placeholder="请输入留言"
            rows="5"
        />
        </van-cell-group>
        <!-- 标签区域 -->
        <div>
            <van-tag :class="[{'tagBg': item.bgColor},'vanTag']" plain v-for="(item, i) in tagList" :key="item.id" @click="checkTag(i)">{{ item.content }}</van-tag>
            <van-icon name="plus" size='0.3rem' @click='showText' v-if="flagTwo"/>
            <input type="text" class="tagText" v-if="flagOne" v-model="content" placeholder="输入印象" v-focus>
            <van-button size="mini" @click="textShow" v-if="flagOne">确定</van-button>
        </div>
        <!-- 评分区域 -->
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
            flagTwo: true,
            id: 1,
            tagList: [
                { id: 0, bgColor: false, content: '客家菜'}
            ],
            content: '',
            imgList: []
        }
    },
    methods: {
        onRead(file) {
            this.$refs.goodsImg.src = file.content;
            this.$refs.goodsImg.style.width = "auto"
            this.$refs.goodsImg.style.height = "auto"
            this.$refs.goodsImg.style.maxWidth = "100%"
            console.log(file.content)
            this.imgList.push(file.content)
        },
        showText() {
            this.flagTwo=!this.flagTwo
            this.flagOne=!this.flagOne
        },
        textShow() {
            this.flagOne=!this.flagOne
            this.flagTwo=!this.flagTwo
            if(this.content.trim().length === 0) {
                return this.$toast('不能为空')
            }else{
                var taglist = { id: this.id, bgColor: true, content: this.content }
                this.tagList.push(taglist)
                this.id++
                this.content = ''
            }
        },
        checkTag(i) {
            this.tagList[i].bgColor =!this.tagList[i].bgColor
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    overflow-y: auto;
    overflow-x: hidden;
    height: 10.8rem;
    .vanUp{
        width: 100%;
        height: 150px;
        border-top: 1px solid #ccc;
        border-bottom:1px solid #ccc;
        margin: 0 auto;
        display: flex;//flex布局
        justify-content: center;//使子项目水平居中
        align-items: center;//使子项目垂直居中
    }
    .imgList{
        height: 50px;
        width: (100%/9);
        border: 1px solid #ccc;
    }
    .vanRa{
        margin-left: 0.3rem;
    }
    .tagText{
        width: 75px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        display: inline-block;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 2px solid #ccc;
    }
    .vanTag{
        margin-left: 5px;
    }
    .tagBg{
        background: red!important;
    }
}
</style>


