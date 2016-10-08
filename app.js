var Model1= Backbone.Model.extend({
  initialize: function(attrs,opts){
    console.log('created an instance of Model1');
  }

});
 
 var m1 = new Model1({name: 'm1'});
 console.log('name:', m1.get('name'));

 var Model2= Backbone.Model.extend({
  constructor: function(attrs,opts){
    console.log('created an instance of Model2');
  }

});

/*
 var m2=new Model2({name: 'm2'});
 console.log('name:', m2.get('name'));
*/
 var Model3= Model1.extend({
  initialize: function(attrs,opts){
    console.log('created an instance of Model3');
  }

});


 
 
 var m3= new Model3({name: 'm3'});
 console.log('name:', m3.get('name'));
