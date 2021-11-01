import 	Vue 		from 'vue';
import	App 		from '@/app.vue';
import 	router 		from '@/router/router.js';
import 	'@/static/css/reset.css'
import "babel-polyfill"


new Vue({
	el: '#app',
	router,
	render: h => h(App),
	components: { App },
})