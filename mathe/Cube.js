var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cube = (function (_super) {
    __extends(Cube, _super);
    function Cube() {
        _super.apply(this, arguments);
    }
    Cube.prototype.toString = function () {
        return 'Würfel';
    };
    Cube.prototype.buildMesh = function () {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        return new THREE.Mesh(geometry, this.buildMaterial());
    };
    return Cube;
}(MathPrimitive));
