Vue.config.delimiters = ["[[", "]]"]
new Vue({
    el: '#topbar',

    ready: function() {
        // When the application loads, we want to call the method that initializes
        // some data
        this.fetchUserDetails();
    },
    methods: {
        fetchUserDetails: function() {
            // $set is a convenience method provided by Vue
            this.$set('username', localStorage.getItem('username'));
            this.$set('token', localStorage.getItem('id_token'));
        },
        logOut: function() {
            localStorage.setItem('id_token', '');
        }
    }
});

new Vue({
    // We want to target the div with an id of 'bucketlists'
    el: '#bucketlists',

    // Here we can register any values or collections that hold data
    // for the application
    data: {
        bucketlist: { name: '' },
        bucketlists: [],
        user: '',
        list: [bucketlists]
    },

    // Anything within the ready function will run when the application loads
    ready: function() {
        // When the application loads, we want to call the method that initializes
        // the bucketlists of the signed in user
        this.fetchBucketlists();
    },

    // Methods to be used in the application are registered here
    methods: {

        // A method dedicated to retrieving and setting some data
        fetchBucketlists: function() {
            Vue.http.headers.common['Authorization'] = 'Token ' + localStorage.getItem('id_token');
            this.$http.get('/api/v1/bucketlists/').then(function(response) {
                this.$set('bucketlists', response.data.results);
                if (response.data.results.length == 0) {
                    this.$set('list', []);
                }
            }, function(response) {
                window.location.assign("/404/");
            });
        },

        // A method dedicated to searching through data
        searchBucketlists: function() {
            this.$http.get('/api/v1/bucketlists/?q=' + this.searchParam).then(function(response) {
                this.$set('bucketlists', response.data.results);
                this.$set('startSearch', false);
                this.$set('searchParam', '');
                if (response.data.results.length == 0) {
                    this.$set('status_error', 'Error! No bucketlists match that search');
                } else {
                    this.$set('status_error', '');
                }
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
                    this.$set('bucketlists.items.length', 0);
                    this.$http.get('/api/v1/bucketlists/').then(function(response) {
                        this.$set('bucketlists', response.data.results);
                        this.$set('list', response.data.results);
                    });
                    // Status timeout needs work-around
                    this.$set('status', 'Bucketlist added');
                    this.$set('status', '');
                    this.bucketlist = { name: '' };
                }, function(response) {
                    window.location.assign("/404/");
                });
            } else {
                this.$set('status_error', 'You have not entered any name');
            }
        },

        // Updates a bucketlist
        updateBucketlist: function(id, list_id) {
            if (this.updated) {
                this.$http.put('/api/v1/bucketlists/' + list_id, { name: this.updated }).then(function(response) {
                    this.$set('updated', '');
                    this.$set('status', 'Bucketlist updated');
                    this.$set('status', '');
                    this.$set('status_error', '');
                    this.fetchBucketlists();
                }, function(response) {
                    window.location.assign("/404/");
                });
            } else {
                this.$set('status_error', 'Please enter the name you want updated')
            }
        },

        // Deletes a bucketlist
        deleteBucketlist: function(id, list_id) {
            if (confirm("Are you sure you want to delete this bucketlist?")) {
                this.$http.delete('/api/v1/bucketlists/' + list_id).then(function(response) {
                    this.bucketlists.$remove(id);
                    this.$set('status', 'Bucketlist deleted');
                    this.$set('status', '');
                    this.fetchBucketlists();
                }, function(response) {
                    window.location.assign("/404/");
                });
            }
        },

        showSearch: function() {
            this.$set('search', true);
            this.$set('notsearch', true);
            this.$set('bucketlists', []);
            this.$set('status_error', '');
            this.$set('list', [bucketlists]);
            this.$set('startSearch', true);
        },

        showAdd: function() {
            this.$set('search', false);
            this.$set('notsearch', false);
            this.$set('status_error', '');
            this.$set('status', '');
            this.$set('searchParam', '');
            this.$set('startSearch', false);
            this.fetchBucketlists();
        },

        goToItem: function(list) {
            localStorage.setItem('list', list.id);
        }
    }
});
