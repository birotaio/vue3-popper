import component from '@/components/Popper.vue';

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default (() => {
  // Get component instance
  const installable = component;

  console.log('YOLO POPPERS');

  // Attach install function executed by Vue.use()
  installable.install = app => {
    app.component('Popper', installable);
  };
  return installable;
})();
