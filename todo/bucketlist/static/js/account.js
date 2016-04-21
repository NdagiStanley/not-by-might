Vue.config.delimiters = ["[[", "]]"]


// For Register. This is our root page
var registerComponent = Vue.extend({
    template: '<h2 class="section-heading">Register</h2>' +
      '<div id="register">' +
        '<div class="alert alert-danger" v-if="status.error">Some error message</div>' +
        '<form name="signup" id="Account">' +
        '<div class="row">' +
          '<div class="form-group">' +
            '<input type="text" class="form-control" placeholder="Your username *" id="name" required data-validation-required-message="Please enter your name." v-model="user.username">' +
            '<p class="help-block text-danger"></p>' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address." v-model="user.email">' +
            '<p class="help-block text-danger"></p>' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control" placeholder="Password *" id="password" required data-validation-required-message="Please enter the password you are to use." v-model="user.password">' +
            '<p class="help-block text-danger"></p>' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control" placeholder="Confirm Password *" id="password" required data-validation-required-message="Please confirm the password you entered." v-model="user.conf_password">' +
            '<p class="help-block text-danger"></p>' +
          '</div>' +
          '<div>' +
            '<div id="success"></div>' +
            '<button type="submit" class="btn btn-xl" v-on="click: signUp">Sign Up</button>' +
          '</div>' +
        '</div>' +
        '</form>' +
      '</div>' +
      '<br >' +
      '<p>Already, having an account?</p>' +
      '<h4> <a v-link="{ path: \'/login\' }">Login</a></h4>'
})

new Vue({

    // We want to target the div with an id of 'Register'
    el: '#register',

    data: {
        user: {username: '', password: '', conf_password: '', email: '' },
        users: [],
        status: {
          success: false,
          error: false
        }
    },

    // Anything within the ready function will run when the application loads
    ready: function() {},

    // Methods we want to use in our application are registered here
    methods: {
        signUp: function() {
            console.log('Hello');
            this.$http.post('/api/vi/auth/register', user).then(function(response) {
              console.log(this.status)
              this.status.success = true;
              console.log("Yei");
              // Redirect
            }, function() {
              this.status.error = true;
            })
            // this.$http.post('/api/v1/auth/register/', user).success(function() {
            //   // show success
            //   html = "<div class='alert alert-success' role='alert'>Sign up successful.</div>";
            //   $("#signUpMessage").html(html);
            // })

            console.log("Anyone?");
            if (this.user.username) {
                console.log("Get in here");
                this.users.push(this.user);
                this.user = { username: '', email: '', password: '', conf_password: '' };
            }
        }
    }
});


// Login page content
var loginComponent = Vue.extend({
    template: '<h2 class="section-heading">Login</h2>' +
      '<div id="login">' +
        '<form name="signup" id="Account">' +
        '<div class="row">' +
          '<div class="form-group">' +
            '<input type="text" class="form-control" placeholder="Your username *" id="name" required data-validation-required-message="Please enter your username." v-model="user.username">' +
            '<p class="help-block text-danger"></p>' +
          '</div>' +
          '<div class="form-group">' +
            '<input type="password" class="form-control" placeholder="Password *" id="password" required data-validation-required-message="Please enter your password." v-model="user.password">' +
            '<p class="help-block text-danger"></p>' +
          '</div>' +
          '<div>' +
            '<div id="success"></div>' +
            '<button type="submit" class="btn btn-xl" v-on="click: signIn">Login</button>' +
          '</div>' +
        '</div>' +
        '</form>' +
      '</div>' +
      '<br >' +
      '<p>You don\'t have an account?</p>' +
      '<h4><a v-link="{ path: \'/\' }">Register</a> </h4>'
})

new Vue({

    // We want to target the div with an id of 'Login'
    el: '#login',

    data: {
        user: { username: '', password: '' },
        users: []
    },

    ready: function() {},

    methods: {
        signIn: function() {
            // this.$http.post('/api/v1/auth/login/').success(function() {
            //   // show success
            //   html = "<div class='alert alert-success' role='alert'>Logging in you in...</div>";
            //   $("#signInMessage").html(html);
            if (this.user.username) {
                this.users.push(this.user);
                console.log(this.user)
                this.user = { username: '', password: '' };
            }
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


var App = Vue.extend()

router.start(App, '#account')
