say Hi
execute @s[scores={player_tick=20}] ~ ~ ~ detect ~ ~-30 ~ stone 0 scoreboard players add @s found_ore_spot 1

execute @s[scores={found_ore_spot=1..}] ~ ~ ~ say found ore
execute @s[scores={found_ore_spot=1..}] ~ ~-30 ~ setblock ~ ~ ~ stone 7
scoreboard players random @s[scores={found_ore_spot=1..}] ore_to_place 1 10
scoreboard players remove @s[scores={found_ore_spot=1..}] found_ore_spot 1

# Randomizing ore placement
execute @s[scores={ore_to_place=1}] ~ ~3 ~ setblock ~ ~ ~ iron_ore
scoreboard players set @s[scores={ore_to_place=1..}] ore_to_place 0