# vue-photoswipe-plugin

使用方式：

1. 全局引入

   ```
   <link href="../dist/css/vue-photoswipe.min.css" rel="stylesheet">
   <script src="../dist/js/vue-photoswipe.min.js"></script>
   ```

   该方式会在vue的全局对象中增加photoSwipeOpen方法，调用该方法即可

   ```
   this.photoSwipeOpen(index, images);
   ```

2. Module引入

   ```
   import { vuePhotoSwipePlugin } from 'vue-photoSwipe-plugin';
   vuePhotoSwipePlugin.photoSwipeOpen(index, images);
   ```

参数： 

index: (必填)需要打开图片集合的第几张 

images: (必填)需要打开的图片集合 

options: (选填)插件的参数配置，具体可以参考：http://photoswipe.com/documentation/options.html 
