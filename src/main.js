import Vue from 'vue'
import App from './App.vue'
import retinajs from './vendor/retina';

import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad, {
  error: 'http://img.ishequ360.com/images/zg/default_goods.png',
  loading: 'http://img.ishequ360.com/images/zg/default_goods.png',
  attempt: 1
});

new Vue({
  el: '#app',
  render: h => h(App)
});

window.addEventListener('load', function () {
  console.log('window onload..');
  retinajs();
});

