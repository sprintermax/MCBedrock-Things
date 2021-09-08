let aClientSystem = client.registerSystem(0, 0);

aClientSystem.initialize = function () {

    this.listenForEvent("minecraft:client_entered_world", (eventData) => this.clientJoined(eventData))

};

aClientSystem.clientJoined = function (eventData) {

    this.broadcastEvent("minecraft:display_chat_event", "Loaded...");

};

aClientSystem.update = function () {

    //updates all the things (every 20 ticks)

};

aClientSystem.shutdown = function () {

    //Cleanup all the things

};