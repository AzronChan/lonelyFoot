<template>
    <div class="record">
        <div class="mainImg">
            <!-- 展示图片区域 -->
            <van-swipe class="imgList" :autoplay="3000" indicator-color="white"  @change="onChange">
                <van-swipe-item v-for="item in $store.state.imgsList" :key="item.id">
                	<img class="goodsImg" :src="item.url" @click="clickImg()">
                </van-swipe-item>
            </van-swipe>
            <!-- 上传图片区域 -->
            <div class="record_handle">
            	<van-uploader :after-read="onRead" :class="['record_handle_item']">
	                <van-icon name="plus" class="iconSize"/>                
	            </van-uploader>
	            <!-- 删除图片区域 -->
	            <div :class="['record_handle_item']" v-if="$store.state.isUp">
	                <van-icon name="cross" class="iconSize" @click='deImg(swipeIndex)'/>
	            </div>
	            <!-- 图片管理区域 -->
	            <div :class="['record_handle_item']" v-if="$store.state.isUp">
	                <van-icon name="label-o" class="iconSize" @click="controlImg"/>
	                <!-- 如何实现点击这个图标的时候打开图片管理页面
	                1.通过把子组件放到弹层？
	                2.通过路由跳转打开？ -->
	            </div>
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
        <div class="mainTag">
            <van-tag :class="[{'tagBg': item.bgColor},'vanTag']" plain v-for="(item, i) in tagList" :key="item.id" @click="checkTag(i)">
                <transition>
                    <div class="tag" @click.stop="deleteTag(i)" v-if="item.isTag">
                        <div class="arrow">
                            <em></em><span></span>
                        </div>
                        删除
                    </div>
                </transition>
                {{ item.content }}
            </van-tag>
            <van-icon name="plus" size='0.3rem' @click='showText' v-if="flagTwo"/>
            <input type="text" class="tagText" v-if="flagOne" v-model="content" placeholder="输入菜系" v-focus @blur="textShow">
        </div>
        <!-- 评分区域 -->
        <van-rate v-model="value" class="vanRa"/>
    </div>
</template>

<script>
//导入图片预览组件
import { ImagePreview } from 'vant'

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
            tagLists: [],
            content: '',//标签的内容
            imgList: [],//存放图片
            isSelectImg: false,  //开启弹窗标志
            swipeIndex: '' //存放当前轮播图片的索引
        }
    },
    methods: {
        onRead(file) {
            // 控制图片上传上限为9张
            if(this.$store.state.imgsList.length <=9){
                // 把上传的图片存到vuex中,like是否置顶，url图片地址
                this.$store.state.imgsList.push({
                    like: false,
                    url: file.content
                })
                this.$store.state.imgView.push(file.content)
                // 当有图片上传后把删除和图片管理按钮放出来
                this.$store.state.isUp = true
            }else{
                 return this.$toast('只能上传9张图片')
            }
            
        },
        // 点击+图片时显示输入框同时隐藏+图标
        showText() {
            this.flagTwo=!this.flagTwo
            this.flagOne=!this.flagOne
        },
        // 当输入框失去焦点时触发
        textShow() {
            // 隐藏输入框同时显示+图标
            this.flagOne=!this.flagOne
            this.flagTwo=!this.flagTwo
            // 输入不能为空
            if(this.content.trim().length === 0) {
                return this.$toast('不能为空')
            }else{
                var taglist = { id: this.id, bgColor: false, content: this.content, isTag: false, }
                this.tagList.push(taglist)
                this.id++
                this.content = ''
            }
        },
        // 点击标签时触发
        checkTag(i) {
            // 改变背景颜色，并显示删除按钮
            this.tagList[i].bgColor =!this.tagList[i].bgColor
            this.tagList[i].isTag =!this.tagList[i].isTag
            // 循环当前标签数组，把当前下标之外的其它元素存到另一个空数组中
            this.tagList.forEach(item => {
                if(this.tagList[i].bgColor == item.bgColor){
                    this.tagLists = this.tagList.filter((v, j) => j !== i)
                }
            })
            // 把这个数组中的颜色取消，删除按钮隐藏
            this.tagLists.forEach(item => {
                item.bgColor = false
                item.isTag = false
            })
        },
        // 删除当前点击的标签
        deleteTag(i){
            this.tagList.splice(i,1)
        },
        // 轮播图发生变化时，把当前下标存起来
        onChange(index) {
            this.swipeIndex = index
        },
        // 点击图片进入预览模式
        clickImg() {
            ImagePreview(this.$store.state.imgView)
        },
        // 删除当前图片
        deImg(i) {
            this.$store.commit('deleteImg', i)         
        },
        // 进入图片管理页面
        controlImg() {
            this.$router.push('/controlImg')
        }
    },
    directives: {
        // 自定义一个获取焦点事件
        'focus': {
            inserted: (el => {
                el.focus();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.record{
    .mainImg{
        position: relative;
        width: 100%;
        height: 6.3rem;
        background: #ededed;
        .imgList{
            width: 100%;
            height:6.3rem;
            .goodsImg{
            	position: absolute;
            	top: 50%;
            	left: 0;
            	transform: translate(0,-50%);
                width: auto;
                height: auto;
                max-width: 100%;
            }          
        }
        .record_handle {
        	position: absolute;
        	display: flex;
        	justify-content: center;
        	width: 100%;
        	top: 50%;
        	left: 0px;
        	transform: translate(0,-50%);
        	.record_handle_item{
	            width: 1.6rem;
	            height: 1.6rem;
	            margin: 0 auto;
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            background: rgba(0,0,0,0.2);
	            overflow: hidden;
	        }
        }
        .iconSize{
            font-size: 0.5rem;
            color: #fff;
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
    .mainTag{
        padding: 0 0.3rem;
        .vanTag{
            margin-left: 0.1rem;
            position: relative;
            .tag{ 
                width:0.9rem; 
                height:0.4rem; 
                line-height: 0.4rem;
                border:0.05rem solid #292929; 
                color: #FFF;
                position: absolute;; 
                background-color:#292929;
                text-align: center;
                top: -0.6rem;
                left: 0.01rem;
                border-radius: 5px;
                .arrow{ 
                    position:absolute; 
                    width:0.2rem; 
                    height:0.2rem; 
                    bottom:-0.2rem; 
                    left:0.22rem;
                    *{ 
                        display:block; 
                        border-width:0.2rem; 
                        position:absolute; 
                        border-style:solid dashed dashed dashed; 
                        font-size:0; 
                        line-height:0; 
                    }
                    em{ 
                        border-color:#292929 transparent transparent;
                    }
                    span{ 
                        border-color:#292929 transparent transparent; 
                        top:-0.05rem;
                    }
                }
            }       
        }
        .tagBg{
            background: #292929!important;
            color: #fff!important;
        }
        .v-enter,
        .v-leave-to{
            opacity: 0;
            transform: translateY(0.5rem);
        }
        .v-enter-active,
        .v-leave-active{
            transition: all 1s ease;
        }
    } 
}
</style>


