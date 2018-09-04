Vue.config.delimiters = ["[[", "]]"]
new Vue({

    // We want to target the section with an id of 'app'
    el: '#app',

    data: {
        user: { username: '', email: '', password: '', confirm_password: '' },
        status_error: '',
        status: ''
    },

    components: {
        registerComponent,
        loginComponent
    }

});

// For Register. This is our root page
var registerComponent = Vue.extend({
    template: '#register_form',
    methods: {
        signUp: function() {
            // Post on Register endpoint in DRF
            this.$http.post('/api/v1/auth/register/', this.$data.user).then(function(response) {
                this.$set('status', 'Signing you up');
                this.$http.post('/api/v1/auth/login/', { username: this.$data.user.username, password: this.$data.user.password }).then(function(response) {
                    localStorage.setItem('id_token', response.data.token);
                    localStorage.setItem('username', this.$data.user.username);
                    this.$set('status', 'Signing you in');
                    setTimeout(function() {
                        window.location.assign("/bucketlists/")
                    }, 1000);
                });
            }, function(response) {
                this.$set('status_error', 'That username already exists');
                setTimeout(function() {
                    window.location.assign("/account/")
                }, 1000);
            })
        }
    }
})

var loginComponent = Vue.extend({
    template: '#login_form',
    methods: {
        signIn: function() {
            this.$http.post('/api/v1/auth/login/', this.$data.user).then(function(response) {
                // Set status
                this.$set('status', 'Logging you in');
                localStorage.setItem('id_token', response.data.token);
                localStorage.setItem('username', this.$data.user.username);
                setTimeout(function() {
                    window.location.assign("../bucketlists/")
                }, 1000);
            }, function(response) {
                this.$set('status_error', 'Incorrect username / password');
                setTimeout(function() {
                    window.location.assign("/account/")
                }, 1000);
            })
        }
    }
})

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
