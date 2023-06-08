var dialog = null; // 稍后初始化
var modName = modName;

// 等待游戏加载完毕
Events.on(ClientLoadEvent, e => {
    dialog = new BaseDialog(modName + "Greeting，commander.");
    
    setupDialog();
    
    dialog.show();
});

function setupDialog(){
    let table = dialog.cont;
    
    table.add("Welcome back，our commander." +  modName);
    
    dialog.addCloseButton();
}