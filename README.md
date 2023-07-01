# KubeJS More Recipe Types

[![kjspkg-available](https://github-production-user-asset-6210df.s3.amazonaws.com/79367505/250114674-fb848719-d52e-471b-a6cf-2c0ea6729f1c.svg)](https://kjspkglookup.modernmodpacks.site/#more-recipe-types)

## Quickstart

All new types are functions inside of the `global` object. They should be called inside of the `recipes` event like so: `global.mrt.<mod>.<type>(event, {args}, <id>)`. 

- the recipe id and almost all number and boolean parameters are optional
- to use nbt in items use Item.of(`<Item>`, `<Nbt>`)
- to use chance in items use Item.of(`<Item>`).withChance(`<Chance>`)

For more info look at the section below.

## Types

### Advent of Ascension 3

#### Infusion

```js
global.mrt.aoa3.infusion(event, <Output item>, <Main input item>, [<Other input items>], <id>)
```

#### Upgrade Kit

```js
global.mrt.aoa3.upgrade_kit(event, <Output item>, <Input item>, <Upgrade item>, <id>)
```

### Applied Energistics 2

#### Grinder

```js
global.mrt.appliedenergistics2.grinder(event, [<Output items>], <Input item>, <Turns (4 by default)>, <id>)
```

#### Inscriber

```js
global.mrt.appliedenergistics2.inscriber(event, <Output item>, [<Top input item>, <Middle input item>, <Bottom input item> (all air by default)], <Keep top and bottom (false by default)>, <id>)
```

### Ars Nouveau

#### Enchanting Apparatus

```js
global.mrt.ars_nouveau.enchanting_apparatus(event, <Output item>, <Middle input item>, [<Side input items>], <id>)
```

#### Crush (Glyph)

```js
global.mrt.ars_nouveau.crush(event, [Ingredient.of(<Output item>).withChance(<Chance>), ...], <Input item>, <id>)
```

#### Glyph Recipe (Glyph Press)

```js
global.mrt.ars_nouveau.glyph_recipe(event, <Output item>, <Input item>, <Tier (1-3, 1 by default)>, <id>)
```

### Astral Sorcery

#### Block Transmutation (Starlight Transmutation)

```js
global.mrt.astralsorcery.block_transmutation(event, <Output block>, [<Input block (can use multiple)>], <Starlight>, <id>)
```

#### Infuser (Starlight Infusion)

```js
global.mrt.astralsorcery.infuser(event, <Output item>, <Input item>, <Time in ticks (100 by default)>, <Consumption chance (float, 0.1 by default)>, [>Consume multiple fluids (False by default)>, <Accept chalice input (True by default)>, <Copy NBT to output (False by default)>](Array can contain any number of booleans), <Input fluid id name ("astralsorcery:liquid_starlight" by default)>, <id>)
```

#### Lightwell

```js
global.mrt.astralsorcery.lightwell(event, <Output fluid id name>, <Input item>, <Production multiplier (float, 1 by default)>, <Shatter multiplier (float, lower = faster shatter, 10 by default)>, <color (white color by default)>, <id>)
```

#### Liquid Interaction

```js
global.mrt.astralsorcery.liquid_interaction(event, <Output item>, [Fluid.of(<Input fluid 1>, <Amount>), <Chance consume fluid 1 (float, 100% by default)>], [Fluid.of(<Input fluid 2>, <Amount>), <Chance consume fluid 2 (float, 100% by default)>], <weight (1 by default)>, <id>)
```  

### Atum

#### Kiln

```js
global.mrt.atum.kiln(event, <Output item>, <Input item>, <Experience (float, 0.1 by default)>, <id>)
```

#### Quern

```js
global.mrt.atum.quern(event, <Output item>, <Input item>, <Rotations (1 by default)>, <id>)
```

#### Spinning Wheel

```js
global.mrt.atum.spinning_wheel(event, <Output item>, <Input item>, <Rotations (1 by default)>, <id>)
```

### Better End Forge

#### Alloying

```js
global.mrt.betterendforge.alloying(event, <Output item>, [<Input items>], <Experience (float, 1 by default)>, <Time in ticks (200 by default)>, <id>)
```

#### Anvil Smithing

```js
global.mrt.betterendforge.anvil_smithing(event, <Output item>, <Input item>, <Tool level (0 by default = wood/gold)>, <Anvil level (1 by default)>, <Damage to tool (1 by default)>, <id>)
```

#### Infusion

```js
global.mrt.betterendforge.infusion(event, <Output item>, <Middle Input item>, [<Catalyst Input items (clockwise from top middle)>], <Time in seconds (100 by default)>, <id>)
```

### (Space) Boss Tools

#### Blasting

```js
global.mrt.boss_tools.blasting(event, <Output item>, <Input item>, <Cook time (200 by default)>, <id>)
```

#### Compressing

```js
global.mrt.boss_tools.compressing(event, <Output item>, <Input item>, <Cook time (200 by default)>, <id>)
```

### Botania

#### Brew (Botanical Brewery)

```js
global.mrt.botania.brew(event, <Output Brew id name (example: "botania:haste")>, [<Input items>], <id>)
```

#### Elven Trade

```js
global.mrt.botania.elven_trade(event, [<Output items>], [<Input items>], <id>)
```

#### Mana Infusion

```js
global.mrt.botania.mana_infusion(event, <Output item>, <Output items>, <Mana (1000 by default)>, "Catalyst", <id>)
```

#### Petal Aplothecary

```js
global.mrt.botania.petal_apothecary(event, <Output item>, [<Input items>], <id>)
```

#### Pure Daisy

```js
global.mrt.botania.pure_daisy(event, <Output block>, <Input block>)
```

#### Runic Altar

```js
global.mrt.botania.runic_altar(event, <Output item>, [<Input items>], <Mana (5000 by default)>, <id>)
```

#### Terra Plate (Terrestrial Agglomeration)

```js
global.mrt.botania.terra_plate(event, <Output item>, [<Input items>], <Mana (100000 by default)>, <id>)
```

### Botany Pots

#### Crop

```js
global.mrt.botanypots.crop(event, [[<Output item>, <Chance (float, 1 by default)>, <Min rolls (1 by default)>, <Max Rolls (1 by default)>], ...], <Input seed>, [<Soil categories>], <Growth ticks (1200 by default)>, <Display block (Input seed by default. Change if seed is item!)>, <id>)
```

#### Fertilizer

```js
global.mrt.botanypots.fertilizer(event, <Input Fertilizer>, <Min ticks (100 by default)>, <Max ticks (Min ticks + 100 by default)>, <id>)
```

#### Soil

```js
global.mrt.botanypots.soil(event, <Input soil>, [<Soil categories>], <Growth modifier (float between -1 and 1, 0 by default)>, <Display block (Input soil by default. Change if soil is item!)>, <id>)
```

### Draconic Evolution

#### Fusion Crafting

```js
global.mrt.draconicevolution.fusion_crafting(event, <Output item>, <Main input item>, [<side Input items>], <Tier (of DRACONIUM = default, WYVERN, DRACONIC, CHAOTIC)>, <Energy (100000 by default)>, <id>)
```

### DivineRPG

#### Infusion Table

```js
global.mrt.divinerpg.infusion_table(event, <Output item>, <Input item>, <Input template>, <id>)
```

#### Fusion Crafting

```js
global.mrt.draconicevolution.fusion_crafting(event, <Output item>, <Main input item>, [<side Input items>], <Tier (of DRACONIUM = default, WYVERN, DRACONIC, CHAOTIC)>, <Energy (100000 by default)>, <id>)
```

### Elemental Craft

#### Binding (Element Binding)

```js
global.mrt.elementalcraft.binding(event, <Output item>, [<Input items>], <Element Type>, <Element Amount (1000 by default)>, <id>)
```

#### Crystallization (Gem Crystallization)

```js
global.mrt.elementalcraft.crystallization(event, [[<Output item>, <Weight (1 by default)>, <Quality (null by default)>], ...], [<Gem input item>, <Crystal input item>, <Shard input item>], <Element Type>, <Element Amount (1000 by default)>, <id>)
```

#### Grinding

```js
global.mrt.elementalcraft.grinding(event, <Output item>, <Input item>, <Element Amount (1000 by default)>, <id>)
```

#### Tool Infusion (Element Infusion)

```js
global.mrt.elementalcraft.tool_infusion(event, <Input item>, <Tool infusion type (e.g.: "elementalcraft:fire_aspect")>, <Element Amount (1000 by default)>, <id>)
```

#### Infusion (Element Infusion)

```js
global.mrt.elementalcraft.infusion(event, <Output Item>, <Input item>, <Element Type>, <Element Amount (1000 by default)>, <id>)
```

#### Inscription (Rune Inscription)

```js
global.mrt.elementalcraft.inscription(event, <Output item>, [<Slate input item>, <3 other input items>], <Element Type>, <Element Amount (1000 by default)>, <id>)
```

#### Pure Infusion

```js
global.mrt.elementalcraft.pureinfusion(event, <Output Item>, [<middle input item>, <Water input item>, <Fire input item>, <Earth input item>, <Air input item>], <Element Amount (1000 by default)>, <id>)
```

#### Spell Craft

```js
global.mrt.elementalcraft.spell_craft(event, <Output item>, [<Gem input item>, <Crystal input item>], <id>)
```

### Evil Craft

#### Blood Infuser

```js
global.mrt.evilcraft.blood_infuser(event, <Output item>, <Input item>, Fluid.of(<Input fluid>, <Amount>), <Tier (0-3, 0 by default)>, <time in ticks (200 by default)>, <Experience (float, 0.1 by default)>, <id>)
```

#### Environmental Accumulator / Sanguinary Environmental Accumulator

```js
global.mrt.evilcraft.environmental_accumulator(event, <Output item>, <Output weather (ANY, CLEAR, RAIN, LIGHTNING)>, <Input item>, <Input action (e.g. LIGHTNING)>´, <time in ticks (100 by default)>, <Cooldown time in ticks (0 by default)>, <id>)
```

### Ex Compressum

#### Chicken Stick

```js
global.mrt.excompressum.chicken_stick(event, [<Output items>], <Input item>, <id>)
```

#### Compressed Hammer

```js
global.mrt.excompressum.compressed_hammer(event, [<Output items>], <Input item>, <id>)
```

#### Heavy Sieve

```js
global.mrt.excompressum.heavy_sieve(event, <Input item>, <Input item from normal sieve>, <id>)
```

### Ex Nihilo Sequentia

#### Compost

```js
global.mrt.exnihilosequentia.compost(event, <Input item>, <Compost amount (100 by default)>, <id>)
```

#### Crook

```js
global.mrt.exnihilosequentia.crook(event, [<Output items>], <Input item>, <id>)
```

#### Crucible

```js
global.mrt.exnihilosequentia.crucible(event, Fluid.of(<Output fluid>, <Amount>), <Input item>, <Is wooden crucible ? (else fired, false by default)>, <id>)
```

#### Fluid Item (Transformation)

```js
global.mrt.exnihilosequentia.fluid_item(event, <Output item>, <Input fluid>, <Input item>, <id>)
```

#### Fluid On Top

```js
global.mrt.exnihilosequentia.fluid_on_top(event, <Output item>, <Input fluid 1>, <Input fluid 2>, <id>)
```

#### Fluid Transform

```js
global.mrt.exnihilosequentia.fluid_transform(event, <Output fluid>, <Input fluid>, <Input item>, <id>)
```

#### Hammer

```js
global.mrt.exnihilosequentia.hammer(event, [<Output items>], <Input item>, <id>)
```

#### Heat (Crucible Heat Sources)

```js
global.mrt.exnihilosequentia.heat(event, <Heat block>, <Blockstate json>, <Boost (1 by default)>, <id>)
```

#### Sieve

```js
global.mrt.exnihilosequentia.sieve(event, <Output item>, <Input item>, [[<Mesh ("string", "flint", "iron", "diamond", "emerald", "netherite")>, <Chance (float, 0.1 by default)>], ...], <Is waterlogged ? (false by default)>, <id>)
```

### FTB Industrial Contraptions

#### Antimatter Boost

```js
global.mrt.ftbic.antimatter_boost(event, <Input item>, <Boost (1000 by default)>, <id>)
```

#### Basic Generator Fuel

```js
global.mrt.ftbic.basic_generator_fuel(event, <Input item>, <Burn ticks (1 tick = 10 zaps, 200 by default)>, <id>)
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
global.mrt.ftbic.<type>(event, [<Output Items>], [<Input items>], <id>)
```

### Industrial Foregoing

#### Dissolution Chamber

```js
global.mrt.industrialforegoing.dissolution_chamber(event, <Output item>, <Output fluid (nothing by default)>, [<Input items>], Fluid.of(<Input fluid>, <Amount>), <Time in ticks (20 by default)>, <id>)
```

#### Fluid Extractor

```js
global.mrt.industrialforegoing.fluid_extractor(event, Fluid.of(<Output fluid>, <Amount>), <Input block>, <Block damage chance (float, 0% by default)>, <Result block ("minecraft:air" by default)>, <id>)
```

#### Laser Drill (Ore / Fluid)

```js
global.mrt.industrialforegoing.laser_drill(event, <Output item / Fluid.of(<Output Fluid>, <Amount>)>, <Catalyst Item>, [[[[<List values (empty by default)>], <List Blacklist ? (else whitelist, false by default)>, <List type ("minecraft:worldgen/biome" by default)>], [<Min depth (0 by default)>, <Max depth (64 by default)>], <Weight (1 by default)>], ...], <Fluid recipe ? (false by default)>, <Entity (only if Fluid recipe, no entity by default)>, <id>)
```

#### Stonework Generate

```js
global.mrt.industrialforegoing.stonework_generate(event, <Output Item>, [<Water requirement (1000 by default)>, <Water usage (0 by default)>], [<Lava requirement (1000 by default)>, <Lava usage (0 by default)>], <id>)
```

### Integrated Dynamics

#### Drying Basin

```js
global.mrt.integrateddynamics.drying_basin(event, <Output item>, <Input item>, [<Input fluid>, <Amount>], <Time in ticks (200 by default)>, <Copy to Mechanical ? (false by default, Time in ticks / 10, id + /in_mechanical)>, <id>)
```

#### Mechanical Drying Basin

```js
global.mrt.integrateddynamics.mechanical_drying_basin(event, <Output item>, <Input item>, [<Input fluid>, <Amount>], <Time in ticks (200 by default)>, <id>)
```

#### Squeezer

```js
global.mrt.integrateddynamics.squeezer(event, [<Output items>], Fluid.of(<Output fluid>, <Amount>), <Input item>, <id>)
```

#### Mechanical Squeezer

```js
global.mrt.integrateddynamics.mechanical_squeezer(event, [<Output items>], Fluid.of(<Output fluid>, <Amount>), <Input item>, <Time in 10 ticks (10 ticks by default)>, <id>)
```

### Mekanism

#### Activating (Solar Neutron Activator)

```js
global.mrt.mekanism.activating(event, [<Output gas>, <Amount (1 by default)>], [<Input gas>, <Amount (1 by default)>], <id>)
```

#### Centrifuging (Isotopic Centrifuge)

```js
global.mrt.mekanism.centrifuging(event, [<Output gas>, <Amount (1 by default)>], [<Input gas>, <Amount (1 by default)>], <id>)
```

#### Chemical Infusing

```js
global.mrt.mekanism.chemical_infusing(event, [<Output gas>, <Amount (1 by default)>], [[<Left input gas>, <Amount (1 by default)>], [<Right input gas>, <Amount (1 by default)>]], <id>)
```

#### Combining

```js
global.mrt.mekanism.combining(event, <Output item>, [<Main input item>, <Extra input item>], <id>)
```

#### (Osmium) Compressing

```js
global.mrt.mekanism.compressing(event, <Output item>, <Input item>, [<Input gas>, <Amount (200 by default)>], <id>)
```

#### Crushing

```js
global.mrt.mekanism.crushing(event, <Output item>, <Input item>, <id>)
```

#### Dissolution (Chemical Dissolution Chamber)

```js
global.mrt.mekanism.dissolution(event, [<Output gas or slurry>, <Amount (100 by default)>, <Is gas ? (else slurry, false by default)>], <Input item>, [<Input gas>, <Amount>], <id>)
```

#### Energy Conversion

```js
global.mrt.mekanism.energy_conversion(event, <Input item>, <Energy in Joule (10000 by default)>, <id>)
```

#### Enriching

```js
global.mrt.mekanism.enriching(event, <Output item>, <Input item>, <id>)
```

#### Evaporating (Thermal Evaporation Controller)

```js
global.mrt.mekanism.evaporating(event,  Fluid.of(<Output fluid>, <Amount>), [<Input fluid>, <Amount (1000 by default)>], <id>)
```

#### Gas Conversion

```js
global.mrt.mekanism.gas_conversion(event, [<Output gas>, <Amount (10 by default)>], <Input item>, <id>)
```

#### Infusion Conversion

```js
global.mrt.mekanism.infusion_conversion(event, [<Output infusion type>, <Amount (10 by default)>], <Input item>, <id>)
```

#### Injecting

```js
global.mrt.mekanism.injecting(event, <Output item>, <Input item>, [<Input gas>, <Amount (200 by default)>], <id>)
```

#### Metallurgic Infusing

```js
global.mrt.mekanism.metallurgic_infusing(event, <Output item>, <Input item>, [<Input infusion type>, <Amount (10 by default)>], <id>)
```

#### (Antiprotonic) Nucleosynthesizing

```js
global.mrt.mekanism.nucleosynthesizing(event, <Output item>, <Input item>, [<Input gas>, <Amount (1 by default)>], <Time in ticks (200 by default)>, <id>)
```

#### Oxidizing

```js
global.mrt.mekanism.oxidizing(event, [<Output gas>, <Amount (1 by default)>], <Input item>, <id>)
```

#### Paiting

```js
global.mrt.mekanism.painting(event, <Output item>, <Input item tag>, [<Input pigment>, <Amount (32 by default)>], <id>)
```

#### Pigment Extracting

```js
global.mrt.mekanism.pigment_extracting(event, [<Output pigment>, <Amount (32 by default)>], <Input item>, <id>)
```

#### Pigment Mixing

```js
global.mrt.mekanism.pigment_mixing(event, [<Output pigment>, <Amount (32 by default)>] , [[<Left input pigment>, <Amount (32 by default)>], [<Right input pigment>, <Amount (32 by default)>]], <id>)  
```

#### Purifying

```js 
global.mrt.mekanism.purifying(event, <Output item>, <Input item>, [<Input gas>, <Amount (200 by default)>], <id>)
```

#### Reaction (Pressurized Reaction Chamber)

```js
global.mrt.mekanism.reaction(event, <Output item>, <Output gas>, <Input item (needed)>, [<Input fluid (needed)>, <Amount (1000 by default)>], [<Input gas (needed)>, <Amount (1 by default)>], <Time in ticks (200 by default)>, <Energy in Joule per tick (5 by default)>, <id>)
```

#### Rotary (Condensentrator)

```js
global.mrt.mekanism.rotary(event, (To Gas:)[[<Output Gas>, <Amount (1 by default)>], [<Input fluid>, <Amount (1000 by default)>]], (To Fluid:)[[Fluid.of(<Output fluid>, <Amount>), [<Input Gas>, <Amount (1 by default)>]], <id>)
```

#### Sawing

```js
global.mrt.mekanism.sawing(event, [<Main output item>, <Second output item>], <Input item>, <Chance for second output (1.0 by default)>, <id>)
```

#### Separating (Electrolytic Separator)

```js
global.mrt.mekanism.separating(event, [[<Left output gas>, <Amount (1 by default)>], [<Right output gas>, <Amount (1 by default)>]], [<Input fluid>, <Amount (1000 by default)>], <id>)
```

#### Smelting

```js
global.mrt.mekanism.smelting(event, <Output item>, <input item>, <id>)
```

#### Washing

```js
global.mrt.mekanism.washing(event, [<Output Slurry>, <Amount (1 by default)>], [<Input fluid>, <Amount (1000 by default)>], [<Input Slurry>, <Amount (1 by default)>], <id>)
```

### Mystical Agriculture

#### Infusion (Crafting)

```js
global.mrt.mysticalagriculture.infusion(event, <Output item>, <Middle input item>, [<Side input items>], <id>)
```

#### (Seed) Reprocessing

```js
global.mrt.mysticalagriculture.reprocessor(event, <Output item>, <Input item>, <id>)
```

#### Soul Extraction

```js
global.mrt.mysticalagriculture.soul_extraction(event, <Soul type (e.g. "mysticalagriculture:skeleton")>, <Soul amount (1 by default)>, <Input item>, <id>)
```

### PneumaticCraft: Repressurized

#### Amadron (Amadron Tablet)

```js
global.mrt.pneumaticcraft.amadron(event, [<Output item / Fluid.of(<Output fluid>, <Amount>)>, <Output is Fluid ? (false by default)>], [<Input item / Fluid.of(<Input fluid>, <Amount>)>, <Input is Fluid ? (false by default)>], <id>)
```

#### Assembly Laser (Assembly Controller)

```js
global.mrt.pneumaticcraft.assembly_laser(event, <Output item>, <Input item>, <Type is Drill ? (false by default)>, <id>)
```

#### Explosion Crafting

```js
global.mrt.pneumaticcraft.explosion_crafting(event, [<Output items>], <Input item>, <Loss rate (0 - 100, 20 by default)>, <id>)
```

#### Heat Frame Cooling

```js
global.mrt.pneumaticcraft.heat_frame_cooling(event, <Output item>, [<Input fluid>, <Amount>], <Max temperature (0°C by default)>, [<Bonus output multiplier per degree (0 by default)>, <Bonus output max multiplier (0 by default)>], <id>)
```

#### (Block) Heat Properties

```js
global.mrt.pneumaticcraft.heat_properties(event, [<Output block from Cooling>, <Output block from Heating>], <Input block>, <Block temperature (25°C by default)>, <Thermal Resictance (20 by default)>, <Heat Capacity (1000 by default)>, <id>)
```

#### Fluid Mixer

```js
global.mrt.pneumaticcraft.fluid_mixer(event, Fluid.of(<Output Fluid>, <Amount>), <Output item>, [<Input Fluid 1>, <Amount (1000 by default)>], [<Input Fluid 2>, <Amount (1000 by default)>], <Pressure (1 by default)>, <Time in ticks (200 by default)>, <id>)
```

#### Fuel Quality

```js
global.mrt.pneumaticcraft.fuel_quality(event, <Input fluid>, <Air per bucket (100000 by default)>, <Burn rate (float, 1 by default)>, <id>)
```

#### Pressure Chamber

```js
global.mrt.pneumaticcraft.pressure_chamber(event, [<Output items>], [<Input items>], <Pressure (1 by default)>, <id>)
```

#### Refinery (Refinery Controller)

```js
global.mrt.pneumaticcraft.refinery(event, [Fluid.of(<Output Fluid>, <Amount>), ... (atleast two fluids)], [<Input fluid>, <Amount (1000 by default)>], [<Min temperature>, <Max temperature>], <id>)
```

#### Thermo Plant (Thermopneumatic Processing Plant)

```js
global.mrt.pneumaticcraft.thermo_plant(event, <Output item>, Fluid.of(<Ouput fluid>, <Amount>), <Input item>, [<Input fluid>, <Amount>], [<Min temperature>, <Max temperature>], <Pressure>, <Speed (float, 1 by default)>, <is Exothermic ? (false by default)>, <id>)   
```

### Powah

#### Energizing

```js
global.mrt.powah.energizing(event, <Output item>, [<Input items>], <Energy (100 by default)>, <id>)
```

### Psi

#### Trick Crafting (Spell Infusion)

```js
global.mrt.psi.trick_crafting(event, <Output item>, <Input item>, <Cad assemby>, <Trick>, <Dimension (Isn't listed in JEI)>, <id>)
```

### Silent Gear

#### Compounding

```js
global.mrt.silentgear.compounding(event, <Output item>, [<Input items>], <Gem Compounding ? (else Metal, false by default)>, <id>)
```

#### Salvaging

```js
global.mrt.silentgear.salvaging(event, [<Output items>], <Input item>, <id>)
```

### Silent's Mechanism's

#### Alloy Smelting

```js
global.mrt.silents_mechanisms.alloy_smelting(event, <Output item>, [[[<Input item>, ...], <Amount>], ...], <Time in ticks (200 by default)>, <id>)
```

#### Compressing

```js
global.mrt.silents_mechanisms.compressing(event, <Output item>, [[<Input item>, ...], <Amount>], <Output item>, <Time in ticks (200 by default)>, <id>)
```

#### Crushing

```js
global.mrt.silents_mechanisms.crushing(event, [<Output items>], <Input item>, <Time in ticks (200 by default)>, <id>)
```

#### Drying

```js
global.mrt.silents_mechanisms.drying(event, <Output item>, <Input item>, <Time in ticks (200 by default)>, <id>)
```

#### Infusing

```js
global.mrt.silents_mechanisms.infusing(event, <Output item>, <Input item>, [<Input fluid>, <Amount (1000 by default)>], <Time in ticks (200 by default)>, <id>)
```

#### Mixing

```js
global.mrt.silents_mechanisms.mixing(event, Fluid.of(<Output fluid>, <Amount>), [[<Input fluid>, <Amount (1000 by default)>], ...], <Time in ticks (200 by default)>, <id>)
```

#### Refining

```js
global.mrt.silents_mechanisms.refining(event, [Fluid.of(<Output fluid>, <Amount>), ...], [<Input fluid>, <Amount (1000 by default)>], <Time in ticks (200 by default)>, <id>)
```

#### Solidifying

```js
global.mrt.silents_mechanisms.solidifying(event, <Output item>, [<Input fluid>, <Amount (1000 by default)>], <Time in ticks (200 by default)>, <id>)
```

### Tinker's Construct

#### Alloy (Alloying)

```js
global.mrt.tconstruct.alloy(event, [[<Input fluid>, Fluid.of(<Output fluid>, <Amount>), <Amount (1000 by default)>], ...], <Temperature (100 by default)>, <id>)
```

#### Casting (Table / Basin)

```js
global.mrt.tconstruct.casting(event, <Output item>, [<Input fluid>, <Amount (1000 by default)>], <Input Cast>, <Basin ? (else table, false by default)>, <Cast consumed ? (false by default)>, <Time in ticks (60 by default)>, <id>)
```

#### Entity Melting

```js
global.mrt.tconstruct.entity_melting(event, Fluid.of(<Output fluid>, <Amount>), <Entity>, <Damage (1 by default)>, <id>)
```

#### Melting

```js
global.mrt.tconstruct.melting(event, Fluid.of(<Output fluid>, <Amount>), <Input item>, <Temperature (100 by default)>, <Time in ticks (300 by default)>, <id>)
```

#### Molding (Table)

```js
global.mrt.tconstruct.molding_table(event, <Output cast>, <Input Cast>, <Input item>, <id>)
```

#### Part Builder

```js
global.mrt.tconstruct.part_builder(event, <Output Part>, <Input pattern>, <Cost (1 by default)>, <id>)
```

#### Severing

```js
global.mrt.tconstruct.severing(event, <Output item>, <Entity>, <id>)
```

#### Casting Table with Parts (like Part Builder)

```js
global.mrt.tconstruct.table_casting_material(event, <Output Part>, <Input cast>, <Cost (1 by default)>, <id>)
```
