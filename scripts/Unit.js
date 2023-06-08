const status = require('radstatus');
const {DeathStatusAbility} = require('radability')
const {ToxicAbility} = require('radability')
//const status = require('SPstatus');



const s = new StatusEffect("s")
Object.assign(s,{
	color: Color.valueOf("92ab11"),
	damage: 260 / 30,
	effect: Fx.mineSmall,
	damageMultiplier: 0.7,
	healthMultiplier: 1,
	speedMultiplier: 0.6,
})



const bottle = new UnitType("bottle");
Object.assign(bottle,{
	speed: 0,
	isEnemy: false,
	envDisabled: 0,
	targetable: false,
	hittable: false,
	playerControllable: false,
	createWreck: false,
	createScorch: false,
	logicControllable: false,
	useUnitCap: false,
	allowedInPayloads: false,
	constructor: () => new TimedKillUnit.create(),
	physics: false,
	bounded: false,
	hidden: true,
	lifetime: 120 * 1.5,
	health: 10000,
	drawMinimap: false,
	flying: false,
	drawCell: false,
	deathSound: Sounds.none,
})
bottle.abilities.add(
	new ToxicAbility(120,80)
)
bottle.immunities.addAll(s)



const haze = new UnitType("haze");
exports.haze = haze;
Object.assign(haze, {
	outlineColor: Pal.neoplasmOutline,
	envDisabled: Env.none,
	healFlash: true,
	healColor: Pal.neoplasm1,
	speed: 0.8,
	drag: 0.12,
	hitSize: 20,
	rotateSpeed: 3,
	health: 84000,
	armor: 28,
        shadowElevation: 0.1,
	groundLayer: 74,
	
	constructor: () => new MechUnit.create(),
})
haze.immunities.addAll(s)

haze.weapons.add(
Object.assign(new Weapon("rad-haze-weapon"), {
	layerOffset: 0.0001,
	reload: 90,
	shootY: 0.75,
	recoil: 3,
	rotate: false,
	rotateSpeed: 3.7,
	mirror: true,
	x: 20,
	y: -0.25,
	heatColor: Color.valueOf("92AB11"),
	cooldownTime: 50,
		shoot: Object.assign(new ShootAlternate(3.5), {
    		shots: 2,
    		barrels: 1,
    		shotDelay: 2
    	}),
    	inaccuracy: 5,
	shootSound: Sounds.mediumCannon,
	bullet: Object.assign(new ArtilleryBulletType(20,120),{
		lifetime: 20,
		height: 19,
		width: 17,
		backColor: Color.valueOf("92AB11"),
		frontColor: Color.white,
		trailColor: Color.valueOf("92AB11"),
		shrinkX: 0,
		shrinkY: 0,
		hitShake: 0,
		fragBullets: 2,
		hitSound: Vars.tree.loadSound("15"),
		fragBullet: Object.assign(new BulletType(), {
			spawnUnit: bottle
		})
	})
}),
Object.assign(new Weapon("rad-blasphemer-weapon1"), {
	layerOffset: 0.0001,
	reload: 20,
	shootY: 0.75,
	recoil: 3,
	rotate: false,
	rotateSpeed: 3.7,
	mirror: true,
	x: 12,
	y: -6.25,
	heatColor: Color.valueOf("92AB11"),
	cooldownTime: 50,
		shoot: Object.assign(new ShootAlternate(3.5), {
    		shots: 4,
    		barrels: 3,
    		shotDelay: 2
    	}),
    	inaccuracy: 5,
	shootSound: Sounds.missile,
	bullet: Object.assign(new MissileBulletType(20,140),{
		lifetime: 20,
		height: 19,
		width: 17,
		backColor: Color.valueOf("92AB11"),
		frontColor: Color.white,
		trailColor: Color.valueOf("92AB11"),
		shrinkX: 0,
		shrinkY: 0,
		hitShake: 0,
		hitSound: Sounds.none,
	})
})
)

const S1 = new UnitType("S1");
Object.assign(S1,{
	speed: 0,
	isEnemy: false,
	envDisabled: 0,
	targetable: false,
	hittable: false,
	playerControllable: false,
	createWreck: false,
	createScorch: false,
	logicControllable: false,
	useUnitCap: false,
	allowedInPayloads: false,
	constructor: () => new TimedKillUnit.create(),
	physics: false,
	bounded: false,
	hidden: true,
	lifetime: 120 * 1.5,
	health: 10000,
	drawMinimap: false,
	flying: false,
	drawCell: false,
	deathSound: Sounds.none,
})
S1.abilities.add(
Object.assign(new EnergyFieldAbility(30, 30, 360), {
	x: 0,
	y: 5.75,
	maxTargets: 20,
	status: status.suppress,
	statusDuration: 120,
	healPercent: 3,
	sectors: 4,
	sectorRad: 0.18,
	effectRadius: 4,
	rotateSpeed: 0.5
})
)

