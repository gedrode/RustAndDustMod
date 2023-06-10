const lib = require("base/librad");
let reduceArmor = Stat("reduceArmor");
let reduceMaxHealth = Stat("reduceMaxHealth");

const suppress = new StatusEffect("suppress");
exports.suppress = suppress;
Object.assign(suppress, {
	color: Color.valueOf("7CF389FF"),
	damage: 0.05,
	effect: Fx.mineSmall,
	damageMultiplier: 0.65,
	healthMultiplier: 0.9,
	speedMultiplier: 0.1,
	reloadMultiplier: 0.65,
	buildSpeedMultiplier: 0.3
})

function newStatus(name, cons) {
	return exports[name] = extend(StatusEffect, name, cons || {});
}

newStatus("scabbing", {
	sec: 0,
	update(unit, time) {
		this.super$update(unit, time);
		this.sec++;
		if (time <= 3) {
			unit.armor = unit.type.armor;
			return
		}
		if (this.sec % (60 / 8) == 0) unit.armor -= 1;
	},
	setStats() {
		this.super$setStats();
		this.stats.add(reduceArmor, lib.bundle("reduceArmor", 8, "(永久)"));
	}
})
newStatus("AF", {
	sec: 0,
	update(unit, time) {
		this.super$update(unit, time);
		this.sec++;
		if (this.sec % (60 / 4) == 0) unit.armor -= 1;
		if (this.sec % (60 / 50) == 0) unit.maxHealth -= 1;
	},
	setStats() {
		this.super$setStats();
		this.stats.add(reduceArmor, lib.bundle("reduceArmor", 4, "(临时)"));
		this.stats.add(reduceMaxHealth, lib.bundle("reduceMaxHealth", 50));
	}
})