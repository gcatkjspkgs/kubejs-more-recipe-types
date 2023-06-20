# KubeJS More Recipe Types

## Quickstart

All new types are functions inside of the `global` object. They should be called inside of the `recipes` event like so: `global.more_recipe_types.<mod>.<type>(event, {args})`. For more info look at the section below.

## Types

### Applied Energistics 2

#### Grinder

```js
global.more_recipe_types.appliedenergistics2.grinder(event, <Input item>, [<Output items>], <Turns (4 by default)>)
```

#### Inscriber

```js
global.more_recipe_types.appliedenergistics2.inscriber(event, [<Top input item>, <Middle input item>, <Bottom input item> (all air by default)], <Output item>, <Keep top and bottom (false by default)>)
```

### Astral Sorcery

#### Block Transmutation (Starlight Transmutation)

```js
global.more_recipe_types.astralsorcery.block_transmutation(event, [<Input block (can use multiple)>], <Output block>, <Starlight>)
```

#### Infuser (Starlight Infusion)

```js
global.more_recipe_types.astralsorcery.infuser(event, <Input item>, <Output item>, <Duration (100 by default)>, <Consumption chance (float, 0.1 by default)>, [>Consume multiple fluids (False by default)>, <Accept chalice input (True by default)>, <Copy NBT to output (False by default)>](Array can contain any number of booleans), <Input fluid id name ("astralsorcery:liquid_starlight" by default)>)
```

#### Lightwell

```js
global.more_recipe_types.astralsorcery.lightwell(event, <Input item>, <Output fluid id name>, <Production multiplier (float, 1 by default)>, <Shatter multiplier (float, lower = faster shatter, 10 by default)>, <color (white color by default)>)
```

#### Liquid Interaction

```js
global.more_recipe_types.astralsorcery.liquid_interaction(event, [Fluid.of(<Input fluid 1>, <Amount>), <Chance consume fluid 1 (float, 100% by default)>], [Fluid.of(<Input fluid 2>, <Amount>), <Chance consume fluid 2 (float, 100% by default)>], <Output item>, <weight (1 by default)>)
```  

### Atum

#### Kiln

```js
global.more_recipe_types.atum.kiln(event, <Input item>, <Output item>, <Experience (float, 0.1 by default)>)
```

#### Quern

```js
global.more_recipe_types.atum.quern(event, <Input item>, <Output item>, <Rotations (1 by default)>)
```

#### Spinning Wheel

```js
global.more_recipe_types.atum.spinning_wheel(event, <Input item>, <Output item>, <Rotations (1 by default)>)
```

### Better End Forge

#### Alloying

```js
global.more_recipe_types.betterendforge.alloying(event, [<Input items>], <Output item>, <Experience (float, 1 by default)>, <Time in ticks (200 by default)>)
```

#### Anvil Smithing

```js
global.more_recipe_types.betterendforge.anvil_smithing(event, <Input item>, <Output item>, <Tool level (0 by default = wood/gold)>, <Anvil level (1 by default)>, <Damage to tool (1 by default)>)
```

#### Infusion

```js
global.more_recipe_types.betterendforge.infusion(event, <Middle Input item>, [<Catalyst Input items (clockwise from top middle)>], <Output item>, <Time in seconds (100 by default)>)
```

### (Space) Boss Tools

#### Blasting

```js
global.more_recipe_types.boss_tools.blasting(event, <Input item>, <Output item>, <Cook time (200 by default)>)
```

#### Compressing

```js
global.more_recipe_types.boss_tools.compressing(event, <Input item>, <Output item>, <Cook time (200 by default)>)
```

### Botania

#### Brew (Botanical Brewery)

```js
global.more_recipe_types.botania.brew(event, [<Input items>], <Output Brew id name (example: "botania:haste")>)
```

#### Elven Trade

```js
global.more_recipe_types.botania.elven_trade(event, [<Input items>], [<Output items>])
```

#### Mana Infusion

```js
global.more_recipe_types.botania.mana_infusion(event, <Output items>, <Output item>, <Mana (1000 by default)>, "Catalyst")
```

#### Petal Aplothecary

```js
global.more_recipe_types.botania.petal_apothecary(event, [<Input items>], <Output item>)
```

#### Pure Daisy

```js
global.more_recipe_types.botania.pure_daisy(event, <Input block>, <Output block>)
```

#### Runic Altar

