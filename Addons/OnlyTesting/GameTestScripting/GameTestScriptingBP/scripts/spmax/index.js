"use strict";

import * as Minecraft from "mojang-minecraft";

let WorldPlayers = [];

Minecraft.World.events.beforeChat.subscribe((EventData) => {
  if (EventData.message.startsWith("loadplayers")) {
    WorldPlayers = Minecraft.World.getPlayers();
    Minecraft.Commands.run(
      `tellraw @a[name=${EventData.sender.name}] {"rawtext":[{"text":"Updated javascript data with ${WorldPlayers.length} players in the world"}]}`,
      Minecraft.World.getDimension("overworld")
    );
  }
  if (EventData.message.startsWith("unloadplayers")) {
    WorldPlayers = [];
    Minecraft.Commands.run(
      `tellraw @a[name=${EventData.sender.name}] {"rawtext":[{"text":"Unloaded all the world players from the javascript data"}]}`,
      Minecraft.World.getDimension("overworld")
    );
  }
});

Minecraft.World.events.tick.subscribe(({ currentTick }) => {
  if (WorldPlayers.length < 1) return;
  for (const Player of WorldPlayers) {
    const PosX = Math.floor(Player.location.x);
    const PosY = Math.floor(Player.location.y);
    const PosZ = Math.floor(Player.location.z);
    const BlockAtPlayer = Minecraft.World.getDimension("overworld").getBlock(
      new Minecraft.BlockLocation(PosX, PosY - 2, PosZ)
    );
    Minecraft.Commands.run(
      `titleraw @a[name="${
        Player.name
      }"] actionbar{"rawtext":[{"text":"§6Standing at Block: §a${BlockAtPlayer.getBlockData()
        .getType()
        .getName()}§6\nCurrent World Tick: §a${currentTick}§r"}]}`,
      Minecraft.World.getDimension("overworld")
    );
  }
});
