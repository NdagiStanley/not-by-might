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

    // Methods to be used in the application are registered here
    methods: {

        fetchUserDetails: function() {
            // $set is a convenience method provided by Vue
            this.$set('username', localStorage.getItem('username'));
            this.$set('token', localStorage.getItem('id_token'));
        },

        // A method dedicated to retrieving and setting some data
        fetchBucketlists: function() {
            Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
            this.$http.get('/api/v1/bucketlists/').then(function(response) {
                this.$set('bucketlists', response.data.results);
            }, function(response) {
                window.location.assign("/404/");
            });
        },

        // Adds a bucketlist
        addBucketlist: function() {
            if (this.bucketlist.name) {
                this.$set('status_error', '');
                var bucketlist = {
                    name: this.bucketlist.name,
                    created_by: localStorage.getItem('username')
                };
                this.$http.post('/api/v1/bucketlists/', bucketlist).then(function(response) {
                    this.bucketlists.push(this.bucketlist);
                    this.$set('status', 'Bucketlist added');
                    setTimeout(function() {
                        window.location.assign("/bucketlists/")
                    }, 500);
                    this.bucketlist = { name: '' };
                });
            } else {
                this.$set('status_error', 'You have not entered any name');
            }
        },

        // Updates a bucketlist
        updateBucketlist: function(id, list_id) {
            this.$http.put('/api/v1/bucketlists/' + list_id,
                {name: this.updated}).then(function(response) {
                    this.$set('bucketlist', this.updated);
            });
            window.location.assign("/bucketlists/");
        },

        // Deletes a bucketlist
        deleteBucketlist: function(id, list_id) {
            if(confirm("Are you sure you want to delete this bucketlist?")) {
                this.$http.delete('/api/v1/bucketlists/' + list_id).then(function(response) {
                    this.bucketlists.$remove(id);
                });
                window.location.assign("/bucketlists/");
            }
        },

        goToItem: function(list) {
            localStorage.setItem('list', list.id);
        },

        logOut: function() {
            localStorage.setItem('id_token', '');
        }
    }
});
