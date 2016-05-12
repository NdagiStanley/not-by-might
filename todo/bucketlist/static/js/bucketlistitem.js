Vue.config.delimiters = ["[[", "]]"]
const list = localStorage.getItem('list');
new Vue({

    // We want to target the div with an id of 'topbar'
    el: '#topbar',

    ready: function() {
        // When the application loads, we want to call the method that initializes
        // User details
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

    // We want to target the div with an id of 'bucketlistitem'
    el: '#bucketlistitem',

    // Here we can register any values or collections that hold data
    // for the application
    data: {
        list: '',
        item: { title: '', done: false},
        items: []
    },

    // Anything within the ready function will run when the application loads
    ready: function() {
        // When the application loads, we want to call the method that initializes
        // Items
        this.fetchItems();
    },

    // Methods we want to use in our application are registered here
    methods: {

        // We dedicate a method to retrieving and setting some data
        fetchItems: function() {
            Vue.http.headers.common['Authorization'] = 'Token ' + localStorage.getItem('id_token');
            this.$http.get('/api/v1/bucketlists/' + list).then(function(response) {
                this.$set('items', response.data.items);
                this.$set('list', response.data.name);
            }, function(response) {
                window.location.href = "/404/";
            });
        },

        // Adds an item
        addItem: function() {
            if (this.item.title) {
                create_item_url = '/api/v1/bucketlists/' + list + '/items/'
                this.$http.post(create_item_url, this.item).then(function(response) {
                    this.items.push(this.item);
                    this.$set('status_error', '');
                    this.$set('status', 'Item added');
                    this.$set('iAmNotDone', 'TRUE');
                    this.$set('status', '');
                    this.item = { title: ''};
                    this.fetchItems();
                }, function(response) {
                    window.location.assign("/bucketlist_items/");
                });
            } else {
                this.$set('status_error', 'You have not entered any item');
            }
        },

        // Updates an item
        updateItem: function(id, item_id) {
            if (this.updated) {
                this.$http.put('/api/v1/bucketlists/' + list + '/items/' + item_id,
                    {title: this.updated}).then(function(response) {
                        this.$set('item', this.updated);
                        this.$set('updated', '');
                        this.$set('status', 'Item updated');
                        this.$set('status', '');
                        this.fetchItems();
                }, function(response) {
                    window.location.assign("/404/");
                });
            } else {
                this.$set('status_error', 'Please enter the title you want updated')
            }
        },

        // Deletes an item
        deleteItem: function(id, item_id) {
            if(confirm("Are you sure you want to delete this bucketlist?")) {
                console.log({title: this.updated});
                this.$http.delete('/api/v1/bucketlists/' + list + '/items/' + item_id).then(function(response) {
                        this.items.$remove(id);
                        this.$set('status', 'Item deleted');
                        this.$set('status', '');
                        this.fetchItems();
                }, function(response) {
                    window.location.assign("/404/");
                });
            }
        },

        // Updates an item as done
        itemDone: function(item_id) {
            this.$http.put('/api/v1/bucketlists/' + list + '/items/' + item_id,
                { done: true }).then(function(response) {
                    this.$set('status', 'Way to go, on completing the task');
                    this.$set('status', '');
                    this.$set('status_error', '');
                    this.fetchItems();
            }, function(response) {
                this.$set('status_error', 'Error! Please try again');
            });
        },

        // Updates an item as not done
        itemNotDone: function(item_id) {
            this.$http.put('/api/v1/bucketlists/' + list + '/items/' + item_id,
                { done: false }).then(function(response) {
                    this.$set('status', 'Too bad, it\'s not done');
                    this.$set('status', '');
                    this.$set('status_error', '');
                    this.fetchItems();
            }, function(response) {
                this.$set('status_error', 'Error! Please try again');
            });
        }
    }
});
