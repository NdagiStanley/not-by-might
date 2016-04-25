Vue.config.delimiters = ["[[", "]]"]

// For Register. This is our root page
var registerComponent = Vue.extend({
    template: '#register_form',
    // User object will let us check authentication status
    user: {
      authenticated: false
    },
    methods: {
        signUp: function() {
            console.log(this.$data.user);
            this.$http.post('/api/v1/auth/register/', this.$data.user).then(function(response) {
                // set data on vm
                this.$set('status',
                    response.status == '201' ? 'Signing you up' : 'ERROR');
                console.log(response.status);
                var login_details = {
                    username: this.$data.user.username,
                    password: this.$data.user.password
                };
                this.$http.post('/api/v1/auth/login/', login_details).then(function(response) {
                    localStorage.setItem('user', this.$data.user.username);
                    localStorage.setItem('id_token', response.data.token);
                    this.user.authenticated = true;
                    window.location.href = "http://localhost:8000/bucketlists/";
                  });
            })
        }
    }
})

var loginComponent = Vue.extend({
    template: '#login_form',
    user: {
      authenticated: false
    },
    methods: {
        signIn: function() {
            console.log(this.$data.user)
            this.$http.post('/api/v1/auth/login/', this.$data.user).then(function(response) {
                // set data on vm
                this.$set('status',
                          response.status == '200' ? 'Loginning you in' : 'ERROR');
                localStorage.setItem('user', this.$data.user.username);
                localStorage.setItem('id_token', response.data.token);
                this.user.authenticated = true;
                window.location.href = "http://localhost:8000/bucketlists/";
            })
        }
    }
})

new Vue({

    // We want to target the section with an id of 'app'
    el: '#app',

    components: {
        registerComponent,
        loginComponent
    }

});

// Tell Vue to use view-router
Vue.use(VueRouter)

// Router options
var router = new VueRouter({
    history: false,
    root: '/'
})

// Router map for defining components
router.map({

    '/': {
        component: registerComponent
    },

    '/login': {
        component: loginComponent
    }
});

// Redirect to the home route if any routes are unmatched
router.redirect({
    '*': '/'
});

var App = Vue.extend({})

router.start(App, '#app')
