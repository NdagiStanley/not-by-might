Vue.config.delimiters = ["[[", "]]"]

// For Register. This is our root page
var registerComponent = Vue.extend({
    template: '#register_form',
    methods: {
        signUp: function() {
            console.log(this.$data.user);
            this.$http.post('/api/v1/auth/register/', this.$data.user).then(function(response) {
                            this.$set('status',
                                      response.status == '201' ? 'Signing you up' : 'ERROR');
                            console.log(response.status);
                        })
        }
    }
})

var loginComponent = Vue.extend({
            template: '#login_form',
            methods: {
                signIn: function() {
                    console.log(this.$data.user)
                    this.$http.post('/api/v1/auth/login/', this.$data.user).then(function(response) {
                            // get status
                            response.status;

                            // get all headers
                            response.headers();

                            // get 'expires' header
                            response.headers('expires');

                            // set data on vm
                            this.$set('status',
                                      response.status == '200' ? 'Loginning you in' : 'ERROR');
                            console.log(response.data.token);
                            // localStorage.setItem('token': response.data.token);
                        })
                    }
                }
            })

        new Vue({

            // We want to target the div with an id of 'Register'
            el: '#app',

            components: {
                registerComponent,
                loginComponent
            },

            data: {
                user: { username: 'abc', password: 'abc', confirm_password: '', email: '' },
                users: []
            },

            ready: function() {},

            methods: {
                validate: function() {
                    alert('Signing in');
                },
                signUp: function() {
                    console.log(user)
                    alert('Signing in');
                },

                signIn: function(user) {
                    console.log(user)
                }
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
        })

        var App = Vue.extend({})

        router.start(App, '#app')