```js
global.more_recipe_types.botania.runic_altar(event, [<Input items>], <Output item>, <Mana (5000 by default)>)
```

#### Terra Plate (Terrestrial Agglomeration)

```js
global.more_recipe_types.botania.terra_plate(event, [<Input items>], <Output item>, <Mana (100000 by default)>)
```

### Botany Pots

#### Crop

```js
global.more_recipe_types.botanypots.crop(event, <Input seed>, [<Soil categories>], [[<Output item>, <Chance (float, 1 by default)>, <Min rolls (1 by default)>, <Max Rolls (1 by default)>], ...], <Growth ticks (1200 by default)>, <Display block (Input seed by default. Change if seed is item!)>)
```

#### Fertilizer

```js
global.more_recipe_types.botanypots.fertilizer(event, <Input Fertilizer>, <Min ticks (100 by default)>, <Max ticks (Min ticks + 100 by default)>)
```

#### Soil

```js
global.more_recipe_types.botanypots.soil(event, <Input soil>, [<Soil categories>], <Growth modifier (float between -1 and 1, 0 by default)>, <Display block (Input soil by default. Change if soil is item!)>)
```

### Draconic Evolution

#### Fusion Crafting

```js
global.more_recipe_types.draconicevolution.fusion_crafting(event, <Main input item>, [<side Input items>], <Output item>, <Tier (of DRACONIUM = default, WYVERN, DRACONIC, CHAOTIC)>, <Energy (100000 by default)>)
```

### Elemental Craft

#### Binding (Element Binding)

```js
global.more_recipe_types.elementalcraft.binding(event, [<Input items>], <Output item>, <Element Type>, <Element Amount (1000 by default)>)
```

#### Crystallization (Gem Crystallization)

```js
global.more_recipe_types.elementalcraft.crystallization(event, [<Gem input item>, <Crystal input item>, <Shard input item>], [[<Output item>, <Weight (1 by default)>, <Quality (null by default)>], ...], <Element Type>, <Element Amount (1000 by default)>)
```

#### Grinding

```js
global.more_recipe_types.elementalcraft.grinding(event, <Input item>, <Output item>, <Element Amount (1000 by default)>)
```

#### Tool Infusion (Element Infusion)

```js
global.more_recipe_types.elementalcraft.tool_infusion(event, <Input item>, <Tool infusion type (e.g.: "elementalcraft:fire_aspect")>, <Element Amount (1000 by default)>)
```

#### Infusion (Element Infusion)

```js
global.more_recipe_types.elementalcraft.infusion(event, <Input item>, <Output Item>, <Element Type>, <Element Amount (1000 by default)>)
```

#### Inscription (Rune Inscription)

```js
global.more_recipe_types.elementalcraft.inscription(event, [<Slate input item>, <3 other input items>], [<Output item>, <nbt>], <Element Type>, <Element Amount (1000 by default)>)
```

#### Pure Infusion

```js
global.more_recipe_types.elementalcraft.pureinfusion(event, [<middle input item>, <Water input item>, <Fire input item>, <Earth input item>, <Air input item>], <Output Item>, <Element Amount (1000 by default)>)
```

#### Spell Craft

```js
global.more_recipe_types.elementalcraft.spell_craft(event, [<Gem input item>, <Crystal input item>], [<Output item>, <nbt>])
```

### Evil Craft

#### Blood Infuser

```js
global.more_recipe_types.evilcraft.blood_infuser(event, <Input item>, Fluid.of(<Input fluid>, <Amount>), <Output item>, <Tier (0-3, 0 by default)>, <time in ticks (200 by default)>, <Experience (float, 0.1 by default)>)
```

#### Environmental Accumulator / Sanguinary Environmental Accumulator

```js
global.more_recipe_types.evilcraft.environmental_accumulator(event, <Input item>, <Input action (e.g. LIGHTNING)>, <Output item>, <Output weather (ANY, CLEAR, RAIN, LIGHTNING)>, <time in ticks (100 by default)>, <Cooldown time in ticks (0 by default)>)
```

### FTB Industrial Contraptions

#### Antimatter Boost

```js
global.more_recipe_types.ftbic.antimatter_boost(event, <Input item>, <Boost (1000 by default)>)
```

#### Basic Generator Fuel

```js
global.more_recipe_types.ftbic.basic_generator_fuel(event, <Input item>, <Burn ticks (1 tick = 10 zaps, 200 by default)>)
```

