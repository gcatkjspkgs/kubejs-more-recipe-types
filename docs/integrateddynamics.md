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