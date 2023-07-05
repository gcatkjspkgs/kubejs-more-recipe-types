### Immersive Petroleum

#### Coker

```js
global.mrt.immersivepetroleum.coker(event, [<Output fluid TAG (without #)>, <Amount (1000 by default)], <Output item>, [<Input fluid TAG (without #)>, <Amount (1000 by default)>], <input item>, <time in ticks (200 by default)>, <Energy per tick (512 by default)>, <id>)
```

#### Distillation (Tower)

```js
global.mrt.immersivepetroleum.distillation(event, [Fluid.of(<Output fluid>, <Amount>), ...], <Output item>, [<Input fluid TAG (without #)>, <Amount (1000 by default)>], <time in ticks (200 by default)>, <Energy per tick (2048 by default)>, <id>)
```

#### Hydrotreater (Sulfur Recovery Unit)

```js
global.mrt.immersivepetroleum.hydrotreater(event, Fluid.of(<Output fluid>, <Amount>), <Output item>, [[<Input fluid TAG right (without #)>, <Amount (1000 by default)>], [<Input fluid TAG left (without #)>, <Amount (1000 by default)>]], <time in ticks (200 by default)>, <Energy per tick (512 by default)>, <id>)
```