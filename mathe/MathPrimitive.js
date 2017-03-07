var MathPrimitive = (function () {
    function MathPrimitive() {
        this._color = 0;
        this._mesh = null;
    }
    Object.defineProperty(MathPrimitive.prototype, "mesh", {
        get: function () {
            if (this._mesh == null) {
                this._mesh = this.buildMesh();
                this._mesh.matrixAutoUpdate = false;
            }
            return this._mesh;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MathPrimitive.prototype, "color", {
        get: function () {
            if (this._color == 0) {
                this._color = ((Math.random() * 255) << 16) + ((Math.random() * 255) << 8) + Math.random() * 255;
            }
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    MathPrimitive.prototype.buildMaterial = function () {
        var color = this.color;
        return new THREE.MeshBasicMaterial({ color: color, wireframe: false, side: THREE.DoubleSide });
    };
    return MathPrimitive;
}());
