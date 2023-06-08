function DeathStatusAbility(status, duration, range) {
	return extend(Ability, {
		death(unit) {
			Units.nearby(null, unit.x, unit.y, range, other => {
				other.apply(status, duration);
			})
		},
		localized() {
			return Core.bundle.format("ability.deathStatus", status.emoji());
		}
	})
}
exports.DeathStatusAbility = DeathStatusAbility



let i = 0;
function ToxicAbility(damage,range) {
	return extend(Ability,{
		update(unit){
			i += Time.delta
			if (i >= 15) {
				Units.nearby(null, unit.x, unit.y, range, other => {
					other.damagePierce(damage / 4);
					other.apply(s, 60 * 15);
				})
				Units.nearbyBuildings(unit.x, unit.y, range, b => {
					b.health -= damage / 4
					if(b.health <= 0){b.kill()}
				})
				Fx.titanSmoke.at(
					unit.x + Mathf.range(range * Math.SQRT1_2),
					unit.y + Mathf.range(range * Math.SQRT1_2),
					Color.valueOf("92ab117f")
				)
				i = 0
			}
		},
		draw(unit){
			this.super$draw(unit);
			for(let j = 0;j < 4;j++){
				let r = unit.rotation + j * 360 / 4;
				Lines.arc(unit.x, unit.y, range, 0.15, r);
			}
		},
			localized() {
			return Core.bundle.format("ability. ToxicAbility", status.emoji());
		}
	})
}
exports.ToxicAbility = ToxicAbility