#### Other Machines

Supported types:

- canning
- compressing
- extruding
- macerating
- rolling
- seperating

```js
global.more_recipe_types.ftbic.<type>(event, [<Input items>], [<Output Items>])
```

Some notes:

- To use nbt in input items use Item.of("Input item", "nbt")
- To use chance in output items use Item.of("Input item").withChance("Chance")

### Industrial Foregoing

#### Dissolution Chamber

```js
global.more_recipe_types.industrialforegoing.dissolution_chamber(event, [<Input items>], Fluid.of(<Input fluid>, <Amount>), <Output item>, <Output fluid (nothing by default)>, <Time in ticks (20 by default)>)
```

#### Fluid Extractor

```js
global.more_recipe_types.industrialforegoing.fluid_extractor(event, <Input block>, Fluid.of(<Output fluid>, <Amount>), <Block damage chance (float, 0% by default)>, <Result block ("minecraft:air" by default)>)
```

#### Laser Drill (Ore / Fluid)

```js
global.more_recipe_types.industrialforegoing.laser_drill(event, <Output item / Fluid.of(<Output Fluid>, <Amount>)>, <Catalyst Item>, [[[[<List values (empty by default)>], <List Blacklist ? (else whitelist, false by default)>, <List type ("minecraft:worldgen/biome" by default)>], [<Min depth (0 by default)>, <Max depth (64 by default)>], <Weight (1 by default)>], ...], <Fluid recipe ? (false by default)>, <Entity (only if Fluid recipe, no entity by default)>)
```

#### Stonework Generate

```js
global.more_recipe_types.industrialforegoing.stonework_generate(event, <Output Item>, [<Water requirement (1000 by default)>, <Water usage (0 by default)>], [<Lava requirement (1000 by default)>, <Lava usage (0 by default)>])
```

### Mystical Agriculture

#### Infusion (Crafting)

```js
global.more_recipe_types.mysticalagriculture.infusion(event, <Middle input item>, [<Side input items>], <Output item>)
```

#### (Seed) Reprocessing

```js
global.more_recipe_types.mysticalagriculture.reprocessor(event, <Input item>, <Output item>)
```

#### Soul Extraction

```js
global.more_recipe_types.mysticalagriculture.soul_extraction(event, <Input item>, <Soul type (e.g. "mysticalagriculture:skeleton")>, <Soul amount (1 by default)>)
```

### PneumaticCraft: Repressurized

#### Amadron (Amadron Tablet)

```js
global.more_recipe_types.pneumaticcraft.amadron(event, [<Input item / Fluid.of(<Input fluid>, <Amount>)>, <Input is Fluid ? (false by default)>], [<Output item / Fluid.of(<Output fluid>, <Amount>)>, <Output is Fluid ? (false by default)>])
```

#### Assembly Laser (Assembly Controller)

```js
global.more_recipe_types.pneumaticcraft.assembly_laser(event, <Input item>, <Output item>, <Type is Drill ? (false by default)>)
```

#### Explosion Crafting

```js
global.more_recipe_types.pneumaticcraft.explosion_crafting(event, <Input item>, [<Output items>], <Loss rate (0 - 100, 20 by default)>)
```

#### Heat Frame Cooling

```js
global.more_recipe_types.pneumaticcraft.heat_frame_cooling(event, [<Input fluid>, <Amount>], <Output item>, <Max temperature (0°C by default)>, [<Bonus output multiplier per degree (0 by default)>, <Bonus output max multiplier (0 by default)>])
```

#### (Block) Heat Properties

```js
global.more_recipe_types.pneumaticcraft.heat_properties(event, <Input block>, [<Output block from Cooling>, <Output block from Heating>], <Block temperature (25°C by default)>, <Thermal Resictance (20 by default)>, <Heat Capacity (1000 by default)>)
```

#### Fluid Mixer

```js
global.more_recipe_types.pneumaticcraft.fluid_mixer(event, [<Input Fluid 1>, <Amount (1000 by default)>], <Input Fluid 2>, <Amount (1000 by default)>], Fluid.of(<Output Fluid>, <Amount>), <Output item>, <Pressure (1 by default)>, <Time in ticks (200 by default)>)
```

#### Fuel Quality

```js
global.more_recipe_types.pneumaticcraft.fuel_quality(event, <Input fluid>, <Air per bucket (100000 by default)>, <Burn rate (float, 1 by default)>)
```

