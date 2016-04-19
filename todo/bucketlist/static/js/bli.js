new Vue({

    // We want to target the div with an id of 'events'
    el: '#blis',

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
        this.fetchBls();
    },

    // Methods we want to use in our application are registered here
    methods: {

        // We dedicate a method to retrieving and setting some data
        fetchBls: function() {
            var items = [{
                id: 1,
                name: 'TIFF'
            }];
            // $set is a convenience method provided by Vue that is similar to pushing
            // data onto an array
            this.$set('Items', items);
        },

        // Adds a bl
        addBl: function() {
            if (this.item.name) {
                this.items.push(this.item);
                this.item = { title: ''};
            }
        }
    }
});
