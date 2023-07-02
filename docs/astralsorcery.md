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