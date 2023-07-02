chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.type === "USER") {
        delete obj.type;
        chrome.storage.local.set({"user": obj}).then(() => {
            console.log("User info saved!");
        })
        chrome.runtime.sendMessage({type: "UPDATE"})
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "timer") {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/alert.png',
            title: 'Take a Break!',
            message: 'From Clear',
            priority: 2
        });
    }
    if (alarm.name === "countdown") {
        chrome.alarms.get("timer").then((result) => {
            if (result != null){
                chrome.runtime.sendMessage({type: "COUNTDOWN", end: result.scheduledTime});
                chrome.alarms.create("countdown", {
                    when: Date.now() + 500
                })        
            }        
        }) 
    }
})