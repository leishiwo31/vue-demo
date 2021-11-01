import Vue 			from 'vue'
import axios 	    from 'axios'


export default {
	name: 'index',
	data(){
		return {
			
		}
	},
	methods:{
		goNext(){
			this.$router.push('/invite')
		}
	},
	created() {
		
    }
}