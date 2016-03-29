
function createImages(srcs, fn) {
   var imgs = [],img;
   var remaining = srcs.length;
   if (remaining == 0) fn();
   for (var i = 0; i < srcs.length; i++) {
       img = new Image();
       imgs[srcs[i]] = img;
       img.onload = function() {
           --remaining;
           if (remaining == 0) {
               fn();
           }
       };
       img.src = 'images/'+srcs[i];
   }
   return imgs;
}

var IMAGES = []; 

function load(callback) {
	IMAGES = createImages(['test.png'], callback);
}
