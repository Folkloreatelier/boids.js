# boids.js

A simple api which simulates biological behaviour of mainly birds in JavaScript.
  
  
### Usage ###

Here is the basic usage. boids.js requires [Three.js](https://github.com/mrdoob/three.js/). 

```html

<script src="Three.js"></script>
<script src="http://after12am.github.com/boids.js/boids.min.js"></script>
<script>

window.onload = function() {

  var v = new boids.SteeredVehicle( -200, 0, 0 );
  var target = new THREE.Vector3( 200, 0, 0 );

  function animate() {
    
    setTimeout(animate, 1000 / 30);
    update();
  }

  function update() {

    v.seek(target);
    v.update();
    console.log(v.position.x, v.position.y, v.position.z);
  }

  animate();
}
  
</script>
```
　

[Perfume demo](http://after12am.github.com/boids.js/example/perfume-dev.html) (perfume-global.com)