# KubeJS More Recipe Types

## Quickstart

All new types are functions inside of the `global` object. They should be called inside of the `recipes` event like so: `global.more_recipe_types.<mod>.<type>(event, {args})`. For more info look at the section below.

## Types

### Powah

#### Energizing

```js
global.more_recipe_types.powah.energizing(event, [<Input items>], <Output item>, <Energy (100 by default)>)
```

### Industrial Foregoing

#### Dissolution Chamber

```js
global.more_recipe_types.industrialforegoing.dissolution_chamber(event, [<Input items>], Fluid.of(<Input fluid>, <Amount (1b by default)>), <Output item>, <Output fluid (nothing by default)>, <Time in ticks (20 by default)>)
```

#### Fluid Extractor

```js
global.more_recipe_types.industrialforegoing.fluid_extractor(event, <Input block>, Fluid.of(<Output fluid>, <Amount (1b by default)>), <Block damage chance (float, 0% by default)>, <Result block ("minecraft:air" by default)>)
```
