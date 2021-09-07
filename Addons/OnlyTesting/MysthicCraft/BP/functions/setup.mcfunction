# Setting up scoreboards
scoreboard objectives add found_ore_spot dummy
scoreboard objectives add ore_to_place dummy
scoreboard objectives add player_tick dummy
scoreboard objectives add player_seconds dummy
scoreboard objectives add player_setup dummy
scoreboard objectives add player_id dummy
scoreboard players set total_players player_id 1
tickingarea remove_all
tickingarea add ~1 ~1 ~1 ~-1 ~-1 ~-1 main

# Gamerules
gamerule commandblockoutput false

# Install instructions
setblock ~ ~ ~ repeating_command_block
say Enter the command "/function main" and set the command block to always active.