var Book =Backbone.Model.extend({
  defaults: {
    chapters: 5,
    current: 1
  },
//urlRoot: '/books'

 validate: function(attrs,opts){
  if (attrs.published && typeof attrs.published !== 'number'){
    return "publish should be a number";
  }
 },
 read: function(){
  var curr= this.get('current');
  if (curr < this.get('chapters')){
    this.set('current', curr+1);
  }
 },
 isFinished: function(){
  return this.get('chapters')== this.get('current');
 }
});

var Books=Backbone.Collection.extend({
  model: Book,
  url: '/books'
});

var books= new Books();


var main=$('#main');

/* books.on('add',function(model){
  model.view= $("<h3>").text(model.get('title') + '(' + model.get('author') + ')');
  main.append(model.view);
});

books.on('remove', function(model){
  model.view.remove();
});
*/


/* 
can be value
books.comparator= 'author'
can be function
books.comparator = function(modela,modelb){return modela.get('author').length -modelb.get('author').length}

books.sort();
*/


/* collection events
add
remove
reset
sort
request
sync
error
*/



var BookView= Backbone.View.extend({
  tagName: 'li',
  template: _.template($("#BookViewTemplate").html()),
  events: {
    'click .remove' : 'removeModel'
  },
  render: function(){
    this.el.innerHTML = this.template(this.model.toJSON())
    return this;
  },
  removeModel: function(model){
    this.model.destroy();
  }
});

var BooksView= Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection,'remove', this.removeBook);
    this.listenTo(this.collection,'add',this.addBook);

    this.listenTo(this.collection,'remove',this.updateNum);
    this.listenTo(this.collection,'add',this.updateNum);

  },
  events: {
    'click .nav' : 'handleClick'
  },
  handleClick: function(evt){
    Backbone.history.navigate(evt.target.getAttribute('href'),{trigger: true});
    evt.preventDefault();
  },
  children: {},
  template: _.template($("#BooksViewTemplate").html()),
  render: function(){
    this.el.innerHTML= this.template(this.collection);
    var ul = this.$('ul');
    this.collection.each(this.addBook.bind(this));
    return this;
  },
  addBook: function(model){
    var ul = this.$('ul');
    this.children[model.cid]= new BookView({model: model});
    ul.append(this.children[model.cid].render().el);
  },
  removeBook: function(model){
    this.children[model.cid].remove();
  },
  updateNum: function(){
    this.$('.span').text((this.collection).length);
  }

});

var AddBookView= Backbone.View.extend({
  template: _.template($("#AddBookViewTemplate").html()),
  events: {
    'click .add' : 'addBook'
  },
  render: function(){
    this.el.innerHTML =this.template();
    return this;
  },
  addBook: function(evt){
    this.collection.create({
      title: this.$('#title').val(),
      author: this.$('#author').val()
    });
    Backbone.history.navigate('',{trigger: true});
  }


});





var BookRouter= Backbone.Router.extend({
  initialize: function(opts){
    this.books=opts.books;
  },
  routes: {
    '': 'list',
    'add': 'add'
  },
  list: function(){
    var booksView= new BooksView({collection: this.books});
    main.empty().append(booksView.render().el);
  },
  add: function(id){
   var addBookView= new AddBookView({collection: this.books})
   main.empty().append(addBookView.render().el);
  }

});
var books= new Books();

books.fetch().then(function(){
  var router= new BookRouter({
    books: books
  });
  Backbone.history.start({pushState: true});
});

