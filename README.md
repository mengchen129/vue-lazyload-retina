# vue-lazyload-retina

在Vue项目中同时使用 [vue-lazyload](https://github.com/hilongjw/vue-lazyload) 和 [retinajs](https://github.com/imulus/retinajs)

## 安装
```
npm install vue-lazyload --save
npm install retinajs --save
```

## 配置
### 配置retina
```javascript
import retinajs from 'retinajs';
window.addEventListener('load', function () {
  retinajs();
});
```

### 配置lazyload
```javascript
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
  error: 'http://img.ishequ360.com/images/zg/default_goods.png',
  loading: 'http://img.ishequ360.com/images/zg/default_goods.png',
  attempt: 1
});
```

### 设置img标签
```html
<img v-lazy="imgUrl" data-rjs="2">
```

最终图片将按照如下顺序依次展示：

- lazyload配置的loading图
- imgUrl指向的1x图
- 执行window.onload...
- imgUrl对应的2x/3x图

即首次img加载时需要加载三张图片。测试过程中发现第二张图(1x)可能会加载两次，偶发，待研究。

## Hack
鉴于大多数设备的DPR至少为2了，加载1x图也没有必要，反而会增加一个http请求。可默认加载2x图，必要时加载3x图。在retina.js源码中，对源码做Hack：
```javascript
/**
 * Don't do anything if the cap is less than 2 or there is no src.
 *
 * HACK: 默认展示@2x图, 在data-rjs="3"且devicePixelRatio=3时加载@3x图。不再展示1x图
 * @User mengchen
 * @Date 2016-11-28
 */
if (src && cap == 3) {
  var newSrc = src.replace('@2x', '@3x');
  setSourceIfAvailable(image, newSrc);
}
```

这样需要在img标签中，配置 `v-lazy` 的值为@2x图的url地址及 `data-rjs` 设置为3.

## Retina的细节说明
* 检查所有包含 `data-rjs` 属性的img元素并判断是否加载高清图, 不包含 `data-rjs` 属性的将被忽略
* data-rjs的值可设置2或3，实际加载图片需根据设备像素比来定，两者求最小值。对应关系：
* `retinajs()` 执行的时候会扫描所有 `img` 元素，如果处理完毕，会将元素设置属性 `data-rjs-processed="true"` 下次将不再处理。因此每次有新图片创建时，需要重新调用retinajs函数，可将新的img元素传入参数
* 如果不设置img的宽高，则retina会自动给img设置 `width` 和 `height` 属性，它们的值为1倍图的尺寸，2倍图尺寸的一半，以此类推，即自动设置img为展示最佳效果的尺寸

## data-rjs 和 devicePixelRatio 对实际图片加载的控制

| data-rjs | devicePixelRatio | 加载图片 |
| --- | --- | --- |
| 2 | 2 | 2x |
| 2 | 3 | 2x |
| 3 | 2 | 2x |
| 3 | 3 | 3x |