#### Pressure Chamber

```js
global.more_recipe_types.pneumaticcraft.pressure_chamber(event, [<Input items>], [<Output items>], <Pressure (1 by default)>)
```

#### Refinery (Refinery Controller)

```js
global.more_recipe_types.pneumaticcraft.refinery(event, [<Input fluid>, <Amount (1000 by default)>], [Fluid.of(<Output Fluid>, <Amount>), ... (atleast two fluids)], [<Min temperature>, <Max temperature>])
```

#### Thermo Plant (Thermopneumatic Processing Plant)

```js
global.more_recipe_types.pneumaticcraft.thermo_plant(event, <Input item>, [<Input fluid>, <Amount>], <Output item>, Fluid.of(<Ouput fluid>, <Amount>), [<Min temperature>, <Max temperature>], <Pressure>, <Speed (float, 1 by default)>, <is Exothermic ? (false by default)>)   
```

### Powah

#### Energizing

```js
global.more_recipe_types.powah.energizing(event, [<Input items>], <Output item>, <Energy (100 by default)>)
```

### Silent's Mechanism's

#### Alloy Smelting

```js
global.more_recipe_types.silents_mechanisms.alloy_smelting(event, [[[<Input item>, ...], <Amount>], ...], <Output item>, <Time in ticks (200 by default)>)
```

#### Compressing

```js
global.more_recipe_types.silents_mechanisms.compressing(event, [[<Input item>, ...], <Amount>], <Output item>, <Time in ticks (200 by default)>)
```

#### Crushing

```js
global.more_recipe_types.silents_mechanisms.crushing(event, <Input item>, [<Output items>], <Time in ticks (200 by default)>)
```

#### Drying

```js
global.more_recipe_types.silents_mechanisms.drying(event, <Input item>, <Output item>, <Time in ticks (200 by default)>)
```

#### Infusing

```js
global.more_recipe_types.silents_mechanisms.infusing(event, <Input item>, [<Input fluid>, <Amount (1000 by default)>], <Output item>, <Time in ticks (200 by default)>)
```

#### Mixing

```js
global.more_recipe_types.silents_mechanisms.mixing(event, [[<Input fluid>, <Amount (1000 by default)>], ...], Fluid.of(<Output fluid>, <Amount>), <Time in ticks (200 by default)>)
```

#### Refining

```js
global.more_recipe_types.silents_mechanisms.refining(event, [<Input fluid>, <Amount (1000 by default)>], [Fluid.of(<Output fluid>, <Amount>), ...], <Time in ticks (200 by default)>)
```

#### Solidifying

```js
global.more_recipe_types.silents_mechanisms.solidifying(event, [<Input fluid>, <Amount (1000 by default)>], <Output item>, <Time in ticks (200 by default)>)
```

### Tinker's Construct

#### Alloy (Alloying)

```js
global.more_recipe_types.tconstruct.alloy(event, [[<Input fluid>, <Amount (1000 by default)>], ...], Fluid.of(<Output fluid>, <Amount>), <Temperature (100 by default)>)
```

#### Casting (Table / Basin)

```js
global.more_recipe_types.tconstruct.casting(event, [<Input fluid>, <Amount (1000 by default)>], <Input Cast>, <Output item>, <Basin ? (else table, false by default)>, <Cast consumed ? (false by default)>, <Time in ticks (60 by default)>)
```

#### Entity Melting

```js
global.more_recipe_types.tconstruct.entity_melting(event, <Entity>, Fluid.of(<Output fluid>, <Amount>), <Damage (1 by default)>)
```

#### Melting

```js
global.more_recipe_types.tconstruct.melting(event, <Input item>, Fluid.of(<Output fluid>, <Amount>), <Temperature (100 by default)>, <Time in ticks (300 by default)>)
```

#### Molding (Table)

```js
global.more_recipe_types.tconstruct.molding_table(event, <Input Cast>, <Input item>, <Output cast>)
```

#### Part Builder

```js
global.more_recipe_types.tconstruct.part_builder(event, <Input pattern>, <Output Part>, <Cost (1 by default)>)
```

#### Severing

```js
global.more_recipe_types.tconstruct.severing(event, <Entity>, <Output item>)
```

#### Casting Table with Parts (like Part Builder)

```js
global.more_recipe_types.tconstruct.table_casting_material(event, <Input cast>, <Output Part>, <Cost (1 by default)>)
```
