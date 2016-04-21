Vue.config.delimiters = ["[[", "]]"]
new Vue({

    // We want to target the div with an id of 'bucketlistitem'
    el: '#bucketlistitem',

    // Here we can register any values or collections that hold data
    // for the application
    data: {
        item: { title: ''},
        items: []
    },

    // Anything within the ready function will run when the application loads
    ready: function() {
        // When the application loads, we want to call the method that initializes
        // some data
        this.fetchItems();
    },

    // Methods we want to use in our application are registered here
    methods: {

        // We dedicate a method to retrieving and setting some data
        fetchItems: function() {
            var items = [{
                id: 1,
                title: 'ABCD'
            }, {
                id: 2,
                title: 'ABCD'
            }, {
                id: 3,
                title: 'ABCD'
            }, {
                id: 4,
                title: 'ABCD'
            }];
            // $set is a convenience method provided by Vue that is similar to pushing
            // data onto an array
            this.$set('items', items);
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
