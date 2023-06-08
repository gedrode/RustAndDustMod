function newItem(name) {
	exports[name] = new Item(name);
}
newItem("steel");
newItem("iron");
newItem("aluminum");
newItem("aluminumAlloy");
newItem("thermite");
newItem("primary-processor");