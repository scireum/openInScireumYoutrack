var cmid;
var cm_clickHandler = function(args) {
  chrome.tabs.create({ url: 'http://jira.scireum.local/browse/' + args.selectionText });
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        var type = msg.selection + ' in Jira oeffnen';
        if (msg.selection && msg.selection.length < 20) {
          var words = msg.selection.split("-", 2);
          if(words.length === 2 && /^\d+$/.test(words[1]) && "OX-MIO-SCI-SE-BRAND-CRM-DH-KOP-OXC-OXTG-QM-SCAN-SCI-SE".includes(words[0])){
             // Add/update context menu entry
            var options = {
                title: type,
                contexts: ['selection'],
                onclick: cm_clickHandler
            };
            if (cmid != null) {
                chrome.contextMenus.update(cmid, options);
            } else {
                // Create new menu, and remember the ID
                cmid = chrome.contextMenus.create(options);
            }
            return;
        }
        
    }
    if (cmid != null) {
      chrome.contextMenus.remove(cmid);
      cmid = null; // Invalidate entry now to avoid race conditions
    }
  } 
});


