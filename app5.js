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

books.on('add',function(model){
  model.view= $("<h3>").text(model.get('title') + '(' + model.get('author') + ')');
  main.append(model.view);
});

books.on('remove', function(model){
  model.view.remove();
});

books.create({author: 'bilal', title: 'mar jao'});
books.create({author: 'bilal', title: 'mari jao'});
books.create({author: 'al', title: 'marojao'});
books.create({author: 'bill', title: ' jao'});
books.create({author: 'ill', title: 'majao'});


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
  className: 'book book-item',
  attributes: function(){
    return {
      'data-client-id': this.model.cid
    };
  }
});


var MainView = Backbone.View.extend({
  el: '#main'
})