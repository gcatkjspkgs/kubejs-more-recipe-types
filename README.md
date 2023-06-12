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

### Powah

#### Energizing

```js
global.more_recipe_types.powah.energizing(event, [<Input items>], <Output item>, <Energy (100 by default)>)
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
