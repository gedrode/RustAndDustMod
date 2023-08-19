const lib = require("base/librad");

function Rotator(name, x, y, s, speed, rot) {
	Draw.rect(name, x, y, s, s, speed);
	//Draw.rect(name + "-glow", x, y, -speed / 2);
	Draw.rect(name + "-top", x, y, rot);
}

exports.RotatorAbility = (name, x, y, speed, s, mirror) => { //螺旋桨
	return extend(Ability, {
		display: false,
		draw(unit) {
			let rot = unit.rotation - 90;
			let xy = lib.AngleTrns(rot, x, y);
			let xy2 = lib.AngleTrns(rot, -x, y);
			let Speed = Time.time * speed * 6;
			let ux = unit.x + xy.x, uy = unit.y + xy.y;
			let nx = unit.x + xy2.x, ny = unit.y + xy2.y;
			Rotator(unit.type.name + "-" + name, ux, uy, s, Speed, rot);
			if (mirror) Rotator(unit.type.name + "-" + name, nx, ny, s, -Speed, rot);
		}
	})
}

exports.HealthRequireAbility = (percent, status, status2) => { //状态切换
	return extend(Ability, {
		localized() {
			return lib.bundle("HealthRequireAbility", percent * 100);
		},
		update(unit) {
			if (unit.healthf() >= percent) unit.apply(status, 60);
			else if (status2) unit.apply(status2, 60);
		},
		copy() {
			return exports.HealthRequireAbility(percent, status, status2);
		}
	})
}