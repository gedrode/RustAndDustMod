exports.modName = "rad"
exports.mod = Vars.mods.locateMod(exports.modName);

exports.addToResearch = (content, research) => {
	if (!content) {
		throw new Error('content is null!');
	}
	if (!research.parent) {
		throw new Error('research.parent is empty!');
	}
	var researchName = research.parent;
	var customRequirements = research.requirements;
	var objectives = research.objectives;
	var lastNode = TechTree.all.find(boolf(t => t.content == content));
	if (lastNode != null) {
		lastNode.remove();
	}
	var node = new TechTree.TechNode(null, content, customRequirements !== undefined ? customRequirements : content.researchRequirements());
	if (objectives) {
		node.objectives.addAll(objectives);
	}
	if (node.parent != null) {
		node.parent.children.remove(node);
	}
	// find parent node.
	var parent = TechTree.all.find(boolf(t => t.content.name.equals(researchName) || t.content.name.equals(exports.modName + "-" + researchName)));
	if (parent == null) {
		throw new Error("Content '" + researchName + "' isn't in the tech tree, but '" + content.name + "' requires it to be researched.");
	}
	// add this node to the parent
	if (!parent.children.contains(node)) {
		parent.children.add(node);
	}
	// reparent the node
	node.parent = parent;
};

exports.bundle = (text, num, num1) => {
	if (num1) {
		return Core.bundle.format(text, num, num1);
	} else if (num) {
		return Core.bundle.format(text, num);
	} else {
		return Core.bundle.get(text);
	}
}

exports.limitBuild = (block, num) => {
	return block.localizedName + exports.bundle("text-limitBuild", num);
}

exports.AngleTrns = (ang, rad, rad2) => {
	if (rad2) {
		return {
			x: Angles.trnsx(ang, rad, rad2),
			y: Angles.trnsy(ang, rad, rad2)
		}
	} else {
		return {
			x: Angles.trnsx(ang, rad),
			y: Angles.trnsy(ang, rad)
		}
	}
}

exports.SpeedUpTurret = (type, name, min/*最快攻速*/, change/*每次快多少攻速(默认1帧)*/, limit/*建筑数量限制(不写就是无限制)*/) => {
	if (!change) change = 1;
	let b = extend(type, name, {
		setBars() {
			this.super$setBars();
			this.addBar("fastReload", func(e => new Bar(
			prov(() => exports.bundle("bar.fastReload", Strings.fixed(e.getTime() * 100, 0))),
			prov(() => Color.valueOf("FF5845")),
			floatp(() => e.getTime()))));
		},
		canPlaceOn(tile, team, rotation) {
			if (!limit) return this.super$canPlaceOn(tile, team, rotation);
			return Vars.state.teams.get(team).getCount(this) < limit;
		},
		drawPlace(x, y, rotation, valid) {
			this.super$drawPlace(x, y, rotation, valid);
			if (!limit) return
			if (Vars.state.teams.get(Vars.player.team()).getCount(this) < limit) return
			this.drawPlaceText(exports.limitBuild(this, limit), x, y, valid);
		}
	});
	b.buildType = () => {
		let time = b.reload, speed = 1;
		return extend(PowerTurret.PowerTurretBuild, b, {
			getTime() {
				return (b.reload - time) / (b.reload - min);
			},
			baseReloadSpeed() {
				return this.efficiency * speed;
			},
			updateTile() {
				this.super$updateTile();
				if (this.timer.get(time)) {
					if (this.isShooting() && Angles.angleDist(this.rotation, this.angleTo(this.targetPos)) < this.block.shootCone && this.warmup() >= this.block.minWarmup) {
						speed = b.reload / time;
						if (time > min) time -= change;
					} else if (b.reload > time) {
						speed = b.reload / time;
						time += change;
					}
				}
			}
		})
	};
	return b;
}

exports.DamageUpTurret = (type, build, name, max/*最高层数*/, add/*每帧增加*/, less/*开火减少*/, limit/*数量限制*/) => {
	if (!add) add = 1;
	let b = extend(type, name, {
		setBars() {
			this.super$setBars();
			this.addBar("damageIncrease", func(e => new Bar(
			prov(() => exports.bundle("bar.damageIncrease", e.getCharmage())),
			prov(() => Color.valueOf("BE1C2A")),
			floatp(() => e.setBar()))));
		},
		canPlaceOn(tile, team, rotation) {
			if (!limit) return true;
			return Vars.state.teams.get(team).getCount(this) < limit;
		},
		drawPlace(x, y, rotation, valid) {
			this.super$drawPlace(x, y, rotation, valid);
			if (!limit) return
			if (Vars.state.teams.get(Vars.player.team()).getCount(this) < limit) return
			this.drawPlaceText(exports.limitBuild(this, limit), x, y, valid);
		}
	});
	b.buildType = () => {
		let charmage = 100;
		return extend(build, b, {
			getCharmage() {
				return charmage + 100;
			},
			setBar() {
				return charmage / max;
			},
			updateTile() {
				this.super$updateTile();
				if (!this.isShooting() && charmage < max) {
					charmage += add;
				}
			},
			shoot(type) {
				this.super$shoot(type);
				if (charmage > less) charmage -= less;
				else charmage = 0;
			},
			handleBullet(bullet, offsetX, offsetY, angleOffset) {
				bullet.damage *= this.getCharmage() / 100;
			}
		})
	};
	return b;
}