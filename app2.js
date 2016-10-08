/*
var Book =Backbone.Model.extend({
  defaults: {
    title: 'xxx'
  }
});
*/

var Book =Backbone.Model.extend({
  defaults: function(){
    return {
      time: new Date()
    };
  }
});