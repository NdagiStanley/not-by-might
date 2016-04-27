Vue.config.delimiters = ["[[", "]]"]
new Vue({

    // We want to target the div with an id of 'bucketlistitem'
    el: 'body',

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
        // some data
        this.fetchDetails();
        this.fetchItems();
    },

    // Methods we want to use in our application are registered here
    methods: {

        fetchDetails: function() {
            // $set is a convenience method provided by Vue
            this.$set('username', localStorage.getItem('user'));
            this.$set('token', localStorage.getItem('id_token'));
        },

        // We dedicate a method to retrieving and setting some data
        fetchItems: function() {
            var list = localStorage.getItem('list');
            Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
            this.$http.get('/api/v1/bucketlists/' + list).then(function(response) {
                this.$set('auth', true);
                this.$set('items', response.data.items);
                this.$set('list', response.data.name);
            }, function(response) {
                console.log(response.status);
                this.$set('auth', false);
                window.location.href = "/404/";
            });
        },

        // Adds an item
        addItem: function() {
            var list = localStorage.getItem('list');
            if (this.item.title) {
                create_item_url = '/api/v1/bucketlists/' + list + '/items/'
                this.$http.post(create_item_url, this.item).then(function(response) {
                    this.items.push(this.item);
                    this.$set('status', 'Item added');
                    this.$set('iAmNotDone', 'TRUE');
                    this.item = { title: ''};
                    setTimeout(function() {
                        window.location.assign("/bucketlist_items/");
                    }, 500);
                });
            }
            else {
                console.log(this.item);
            }
        },

        // Updates an item
        updateItem: function(id, item_id) {
            var list = localStorage.getItem('list');
            this.$http.put('/api/v1/bucketlists/' + list + '/items/' + item_id,
                {title: this.updated}).then(function(response) {
                    this.$set('item', this.updated);
                    this.$set('status', 'Item updated');
                    setTimeout(function() {
                        window.location.assign("/bucketlist_items/");
                    }, 500);
            });
        },

        // Deletes an item
        deleteItem: function(id, item_id) {
            if(confirm("Are you sure you want to delete this bucketlist?")) {
                var list = localStorage.getItem('list');
                console.log({title: this.updated});
                this.$http.delete('/api/v1/bucketlists/' + list + '/items/' + item_id).then(function(response) {
                        this.items.$remove(id);
                        this.$set('status', 'Item deleted');
                        setTimeout(function() {
                            window.location.assign("/bucketlist_items/");
                        }, 500);
                });
            }
        },

        // Updates an item as done
        itemDone: function(item_id) {
            var list = localStorage.getItem('list');
            this.$http.put('/api/v1/bucketlists/' + list + '/items/' + item_id,
                { done: true }).then(function(response) {
                    this.$set('status', 'Way to go, on completing the task');
                    setTimeout(function() {
                        window.location.assign("/bucketlist_items/");
                    }, 500);
            });
        },

        // Updates an item as not done
        itemNotDone: function(item_id) {
            var list = localStorage.getItem('list');
            this.$http.put('/api/v1/bucketlists/' + list + '/items/' + item_id,
                { done: false }).then(function(response) {
                    this.$set('status', 'Too bad, it\'s not done');
                    setTimeout(function() {
                        window.location.assign("/bucketlist_items/");
                    }, 500);
            });
        },

        logOut: function() {
            localStorage.setItem('id_token', '');
        }
    }
});
