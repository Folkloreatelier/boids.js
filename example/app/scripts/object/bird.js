var Bird = function () {
    
    function v(x, y, z) {
        geometry.vertices.push(new THREE.Vector3(x, y, z));
    }

    function f3(a, b, c) {
        geometry.faces.push( new THREE.Face3( a, b, c ) );
    }
    
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial({ color: new THREE.Color( 0x646464 ) });
    
    v(   5,   0,   0 );
    v( - 5, - 2,   1 );
    v( - 5,   0,   0 );
    v( - 5, - 2, - 1 );

    v(   0,   2, - 6 );
    v(   0,   2,   6 );
    v(   2,   0,   0 );
    v( - 3,   0,   0 );

    f3( 0, 2, 1 ); // body
    f3( 0, 3, 2 );

    f3( 4, 7, 6 ); // right wing
    f3( 5, 6, 7 ); //　left wing
    
    THREE.Mesh.call(this, geometry, material);
    
    this.phase = Math.floor(Math.random() * 62.83);
    this.doubleSided = true;
    
    this.boid = new boids.SteeredVehicle(0, 0, 0);
    this.boid.maxForce = .15;
    
}

Bird.prototype = Object.create(THREE.Mesh.prototype);

/*
  @param target boids.Vector3
*/
Bird.prototype.seek = function(target) {
    
    this.boid.seek(target);
    this.update();
    
}

/*
  @param array of boids.Vector3
*/
Bird.prototype.flock = function(boids) {
    
    this.boid.flock(boids);
    this.update();
    
}

Bird.prototype.inSight = function(target) {
    return this.boid.inSight(target);
}

/*
    private
*/
Bird.prototype.update = function() {
    
    this.boid.update();
    // this.boid.wrap(500, 500, 400);
    this.flap();
    
    this.position.x = this.boid.position.x;
    this.position.y = this.boid.position.y;
    this.position.z = this.boid.position.z;
}

/*
    private
*/
Bird.prototype.flap = function() {
    
    this.rotation.y = Math.atan2(-this.boid.velocity.z, this.boid.velocity.x);
    this.rotation.z = Math.asin(this.boid.velocity.y / this.boid.velocity.length());

    this.phase = (this.phase + (Math.max(0, this.rotation.z) + 0.1)) % 62.83;
    this.geometry.verticesNeedUpdate = true;
    
    this.geometry.vertices[ 5 ].y = 
    this.geometry.vertices[ 4 ].y = Math.sin(this.phase) * 5;
    
}