import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//导入弹出框组件
import { Dialog } from 'vant'

export default new Vuex.Store({
    state: {
        imgsList: [], //存放发布页面中的轮播图
        imgView: [], //存放预览中的图片
        isUp: false //定义是否上传了图片
    },
    mutations: {
        deleteImg(state, i) {
            Dialog.confirm({
                message: '确认删除图片？'
            }).then(() => {
                state.imgsList.splice(i, 1) // 删除对应索引的数组            
                state.imgView.length = 0 // 清空预览中的图片              
                state.imgsList.forEach(item => {
                    state.imgView.push(item.url) // 把最新的数组图片放到预览数组中
                })
                if (state.imgsList.length == 0) {
                    state.isUp = false
                }
            }).catch(() => {
                // on cancel
            })
        }
    },
    actions: {
        /*
         * 获取职位列表
         */
    },
    modules: {

    }
})