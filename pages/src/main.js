import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

//定义一个全局的指令，用于获取焦点
Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
    }
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});