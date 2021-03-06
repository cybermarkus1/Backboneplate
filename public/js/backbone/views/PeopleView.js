var PeopleView = Backbone.View.extend({

  // Function que admita el paso de variables (es un JS). aqui usar los  tpl que genera grunt
  // template: 'this.anonymous()',
  // template: 'js/backbone/templates/tpl/people',
  // template: _.template("<strong> Esta vista se pinta!! <br> nombre: <%= Name %> <br> apellido: <%= Surname %> <br> Edad: <%= Age %> </strong>"),

  events: {
    'click #home': 'home',
    'click #doit': 'createNew',
    'click [data-action="openModal"]':'openModal'
  },

  initialize: function(options) {
    this.template = _.template(tpl.get('people'));
    console.log('collection: ' + this.collection + 'router ' + options.router);
    this.router = options.router;
  },

  home: function(){
    Backbone.history.navigate('/', true);
  },

  createNew: function(event) {
    console.log('createing a new doit : ' + this.collection + ' var ' + this.$el.find('#name').val() + this.$el.find('#surname').val() + this.$el.find('#age').val());
    this.model = new PeopleModel({
      name: this.$el.find('#name').val(),
      surname: this.$el.find('#surname').val(),
      age: this.$el.find('#age').val()
    });
    var id;
    this.collection.create(this.model, {
      success: function(response) {
        id = response.get('_id');
      }
    });

    this.model.set({
      '_id': id
    });

    this.$el.find('#name').val('');
    this.$el.find('#surname').val('');
    this.$el.find('#age').val('');

    $('#bbdd').append(new PeopleListItemView({ model: this.model }).render().el);

    return this;
  },

  openModal: function(){
    // $('#modal').html(new ModalView(this).render().el);
    var modal = new ModalView();
    var self = this;
    var ex = new exModalView({ model: this.model });
    modal.show(ex);

  },

  render: function() {
    // console.log("PeopleView render");
    $(this.el).html(this.template());
    // this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  }
});