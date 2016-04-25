Vue.config.delimiters = ["[[", "]]"]
new Vue({

    // We want to target the div with an id of 'bucketlistitem'
    el: '#bucketlistitem',

    // Here we can register any values or collections that hold data
    // for the application
    data: {
        list: '',
        item: { title: ''},
        items: []
    },

    // Anything within the ready function will run when the application loads
    ready: function() {
        // When the application loads, we want to call the method that initializes
        // some data
        var bucketlistList = localStorage.getItem('list');
        console.log(bucketlistList.name);
        this.fetchItems();
    },

    // Methods we want to use in our application are registered here
    methods: {

        // We dedicate a method to retrieving and setting some data
        fetchItems: function() {
            var list = localStorage.getItem('list');
            this.$set('list', list.name);
            console.log(list.name);
            Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
            this.$http.get('http://localhost:8000/api/v1/bucketlists/' + list_id).then(function(response) {
                console.log(response.data);
                this.$set('auth', true);
                this.$set('items', response.data);
            }, function(response) {
                console.log(response.status);
                this.$set('auth', false);
                window.location.href = "http://localhost:8000/404/";
            });
        },

        // Adds an item
        addItem: function() {
            if (this.item.title) {
                this.items.push(this.item);
                this.item = { title: ''};
            }
        }
    }
});