const stifle = new UnitType("stifle");
exports.stifle = stifle;
Object.assign(stifle, {
	constructor: () => new UnitEntity.create(),
	outlineColor: Pal.neoplasmOutline,
	envDisabled: Env.none,
	drawCell: true,
	healFlash: true,
	healColor: Pal.neoplasm1,
	health: 18000,
	speed: 3,
	flying: true,
	hitSize: 24,
	engineOffset: 9.5,
	engineSize: 6.5,
	armor: 10,
})
stifle.weapons.add(
Object.assign(new Weapon("rad-stifle-weapon"), {
	layerOffset: 0.0001,
	reload: 90,
	shootY: 0.75,
	recoil: 3,
	rotate: false,
	rotateSpeed: 3.7,
	mirror: true,
	x: 8,
	y: -0.25,
	heatColor: Color.valueOf("92AB11"),
	cooldownTime: 50,
		shoot: Object.assign(new ShootAlternate(3.5), {
    		shots: 2,
    		barrels: 1,
    		shotDelay: 2
    	}),
    	inaccuracy: 5,
	shootSound: Sounds.mediumCannon,
	bullet: Object.assign(new ArtilleryBulletType(20,20),{
		lifetime: 20,
		height: 19,
		width: 17,
		backColor: Color.valueOf("92AB11"),
		frontColor: Color.white,
		trailColor: Color.valueOf("92AB11"),
		shrinkX: 0,
		shrinkY: 0,
		hitShake: 0,
		fragBullets: 1,
		fragBullet: Object.assign(new BulletType(), {
			spawnUnit: S1
		})
	})
}),
Object.assign(new Weapon("none"), {
	mirror: true,
	x: 8,
	y: 1,
	shootY: 4,
	reload: 10,
	cooldownTime: 42,
	shootSound: Vars.tree.loadSound("ALDAS"),
	heatColor: Color.valueOf("84a94b"),
	shoot: Object.assign(new ShootAlternate(3.5), {
        		shots: 6,
        		barrels: 2,
        		shotDelay: 2
        	}),
        	inaccuracy: 5,
	bullet: Object.assign(new BasicBulletType(), {
		recoil: 0,
		backColor: Color.valueOf("84a94b"),
		frontColor: Color.valueOf("84a94b"),
		lifetime: 20,
		damage:40,
		speed: 18,
		hitEffect: Fx.none,
		despawnEffect: Fx.none,
		trailColor: Color.valueOf("84a94b"),
		trailWidth: 0.8,
		trailLength: 14,
		trailChance: 0,
		hitSound: Sounds.none,

	})
})
)

const MTurret = new UnitType("MTurret");
Object.assign(MTurret,{
	speed: 0,
	isEnemy: false,
	envDisabled: 0,
	targetable: true,
	hittable: true,
	playerControllable: false,
	createWreck: false,
	createScorch: false,
	logicControllable: false,
	useUnitCap: false,
	allowedInPayloads: false,
	constructor: () => new TimedKillUnit.create(),
	physics: false,
	bounded: false,
	hidden: true,
	lifetime: 120 * 1.5,
	health: 800,
	drawMinimap: false,
	flying: false,
	drawCell: true,
	rotateSpeed: 10.7,
	deathSound: Sounds.bang,
})
MTurret.weapons.add(
Object.assign(new Weapon("rad-MTurret-weapon"), {
	layerOffset: 0.0001,
	reload: 60,
	shootY: 0.75,
	recoil: 3,
	rotate: false,
	rotateSpeed: 3.7,
	mirror: true,
	x: 12,
	y: -6.25,
	heatColor: Color.valueOf("92AB11"),
	cooldownTime: 50,
		shoot: new ShootSpread(30,12),
	shootSound: Sounds.shootBig,
	bullet: Object.assign(new BasicBulletType(10,20),{
		lifetime: 20,
		buildingDamageMultiplier:0.001,
		height: 19,
		width: 17,
		backColor: Color.valueOf("92AB11"),
		frontColor: Color.white,
		trailColor: Color.valueOf("92AB11"),
		shrinkX: 0,
		shrinkY: 0,
		hitShake: 0,
		hitSound: Sounds.none,
	})
})
)


