var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(position, normal) {
        _super.call(this);
        this.position = position;
        this.normal = normal.normalize();
    }
    Line.prototype.toString = function () {
        return 'Gerade - Stützvektor: (' + this.position.x.toFixed(2) + '|' + this.position.y.toFixed(2) + '|' + this.position.z.toFixed(2) + '); Richtungsvektor: (' + this.normal.x.toFixed(2) + '|' + this.normal.y.toFixed(2) + '|' + this.normal.z.toFixed(2) + ')';
    };
    Line.prototype.buildMesh = function () {
        var geometry = new THREE.Geometry();
        var start = new THREE.Vector3().copy(this.position).sub(new THREE.Vector3().copy(this.normal).multiplyScalar(10));
        var end = new THREE.Vector3().copy(this.position).add(new THREE.Vector3().copy(this.normal).multiplyScalar(10));
        6;
        geometry.vertices.push(start);
        geometry.vertices.push(end);
        return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: this.color }));
    };
    return Line;
}(MathPrimitive));
