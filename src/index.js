import Vue from 'vue';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeDefaultUI from 'photoswipe/dist/photoswipe-ui-default';
import VuePhotoswipe from './VuePhotoswipe';

let instance;

function photoSwipeOpen(index, items, opts) {
  if (!instance) {
    const Vp = window.Vue ? window.Vue.extend(VuePhotoswipe) : Vue.extend(VuePhotoswipe);
    instance = new Vp({
      el: document.createElement('div'),
    });
    document.body.appendChild(instance.$el);
  }
  const pswpElement = document.querySelectorAll('.pswp')[0];
  const options = {
    fullscreenEl: false,
    shareEl: false,
    tapToClose: true,
    history: false,
    focus: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0,
    maxSpreadZoom: 5,
    index,
  };
  const obj = Object.assign(options, opts);
  const gallery = new PhotoSwipe(pswpElement, PhotoSwipeDefaultUI, items, obj);
  gallery.init();
}

export default {
  photoSwipeOpen,
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.prototype.photoSwipeOpen = photoSwipeOpen;
}
