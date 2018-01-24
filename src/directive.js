import Vue from 'vue';
Vue.directive('focus', 
  function (el,binding) {
    if(binding.value){
      el.focus()
    }
})