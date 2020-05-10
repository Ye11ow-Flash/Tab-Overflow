chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
   if (changeInfo.status != 'complete'){
     return;
   }
  chrome.windows.getAll({populate:true}, getAllOpenWindows);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  chrome.windows.getAll({populate:true}, getAllOpenWindows);
});

chrome.tabs.onMoved.addListener(function(tabId, moveInfo){
  chrome.windows.getAll({populate:true}, getAllOpenWindows);

});

chrome.tabs.onActivated.addListener(function(activeInfo){
  chrome.windows.getAll({populate:true}, getAllOpenWindows);
});


function getAllOpenWindows(winData) {

    var tabs = [];
    var tab_ids = [];
    var tab_titles = [];
    // var tab_open_time = [];
    for (var i in winData) {
      if (winData[i].focused === true) 
      {
          var winTabs = winData[i].tabs;
          var totTabs = winTabs.length;
          for (var j=0; j<totTabs;j++) 
          {
            tabs.push(winTabs[j].url);
			      tab_ids.push(winTabs[j].id);
            tab_titles.push(winTabs[j].title);           
          }
      }
    }
    // console.log(tabs);
    chrome.storage.sync.set({"tabs": tabs}, function(){
       console.log('Value is set to ' + tabs);
    });
    chrome.storage.sync.set({"tab_ids": tab_ids}, function(){
       console.log('Value is set to ' + tab_ids);
    });
    chrome.storage.sync.set({"tab_titles": tab_titles}, function(){
       console.log('Value is set to ' + tab_titles);
    });
}