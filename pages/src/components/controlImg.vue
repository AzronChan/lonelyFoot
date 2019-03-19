<template>
    <div class="conten">
        <draggable
         v-model="$store.state.imgsList"
         :options="{animation:300,scroll:true,scrollSensitivity:30}" 
         @end="datadragEnd" 
         handle=".handle"
        >
            <div class="conten_img"  v-for="(item, i) in $store.state.imgsList" :key="item.id">
                <!-- 图片缩略图 -->
                <div class="param_img">
                    <img :src="item.url"/>
                    <!-- <vueCropper
                    ref="cropper"
                    :img="item.url"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    ></vueCropper> -->
                </div>
                <!-- 设置为封面 -->
                <div class="like_img">
                    <van-icon :name="item.like?'like':'like-o'" class="van_icon" @click="checkLike(i)" />
                </div>
                <!-- 删除图片 -->
                <div class="de_img">
                    <van-icon name="delete" class="van_icon" @click="deImg(i)" />
                </div>
                <!-- 上下拖动 -->
                <div class="exchange_img">
                    <van-icon name="exchange" class="van_icon handle" />
                </div>
            </div> 
        </draggable>
    </div>
</template>

<script>
//引入拖拽组件
import draggable from 'vuedraggable'

//引入图片编辑组件
import { VueCropper }  from 'vue-cropper'
export default {
    data() {
        return {
            likeList: [], //存放非置顶数组
            // option: {//图片编辑的配置项
            //     img: '',
            //     outputSize:1, //剪切后的图片质量（0.1-1）
            //     full: false,//输出原图比例截图 props名full
            //     outputType: 'png',
            //     canMove: true, 
            //     original: false, 
            //     canMoveBox: true, 
            //     autoCrop: true, 
            //     autoCropWidth: 150, 
            //     autoCropHeight: 150, 
            //     fixedBox: true 
            // }
        }
    },
    methods: {
        // 更替图标
        checkLike(i) {
            const imgsList = this.$store.state.imgsList
            for(let j = 0;j < imgsList.length; j++){
                if(i == j){
                    imgsList[j].like = !imgsList[j].like //通过循环匹配到需要改变图标的数组
                    this.likeList = imgsList.filter((v, j) => j !== i) //把其它的数组放到另一个数组中便于操作
                }
            }
            this.likeList.forEach(item => {
                item.like = false
            })
        },
        // 调用vuex中的删除图片方法，传当前索引过去
        deImg(i) {
            this.$store.commit('deleteImg', i)
        },
        datadragEnd() { //拖拽完成后重新定义预览图片顺序
            this.$store.state.imgView.length = 0 // 清空预览中的图片              
            this.$store.state.imgsList.forEach(item => {
                this.$store.state.imgView.push(item.url) // 把最新的数组图片放到预览数组中
            })
        }
    },
    components: {
        //调用组件
        draggable,
        VueCropper
    }
}
</script>

<style lang="scss" scoped>
.conten_img{
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    border-bottom: 1px solid #c9c9c9;
    .param_img{
        height: 1.88rem;
        display: flex;
        align-items: center;
        img{
            width: 3rem;
        }
    }
    .van_icon{
        font-size: 0.5rem;
    }
}
</style>


