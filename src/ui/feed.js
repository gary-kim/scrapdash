import Feed from "./components/Feed";
import Vue from 'vue';
import VueMaterial from "vue-material";
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css'

window.addEventListener('load', () => {
    Vue.use(VueMaterial);
    const View = Vue.extend(Feed);
    (new View()).$mount('#app');
});


