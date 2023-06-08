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