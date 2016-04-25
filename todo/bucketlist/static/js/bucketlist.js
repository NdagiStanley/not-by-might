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
            this.$http.get('http://localhost:8000/api/v1/bucketlists/').then(function(response) {
                console.log(response.data.results);
                this.$set('auth', true);
                this.$set('bucketlists', response.data.results);
            }, function(response) {
                console.log(response.status);
                this.$set('auth', false);
                window.location.href = "http://localhost:8000/404/";
            });
        },

        // Adds a bucketlist
        addBucketlist: function() {
            if (this.bucketlist.name) {
                var bucketlist = {
                    name: this.bucketlist.name,
                    created_by: localStorage.getItem('user')
                };
                this.$http.post('http://localhost:8000/api/v1/bucketlists/', bucketlist).then(function(response) {});
                this.bucketlist = { name: '' };
                this.bucketlists.push(this.bucketlist);
            }
        },

        // Updates a bucketlist
        updateBucketlist: function(id, list_id) {
            console.log({name: this.updated})
            this.$http.put('http://localhost:8000/api/v1/bucketlists/' + list_id,
                {name: this.updated}).then(function(response) {
                    this.$set('bucketlist', this.updated);
            });
            window.location.href = "http://localhost:8000/bucketlists/";
        },

        // Deletes a bucketlist
        deleteBucketlist: function(id, list_id) {
            console.log({name: this.updated})
            if(confirm("Are you sure you want to delete this bucketlist?")) {
                this.$http.delete('http://localhost:8000/api/v1/bucketlists/' + list_id).then(function(response) {
                    this.bucketlists.$remove(id);
                });
                window.location.href = "http://localhost:8000/bucketlists/";
            }
        },

        goToItem: function(list) {
            localStorage.setItem('list', list);
        }
    }
});
