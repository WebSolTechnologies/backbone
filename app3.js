var Book =Backbone.Model.extend({

 validate: function(attrs,opts){
  if (attrs.published && typeof attrs.published !== 'number'){
    return "publish should be a number";

  }
 }
});