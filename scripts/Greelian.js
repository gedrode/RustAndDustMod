const librad = require("base/librad");
const Greelian = new Planet("格列利安", Planets.sun, 1, 3.3);
Greelian.meshLoader = prov(() => new MultiMesh(
	new HexMesh(Greelian, 8)
));
Greelian.generator = extend(SerpuloPlanetGenerator, {
	getDefaultLoadout() {
		return Schematics.readBase64("bXNjaAF4nA3JMQ6AIBAAwQXFRr9i4XuMBR5XkCAYkP9LphwcbmLO/lHMwRq0SY3vF0sGluRvTQ17XoZNStU9d0na20gDduAHAc0Org==")
	}
});
Greelian.cloudMeshLoader = prov(() => new MultiMesh(
	new HexSkyMesh(Greelian, 2, 0.15, 0.14, 5, Color.valueOf("25C9AB80"), 2, 0.42, 1, 0.43),
	new HexSkyMesh(Greelian, 3, 0.6, 0.15, 5, Color.valueOf("25C9ABFF"), 2, 0.42, 1.2, 0.45)
));
Greelian.generator = new SerpuloPlanetGenerator();
Greelian.visible = Greelian.accessible = Greelian.alwaysUnlocked = true;
Greelian.clearSectorOnLose = false;
Greelian.tidalLock = false;
Greelian.localizedName = "格列利安";
Greelian.prebuildBase = false;
Greelian.bloom = false;
Greelian.startSector = 1;
Greelian.orbitRadius = 85;
Greelian.orbitTime = 180 * 60;
Greelian.rotateTime = 90 * 60;
Greelian.atmosphereRadIn = 0.02;
Greelian.atmosphereRadOut = 0.3;
Greelian.atmosphereColor = Greelian.lightColor = Color.valueOf("25C9AB90");
Greelian.iconColor = Color.valueOf("25C9AB"),
Greelian.hiddenItems.addAll(Items.erekirItems).removeAll(Items.serpuloItems);

const 硬着陆 = new SectorPreset("硬着陆", Greelian, 1);
硬着陆.description = "现在，外乡人，我们还不了解你的能力。这是一片荒地，敌人只有少数巡逻队在此，拿下它。";
硬着陆.difficulty = 2;
硬着陆.alwaysUnlocked = false;
硬着陆.addStartingItems = true;
硬着陆.captureWave = 25;
硬着陆.localizedName = "硬着陆";
exports.硬着陆 = 硬着陆;
librad.addToResearch(硬着陆, {
	parent: "groundZero",
	objectives: Seq.with(
	new Objectives.SectorComplete(SectorPresets.groundZero))
});

const 遗忘之地 = new SectorPreset("遗忘之地", Greelian, 2);
遗忘之地.description = "瞧瞧，我们的族群也有过令人骄傲的黄金时代，但随着他们的到来，这些都一去不复返了。收集资源，回收遗骸，准备接敌。";
遗忘之地.difficulty = 2;
遗忘之地.alwaysUnlocked = false;
遗忘之地.addStartingItems = true;
遗忘之地.captureWave = 35;
遗忘之地.localizedName = "遗忘之地";
exports.遗忘之地 = 遗忘之地;
librad.addToResearch(遗忘之地, {
	parent: "硬着陆",
	objectives: Seq.with(
	new Objectives.SectorComplete(硬着陆))
})

const 弱效疫苗 = new SectorPreset("弱效疫苗", Greelian, 62);
弱效疫苗.description = "我们的部分战士对你能否运筹帷幄，指挥军队抱有疑问。现在我们的先头部队侦测到了敌人的一片防守薄弱的驻扎地，证明你的能力。";
弱效疫苗.difficulty = 1;
弱效疫苗.alwaysUnlocked = false;
弱效疫苗.addStartingItems = true;
弱效疫苗.captureWave = 0;
弱效疫苗.localizedName = "弱效疫苗";
exports.弱效疫苗 = 弱效疫苗;
librad.addToResearch(弱效疫苗, {
	parent: "遗忘之地",
	objectives: Seq.with(
	new Objectives.SectorComplete(遗忘之地))
})

const 硫海断崖 = new SectorPreset("硫海断崖", Greelian, 4);
硫海断崖.description = "这里是格列利安外海的一个入海口，由于殖民者的大肆工业开发，这里已经被污染的不成样子。我仍能回忆起这里的清风与碧波……";
硫海断崖.difficulty = 3;
硫海断崖.alwaysUnlocked = false;
硫海断崖.addStartingItems = true;
硫海断崖.captureWave = 38;
硫海断崖.localizedName = "硫海断崖";
exports.硫海断崖 = 硫海断崖;
librad.addToResearch(硫海断崖, {
	parent: "弱效疫苗",
	objectives: Seq.with(
	new Objectives.Research(弱效疫苗))
})

const 霞光前哨 = new SectorPreset("霞光前哨", Greelian, 14);
霞光前哨.description = "我们的一个哨站遭遇了袭击，这里拥有极其稀少的矿产资源——[red]镭[white]，我们必须夺回这里\n我们会给予你四架[yellow]MEGA[white]作为后勤补给，并且我们侦测到这里仍然幸存一些[cyan]采矿无人机\n[white]想必这些应该对你有所帮助。[cyan]祝你好运，指挥官";
霞光前哨.difficulty = 4;
霞光前哨.alwaysUnlocked = false;
霞光前哨.addStartingItems = true;
霞光前哨.captureWave = 35;
霞光前哨.localizedName = "霞光前哨";
exports.霞光前哨 = 霞光前哨;
librad.addToResearch(霞光前哨, {
	parent: "弱效疫苗",
	objectives: Seq.with(
	new Objectives.Research(霞光前哨))
});