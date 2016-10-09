var Book =Backbone.Model.extend({
  defaults: {
    chapters: 5,
    current: 1
  },
  urlRoot: '/books',


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
  model: Book
});

var books=new Books();