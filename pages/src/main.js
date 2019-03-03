// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//import { Button,Cell,Field,List,CellGroup,Popup,Dialog,Toast,PasswordInput,NumberKeyboard,NavBar,RadioGroup,Radio,Actionsheet,DatetimePicker,Tabbar,TabbarItem,Icon,Tab,Tabs,  Collapse, CollapseItem ,Uploader} from 'vant';
//Vue.use(Button).use(Cell).use(Field).use(CellGroup).use(Popup).use(Dialog).use(Toast).use(PasswordInput).use(NumberKeyboard).use(NavBar).use(RadioGroup).use(Radio).use(Actionsheet).use(DatetimePicker).use(Tabbar).use(TabbarItem).use(Icon).use(Tab).use(Tabs).use(Collapse).use(CollapseItem).use(Uploader);


//Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
