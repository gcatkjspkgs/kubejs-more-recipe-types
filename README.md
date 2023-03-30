# KubeJS More Recipe Types

## Quickstart

All new types are functions inside of the `global` object. Usually, if you want to call them, add this to the `recipes` event: `global.more_recipe_types.<mod>.<type>(event, {args})`. For more info look at the section below.

## Types

### Powah energizing

```js
global.more_recipe_types.powah.energizing(event, "minecraft:stick", "minecraft:iron_ingot")
```
