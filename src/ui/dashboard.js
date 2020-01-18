import Feed from './components/Feed';
import Vue from 'vue';

window.addEventListener('load', () => {
    setTimeout(() => {
        const View = Vue.extend(Feed);
        (new View()).$mount('#app');
    }, 50);

})


