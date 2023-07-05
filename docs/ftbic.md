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