const engineer = new UnitType("engineer");
exports.engineer = engineer;
Object.assign(engineer, {
	outlineColor: Pal.neoplasmOutline,
	envDisabled: Env.none,
	healFlash: true,
	healColor: Pal.neoplasm1,
	speed: 1.2,
	drag: 0.12,
	hitSize: 20,
	rotateSpeed: 3,
	health: 8000,
	buildSpeed:4.25,
	armor: 8,
        shadowElevation: 0.1,
	groundLayer: 74,

	constructor: () => new MechUnit.create(),
})
engineer.weapons.add(
Object.assign(new Weapon("rad-engineer-weapon"), {
	layerOffset: 0.0001,
	reload: 100,
	shootY: 0.75,
	recoil: 3,
	rotate: false,
	rotateSpeed: 3.7,
	mirror: true,
	x: 20,
	y: -0.25,
	heatColor: Color.valueOf("92AB11"),
	cooldownTime: 50,
		shoot: Object.assign(new ShootAlternate(3.5), {
    		shots: 1,
    		barrels: 1,
    		shotDelay: 2
    	}),
    	inaccuracy: 5,
	shootSound: Sounds.mediumCannon,
	bullet: Object.assign(new ArtilleryBulletType(20,1),{
		lifetime: 20,
		height: 19,
		width: 17,
		backColor: Color.valueOf("92AB11"),
		frontColor: Color.white,
		trailColor: Color.valueOf("92AB11"),
		shrinkX: 0,
		shrinkY: 0,
		hitShake: 0,
		fragBullets: 1,
		hitSound: Sounds.none,
		fragBullet: Object.assign(new BulletType(), {
			spawnUnit: MTurret
		})
	})
})
)



const blindness = new StatusEffect("blindness");
exports. blindness = blindness;
Object.assign(blindness, {
	color: Color.valueOf("FFFFFF"),
	effect: Fx.mineSmall,
	speedMultiplier: 0.0114514,
	reloadMultiplier: 0.0114514,
	buildSpeedMultiplier: 0.0114514,
})

const flashbang = new UnitType("flashbang");
Object.assign(flashbang,{
	speed: 0,
	isEnemy: false,
	envDisabled: 0,
	targetable: false,
	hittable: false,
	playerControllable: false,
	createWreck: false,
	createScorch: false,
	logicControllable: false,
	useUnitCap: false,
	allowedInPayloads: false,
	constructor: () => new TimedKillUnit.create(),
	physics: false,
	bounded: false,
	hidden: true,
	lifetime: 60 * 1.5,
	health: 10000,
	drawMinimap: false,
	flying: false,
	drawCell: false,
	deathSound: Vars.tree.loadSound("flashbang"),
})
flashbang.abilities.add(
	new DeathStatusAbility(blindness, 360, 120),
)
flashbang.immunities.addAll(blindness)

const strobe = new TankUnitType("strobe");
exports. strobe = strobe;
Object.assign(strobe, {
	outlineColor: Pal.neoplasmOutline,
	envDisabled: Env.none,
	healFlash: true,
	healColor: Pal.neoplasm1,
	lightColor: Pal.techBlue,
	squareShape: true,
	omniMovement: false,
	rotateMoveFirst: true,
	speed: 1,
	hitSize: 14,
	treadPullOffset: 3,
	treadRects: [new Rect(16, 8-32, 8, 48)],
	outlineRadius: 1,
	rotateSpeed: 3,
	health: 30520,
	armor: 1,
	itemCapacity: 0,
	researchCostMultiplier: 20,
	constructor: () => new TankUnit.create(),
})

strobe.weapons.add(
Object.assign(new Weapon("rad-strobe-weapon"), {
	layerOffset: 0.0001,
	reload: 40,
	shootY: 10.75,
	recoil: 1,
	rotate: true,
	rotateSpeed: 5.7,
	mirror: false,
	x: 0,
	y: 0,
	heatColor: Color.valueOf("f9350f"),
	cooldownTime: 30,
	shootSound: Sounds.mediumCannon,
	
	bullet: Object.assign(new ArtilleryBulletType(14, 30), {
		smokeEffect: Fx.shootBigSmoke,
		shootEffect: Fx.shootBigColor,
		width: 5,
		height: 7,
		lifetime: 20,
		hitSize: 4,
		hitColor: Color.valueOf("98ba53"),
		backColor: Color.valueOf("98ba53"),
		trailColor: Color.valueOf("98ba53"),
		frontColor: Color.white,
		trailWidth: 1.7,
		trailLength: 5,
		despawnEffect: Fx.hitBulletColor,
		hitEffect: Fx.hitBulletColor,
		
		splashDamageRadius: 8 * 2.25,
		splashDamage: 60,

		fragBullets: 1,
		fragBullet: Object.assign(new BulletType(), {
			spawnUnit: flashbang
		}),
	})
})
)