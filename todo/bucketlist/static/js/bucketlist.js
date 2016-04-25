Vue.config.delimiters = ["[[", "]]"]
new Vue({
    // We want to target the div with an id of 'bucketlists'
    el: 'body',

    // Here we can register any values or collections that hold data
    // for the application
    data: {
        bucketlist: { name: '' },
        bucketlists: [],
        user: ''
    },

    // Anything within the ready function will run when the application loads
    ready: function() {
        // When the application loads, we want to call the method that initializes
        // some data
        this.fetchUserDetails();
        this.fetchBucketlists();
    },

    // Methods we want to use in our application are registered here
    methods: {

        fetchUserDetails: function() {
            // $set is a convenience method provided by Vue
            this.$set('username', localStorage.getItem('user'));
            this.$set('token', localStorage.getItem('id_token'));
        },

        // We dedicate a method to retrieving and setting some data
        fetchBucketlists: function() {
            Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
            this.$http.get('http://localhost:8000/api/v1/bucketlists/').then(function (response) {
                    console.log(response.data.results);
                    this.$set('auth', true);
                    this.$set('bucketlists', response.data.results);
                }, function (response) {
                    console.log(response.status);
                    this.$set('auth', false);
                    window.location.href = "http://localhost:8000/404/";
                });
        },

        // Adds a bucketlist
        addBucketlist: function() {
            if (this.bucketlist.name) {
                this.bucketlists.push(this.bucketlist);
                this.bucketlist = { name: '' };
            }
        }
    }
});
