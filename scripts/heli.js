const lib = require("base/librad");
const ability = require("ability");

function newUnit(name, unitType, cons) {
	const u = extend(UnitType, name, cons || {});
	u.constructor = () => new unitType.create();
	return exports[name] = u;
}
exports.newUnit = newUnit;
function newUnitList(name, unitType, num, cons) {
	for (let i = 1; i <= num; i++) newUnit(name + i, unitType, cons);
}

let hl1 = newUnit("hl1", UnitEntity);
hl1.abilities.add(ability.RotatorAbility("rotator", 0, 3, 0.5, 20));

let hl2 = newUnit("hl2", UnitEntity);
hl2.abilities.add(ability.RotatorAbility("rotator", 0, 1,-1, 25));

let hl3 = newUnit("hl3", UnitEntity);
hl3.abilities.add(ability.RotatorAbility("rotator", 0, 4,-1, 30));

let hlc4 = newUnit("hlc4", PayloadUnit);
hlc4.abilities.add(ability.RotatorAbility("rotator", 14, 2,-1, 0, true), ability.RotatorAbility("rotator1", 0, 0,-0.5, 50,false), ability.RotatorAbility("rotator1", 0, 0,0.5, 50,false), ability.RotatorAbility("rs", 0, 0,0.3, 50,false));

let hla4 = newUnit("hla4", UnitEntity);
hla4.abilities.add(ability.RotatorAbility("rotator", 0, 0,-0.5, 60,false), ability.RotatorAbility("rotator", 0, 0,0.5, 60,false), ability.RotatorAbility("rs", 0, 0,0.3, 60,false));

let hla5 = newUnit("hla5", UnitEntity);
hla5.abilities.add(ability.RotatorAbility("rotator", 17.4, 1,-0.75, 40,true), ability.RotatorAbility("rotator", 6, -7,-1, 40,true));