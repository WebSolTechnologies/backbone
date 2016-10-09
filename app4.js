var Book= Backbone.Model.extend({
  urlRoot: '/books',
  idAttribute: '_id'
});

var main= $('#main');

book=new Book({_id: 1});
book.on('change:title', updateView);

book.fetch();

function updateView(){
  main.text(book.get('title'));
}