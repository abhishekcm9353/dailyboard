(function(){
  var LIGHT=[[246,245,241],[230,235,245],[251,243,220]];
  var DARK=[[10,14,23],[15,26,51],[23,20,10]];
  function palette(){ return document.documentElement.getAttribute('data-theme')==='dark' ? DARK : LIGHT; }
  function lerp(a,b,t){ return [0,1,2].map(function(i){ return a[i]+(b[i]-a[i])*t; }); }
  function colourAt(stops,t){
    var seg=t*(stops.length-1);
    var i=Math.min(Math.floor(seg), stops.length-2);
    return lerp(stops[i], stops[i+1], seg-i);
  }
  var ticking=false;
  function update(){
    ticking=false;
    var max=document.documentElement.scrollHeight-window.innerHeight;
    var t=max>0 ? Math.min(1, Math.max(0, window.scrollY/max)) : 0;
    var c=colourAt(palette(), t).map(Math.round);
    document.body.style.backgroundColor='rgb('+c.join(',')+')';
  }
  function request(){ if(!ticking){ ticking=true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', request, {passive:true});
  window.addEventListener('resize', request);
  new MutationObserver(request).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
  request();
})();
