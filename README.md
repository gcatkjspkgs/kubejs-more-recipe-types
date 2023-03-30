# KubeJS More Recipe Types

## Quickstart

All new types are functions inside of the `global` object. They should be called inside of the `recipes` event like so: `global.more_recipe_types.<mod>.<type>(event, {args})`. For more info look at the section below.

## Types

### Powah energizing

```js
global.more_recipe_types.powah.energizing(event, [<Input items>], <Output item>)
```
