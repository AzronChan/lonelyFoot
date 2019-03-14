<template>
    <div class="main">
        <div class="mainImg">
            <!-- 展示图片区域 -->
            <van-swipe class="imgList" :autoplay="3000" indicator-color="white"  @change="onChange">
                <van-swipe-item v-for="item in imgList"><img class="goodsImg" :src="item" @click="clickImg()"></van-swipe-item>
            </van-swipe>
            <!-- 上传图片区域 -->
            <van-uploader :after-read="onRead" :class="isUp?'vanPlus':'vanUp'">
                <van-icon name="plus" class="iconSize"/>                
                <!-- 需要图片回显只能使用img后再用js把file.content的值传回 -->
                <!-- <img src="https://b.yzcdn.cn/vant/icon-demo-1126.png" alt="上传图片" style="width: 1rem;heigth: 1rem"> -->
            </van-uploader>
            <!-- 删除图片区域 -->
            <div :class="isUp?'vanCross':''" v-if="isUp">
                <van-icon name="cross" class="iconSize" @click='deleteImg(swipeIndex)'/>
            </div>
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
//导入图片预览组件
import { ImagePreview } from 'vant'
//导入弹出框组件
import { Dialog } from 'vant' 
export default {
    data() {
        return {
            message: '',//留言的内容
            value: 5,//设置评分显示几个星
            flagOne: false, //控制新增标签的标志
            flagTwo: true,  //控制新增标签的标志
            id: 1,  //模拟的标签id号，真实中直接获取
            tagList: [//存放标签，自动显示一个标签
                { id: 0, bgColor: false, content: '客家菜'}
            ],
            content: '',//标签的内容
            imgList: [],//存放图片
            isSelectImg: false,  //开启弹窗标志
            isUp: false, //定义是否上传了图片
            swipeIndex: '' //存放当前轮播图片的索引

        }
    },
    methods: {
        onRead(file) {
            // 把上传的图片存起来
            if(this.imgList.length <=9){
                this.imgList.push(file.content)
                this.isUp = true
            }else{
                 return this.$toast('只能上传9张图片')
            }
            
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
        },
        onChange(index) {
            this.swipeIndex = index;
        },
        clickImg() {
            ImagePreview(this.imgList);
        },
        deleteImg(index) {
            Dialog.confirm({
                message: '确认删除图片？'
            }).then(() => {
                this.imgList.splice(index,1);
                if(this.imgList.length == 0){
                    this.isUp = false
                }
            }).catch(() => {
            // on cancel
            });
            
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    overflow-y: auto;
    overflow-x: hidden;
    height: 10.8rem;
    .mainImg{
        display: flex;//flex布局
        justify-content: center;//使子项目水平居中
        align-items: center;//使子项目垂直居中
        position: relative;
        border: 1px solid #ccc;
        width: 100%;
        height: 4rem;
        .imgList{
            width: 100%;
            height: 4rem;
            .goodsImg{
                width: auto;
                height: auto;
                max-width: 100%;
            }          
        }
        .vanUp{
            width: 1rem;
            height: 1rem;
            margin: 0 auto;
            border: 1px solid #ccc;
            position: absolute;
            display: flex;//flex布局
            justify-content: center;//使子项目水平居中
            align-items: center;//使子项目垂直居中
            background: #ccc;
            opacity: 0.5;
            font-size: 0.24rem;
        }
        .iconSize{
            font-size: 0.5rem;
        }
        .vanPlus{
            @extend .vanUp;
            left: 2rem;
        }
        .vanCross{
            @extend .vanUp;
            right: 2rem;
        }
    }   
    .vanRa{
        margin-left: 0.3rem;
    }
    .tagText{
        width: 1.5rem;
        height: 0.32rem;
        line-height: 0.32rem;
        font-size: 0.24rem;
        display: inline-block;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 2px solid #ccc;
    }
    .vanTag{
        margin-left: 0.1rem;
    }
    .tagBg{
        background: red!important;
    }
}
</style>


