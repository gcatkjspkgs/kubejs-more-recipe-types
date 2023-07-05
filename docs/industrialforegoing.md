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