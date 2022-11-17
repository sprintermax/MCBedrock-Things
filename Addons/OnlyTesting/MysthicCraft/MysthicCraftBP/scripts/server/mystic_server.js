var system = server.registerSystem(0, 0);
var global = { tick: 0 };

system.initialize = function () {
  global.viewAllEntities = this.registerQuery();
};

system.update = function () {
  global.tick += 1;
  if (global.tick == 5) {
    let allEntities = system.getEntitiesFromQuery(global.viewAllEntities);
    let size = allEntities.length;
    for (let index = 0; index < size; ++index) {
      if (allEntities[index].__identifier__ == "mystic:forcefield") {
        let checkActivated = this.getComponent(
          allEntities[index],
          "minecraft:health"
        );
        let forcefieldpos = this.getComponent(
          allEntities[index],
          "minecraft:position"
        );
        if (checkActivated.max == 50) {
          this.broadcastEvent(
            "minecraft:execute_command",
            '/tellraw @a {"rawtext":[{"text":"§d<MythicalExpansion> §aActivated Forcefield At: §rX: ' +
              forcefieldpos.x +
              ", Y: " +
              forcefieldpos.y +
              ", Z: " +
              forcefieldpos.z +
              '"}]}'
          );
          checkActivated.max = 55;
          this.applyComponentChanges(allEntities[index], checkActivated);
        } else if (checkActivated.max == 55) {
          this.broadcastEvent(
            "minecraft:execute_command",
            '/tellraw @a {"rawtext":[{"text":"§d<MythicalExpansion> §2Working..."}]}'
          );
        }
        if (checkActivated.max == 25) {
          this.broadcastEvent(
            "minecraft:execute_command",
            '/tellraw @a {"rawtext":[{"text":"§d<MythicalExpansion> §aDeactivated Forcefield At: §rX: ' +
              forcefieldpos.x +
              ", Y: " +
              forcefieldpos.y +
              ", Z: " +
              forcefieldpos.z +
              '"}]}'
          );
          checkActivated.max = 20;
          this.applyComponentChanges(allEntities[index], checkActivated);
        }
      }
    }
    global.tick = 0;
  }
};
