# TICK
scoreboard players add @a player_tick 1

# MAIN
#execute @a ~ ~ ~ function ores


# SECONDS
scoreboard players add @a[scores={player_tick=20}] player_seconds 1
scoreboard players set @a[scores={player_tick=20}] player_tick 0

# ID SYSTEM
scoreboard players add total_players player_id 1
scoreboard players operation @a player_id %= total_players player_id
scoreboard players remove total_players player_id 1

execute @p[scores={player_id=0}] ~ ~ ~ scoreboard players add total_players player_id 1
scoreboard players operation @p[scores={player_id=0}] player_id = total_players player_id