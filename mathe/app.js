var CONTROLS_NONE = 0;
var CONTROLS_PLANE = 1;
var CONTROLS_LINE = 2;
var CONTROLS_MAT = 3;
var Greeter = (function () {
    function Greeter(element) {
        var _this = this;
        this.primitives = new Array();
        this.controls = CONTROLS_NONE;
        this.selectedPrimitive = -1;
        this.canvas = document.getElementById('content');
        document.getElementById('btn-add-plane').onclick = function () { return _this.showControls(CONTROLS_PLANE); };
        document.getElementById('btn-add-line').onclick = function () { return _this.showControls(CONTROLS_LINE); };
        document.getElementById('btn-add-mat').onclick = function () { return _this.showControls(CONTROLS_MAT); };
        document.getElementById('add').onclick = function () { return _this.add(); };
    }
    Greeter.prototype.start = function () {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.camera = new THREE.OrthographicCamera(-12, 12, 12 * (this.height / this.width), -12 * (this.height / this.width), 0.1, 1000);
        this.camera.up.set(0, 0, 1);
        this.camera.position.set(12, 5, 5);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.canvas.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.scene.matrixAutoUpdate = false;
        var arrowHelper1 = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-10, 0, 0), 20, 0xFFFFFF, 0.25, 0.25);
        this.scene.add(arrowHelper1);
        var arrowHelper2 = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -10, 0), 20, 0xFFFFFF, 0.25, 0.25);
        this.scene.add(arrowHelper2);
        var arrowHelper3 = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -10), 20, 0xFFFFFF, 0.25, 0.25);
        this.scene.add(arrowHelper3);
        this.updateUI();
        this.render(0);
    };
    Greeter.prototype.render = function (time) {
        var _this = this;
        requestAnimationFrame(function (_time) { return _this.render(_time); });
        this.renderer.render(this.scene, this.camera);
    };
    Greeter.prototype.showControls = function (controls) {
        this.controls = controls;
        this.updateUI();
    };
    Greeter.prototype.add = function () {
        switch (this.controls) {
            case CONTROLS_PLANE:
                var x = parseFloat(document.getElementById('plane-x').value);
                var y = parseFloat(document.getElementById('plane-y').value);
                var z = parseFloat(document.getElementById('plane-z').value);
                var nx = parseFloat(document.getElementById('plane-nx').value);
                var ny = parseFloat(document.getElementById('plane-ny').value);
                var nz = parseFloat(document.getElementById('plane-nz').value);
                var plane = new Plane(new THREE.Vector3(x, y, z), new THREE.Vector3(nx, ny, nz));
                this.primitives.push(plane);
                this.scene.add(plane.mesh);
                this.controls = CONTROLS_NONE;
                break;
            case CONTROLS_LINE:
                var x = parseFloat(document.getElementById('line-x').value);
                var y = parseFloat(document.getElementById('line-y').value);
                var z = parseFloat(document.getElementById('line-z').value);
                var nx = parseFloat(document.getElementById('line-nx').value);
                var ny = parseFloat(document.getElementById('line-ny').value);
                var nz = parseFloat(document.getElementById('line-nz').value);
                var line = new Line(new THREE.Vector3(x, y, z), new THREE.Vector3(nx, ny, nz));
                this.primitives.push(line);
                this.scene.add(line.mesh);
                this.controls = CONTROLS_NONE;
                break;
            case CONTROLS_MAT:
                var x1 = parseFloat(document.getElementById('mat-x1').value);
                var y1 = parseFloat(document.getElementById('mat-y1').value);
                var z1 = parseFloat(document.getElementById('mat-z1').value);
                var x2 = parseFloat(document.getElementById('mat-x2').value);
                var y2 = parseFloat(document.getElementById('mat-y2').value);
                var z2 = parseFloat(document.getElementById('mat-z2').value);
                var x3 = parseFloat(document.getElementById('mat-x3').value);
                var y3 = parseFloat(document.getElementById('mat-y3').value);
                var z3 = parseFloat(document.getElementById('mat-z3').value);
                var matrix = new THREE.Matrix4().set(x1, y1, z1, 0, x2, y2, z2, 0, x3, y3, z3, 0, 0, 0, 0, 1);
                if (this.selectedPrimitive != -1) {
                    this.primitives[this.selectedPrimitive].mesh.geometry.applyMatrix(matrix);
                    this.primitives[this.selectedPrimitive].mesh.matrixAutoUpdate = false;
                }
                this.controls = CONTROLS_NONE;
                break;
        }
        this.updateUI();
    };
    Greeter.prototype.onPrimitiveSelected = function (index) {
        if (index == this.selectedPrimitive) {
            this.selectedPrimitive = -1;
        }
        else {
            this.selectedPrimitive = index;
        }
        this.updateUI();
    };
    Greeter.prototype.updateUI = function () {
        var _this = this;
        switch (this.controls) {
            case CONTROLS_NONE:
                document.getElementById('parameters-plane').style.display = 'none';
                document.getElementById('parameters-line').style.display = 'none';
                document.getElementById('parameters-mat').style.display = 'none';
                document.getElementById('add').style.display = 'none';
                break;
            case CONTROLS_PLANE:
                document.getElementById('parameters-plane').style.display = 'block';
                document.getElementById('parameters-line').style.display = 'none';
                document.getElementById('parameters-mat').style.display = 'none';
                document.getElementById('add').style.display = 'block';
                break;
            case CONTROLS_LINE:
                document.getElementById('parameters-plane').style.display = 'none';
                document.getElementById('parameters-line').style.display = 'block';
                document.getElementById('parameters-mat').style.display = 'none';
                document.getElementById('add').style.display = 'block';
                break;
            case CONTROLS_MAT:
                document.getElementById('parameters-plane').style.display = 'none';
                document.getElementById('parameters-line').style.display = 'none';
                document.getElementById('parameters-mat').style.display = 'block';
                document.getElementById('add').style.display = 'block';
                break;
        }
        var elementsBox = document.getElementById('elements');
        elementsBox.innerHTML = '';
        for (var i = 0; i < this.primitives.length; i++) {
            var primitive = this.primitives[i];
            var node = document.createElement('div');
            var colorString = primitive.color.toString(16);
            node.style.backgroundColor = '#' + colorString.substring(0, colorString.indexOf('.'));
            node.innerText = primitive.toString();
            node.onclick = (function (_i) { return _this.onPrimitiveSelected(_i); }).bind(null, i);
            elementsBox.appendChild(node);
        }
        if (this.selectedPrimitive != -1) {
            document.getElementById('btn-add-mat').style.display = 'inline';
        }
        else {
            document.getElementById('btn-add-mat').style.display = 'none';
        }
    };
    return Greeter;
}());
window.onload = function () {
    var canvas = document.getElementById('content');
    var elements = document.getElementById('elements');
    var controls = document.getElementById('controls');
    var parameters = document.getElementById('controls');
    var greeter = new Greeter(canvas);
    greeter.start();
};
