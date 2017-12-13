/*
	Vue.js code
*/

Vue.use(Vuetify)

Vue.directive('vpshow', {
  inViewport (el) {
    var rect = el.getBoundingClientRect()
    return !(rect.bottom < 0 || rect.right < 0 || 
             rect.left > window.innerWidth ||
             rect.top > window.innerHeight)
  },
  
  bind(el, binding) {
    el.$onScroll = function() {
      if (binding.def.inViewport(el)) {
        document.getElementById('header').classList.add('reveal')
        document.getElementById('header').classList.remove('alt')
        binding.def.unbind(el, binding)        
      }
    }
    document.addEventListener('scroll', el.$onScroll)
  },
  
  inserted(el, binding) {
    el.$onScroll()  
  },
  
  unbind(el, binding) {    
    document.removeEventListener('scroll', el.$onScroll)
    delete el.$onScroll
  }  
});

var app = new Vue({
	el: '#app',
	data: {
    loading: true,
	  posts: [
    ],
    stats: {
      loading: true
    }
  },
	created () {
		var m = this
		axios.get('https://hollanio.azurewebsites.net/api/GetMediumPosts')
		  .then(function (response) {
			  m.posts = response.data.posts
			  m.loading = false
      })
    axios.get('https://hollanio.azurewebsites.net/api/GetStats')
      .then(function(response) {
        m.stats.saved = response.data.saved
        m.stats.loading = false
      })
	  }
  });
