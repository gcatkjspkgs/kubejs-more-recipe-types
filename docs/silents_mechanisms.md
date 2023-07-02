### Silent's Mechanism's

#### Alloy Smelting

```js
global.mrt.silents_mechanisms.alloy_smelting(event, <Output item>, [[[<Input item>, ...], <Amount>], ...], <Time in ticks (200 by default)>, <id>)
```

#### Compressing

```js
global.mrt.silents_mechanisms.compressing(event, <Output item>, [[<Input item>, ...], <Amount>], <Output item>, <Time in ticks (200 by default)>, <id>)
```

#### Crushing

```js
global.mrt.silents_mechanisms.crushing(event, [<Output items>], <Input item>, <Time in ticks (200 by default)>, <id>)
```

#### Drying

```js
global.mrt.silents_mechanisms.drying(event, <Output item>, <Input item>, <Time in ticks (200 by default)>, <id>)
```

#### Infusing

```js
global.mrt.silents_mechanisms.infusing(event, <Output item>, <Input item>, [<Input fluid>, <Amount (1000 by default)>], <Time in ticks (200 by default)>, <id>)
```

#### Mixing

```js
global.mrt.silents_mechanisms.mixing(event, Fluid.of(<Output fluid>, <Amount>), [[<Input fluid>, <Amount (1000 by default)>], ...], <Time in ticks (200 by default)>, <id>)
```

#### Refining

```js
global.mrt.silents_mechanisms.refining(event, [Fluid.of(<Output fluid>, <Amount>), ...], [<Input fluid>, <Amount (1000 by default)>], <Time in ticks (200 by default)>, <id>)
```

#### Solidifying

```js
global.mrt.silents_mechanisms.solidifying(event, <Output item>, [<Input fluid>, <Amount (1000 by default)>], <Time in ticks (200 by default)>, <id>)
```