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

### Powah

#### Energizing

```js
global.more_recipe_types.powah.energizing(event, [<Input items>], <Output item>, <Energy (100 by default)>)
```
