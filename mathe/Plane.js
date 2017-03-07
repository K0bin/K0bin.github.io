var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(position, normal) {
        _super.call(this);
        this.position = position;
        this.normal = normal.normalize();
    }
    Plane.prototype.toString = function () {
        return 'Ebene - Punkt: (' + this.position.x.toFixed(2) + '|' + this.position.y.toFixed(2) + '|' + this.position.z.toFixed(2) + '); Normale: (' + this.normal.x.toFixed(2) + '|' + this.normal.y.toFixed(2) + '|' + this.normal.z.toFixed(2) + ')';
    };
    Plane.prototype.buildMesh = function () {
        var geometry = new THREE.PlaneGeometry(10, 10);
        geometry.translate(this.position.x, this.position.y, this.position.z);
        geometry.lookAt(this.normal);
        return new THREE.Mesh(geometry, this.buildMaterial());
    };
    return Plane;
}(MathPrimitive));
