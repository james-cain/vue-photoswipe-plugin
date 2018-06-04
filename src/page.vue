<template>
  <div class="page" :style="{zIndex}"  >
    <div class="page-content" :class="css">
      <slot></slot>
    </div>
    <transition :name="'router-'+effectName" @leave="leave" @enter="enter">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
const TAG = 'v-page';
// 默认的切换效果
const DEFAULT_EFFECT='fade';
// 动画切换配置
const transitionConfigs = {
  fade: { // 淡入淡出 
  },
  slid: { // 滑入 
    parentAnimateCss: 'slid', // 指定父动画的样式名
  },
};
export default {
  name: TAG,
  props: {
    initZIndex: Number, // 自定义Zindex
    effect: { // 切换效果，目前支持 slid,fade 两种
      type: String,
      default: '',
    },
  },
  data() {
    let effectName = this.getEffect();  
    let transitionConfig = transitionConfigs[effectName] ;
    // 如果使用了不支持的效果，则使用默认的效果
    if(! transitionConfig ){
      effectName = DEFAULT_EFFECT;
      transitionConfig = transitionConfigs[DEFAULT_EFFECT];
    } 
    return {
      css: [],
      effectName,
      transitionConfig ,
      zIndex: this.initZIndex || this.makeZIndex(),
    }; 
  },
  methods: {
    leave() {
      if (this.transitionConfig && this.transitionConfig.parentAnimateCss) {
        this.css = [];
      }
    },
    enter() {
      if (this.transitionConfig && this.transitionConfig.parentAnimateCss) {
        this.css.push(this.transitionConfig.parentAnimateCss);
      }
    },
    makeZIndex() {
      const p = this.findParent();
      return p && p.zIndex >= 0 ? p.zIndex + 1 : 1;
    },
    findParent() { //获取父v-page
      for (let t = this.$parent; t; t = t.$parent) {
        if (t.$vnode && t.$vnode.componentOptions && t.$vnode.componentOptions.tag === TAG) {
          return t;
        }
      }
      return null;
    }, 
    getEffect(){ //获取当前的效果
      if(this.effect){
        return this.effect;
      }      
      // 如果没有设置效果，则继承父组件的效果
      const p = this.findParent() ;
      return p && p.effectName ? p.effectName : DEFAULT_EFFECT;
    }
  }, 
};
</script>

<style lang="less">
/* 路由动画start */
.router-slid-enter-active, .router-slid-leave-active {
  transition: all .4s;
}
.router-slid-enter ,.router-slid-leave-active  {
  transform: translate3d(100%, 0, 0);
}
.router-fade-enter-active, .router-fade-leave-active {
  transition: all .4s;
}
.router-fade-enter, .router-fade-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
/* 路由动画end */
</style>

<style lang="less" scoped>
.page-content{
  height: 100%;
  left: 0;
  top:0;
  position: absolute;
  width: 100%;
  transition: all .4s;
}
.page{
  height: 100%;
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
 }
.slid {
  transform: translate3d(-20%, 0, 0);
}
</style>
