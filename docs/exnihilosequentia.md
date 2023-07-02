### Ex Nihilo Sequentia

#### Compost

```js
global.mrt.exnihilosequentia.compost(event, <Input item>, <Compost amount (100 by default)>, <id>)
```

#### Crook

```js
global.mrt.exnihilosequentia.crook(event, [<Output items>], <Input item>, <id>)
```

#### Crucible

```js
global.mrt.exnihilosequentia.crucible(event, Fluid.of(<Output fluid>, <Amount>), <Input item>, <Is wooden crucible ? (else fired, false by default)>, <id>)
```

#### Fluid Item (Transformation)

```js
global.mrt.exnihilosequentia.fluid_item(event, <Output item>, <Input fluid>, <Input item>, <id>)
```

#### Fluid On Top

```js
global.mrt.exnihilosequentia.fluid_on_top(event, <Output item>, <Input fluid 1>, <Input fluid 2>, <id>)
```

#### Fluid Transform

```js
global.mrt.exnihilosequentia.fluid_transform(event, <Output fluid>, <Input fluid>, <Input item>, <id>)
```

#### Hammer

```js
global.mrt.exnihilosequentia.hammer(event, [<Output items>], <Input item>, <id>)
```

#### Heat (Crucible Heat Sources)

```js
global.mrt.exnihilosequentia.heat(event, <Heat block>, <Blockstate json>, <Boost (1 by default)>, <id>)
```

#### Sieve

```js
global.mrt.exnihilosequentia.sieve(event, <Output item>, <Input item>, [[<Mesh ("string", "flint", "iron", "diamond", "emerald", "netherite")>, <Chance (float, 0.1 by default)>], ...], <Is waterlogged ? (false by default)>, <id>)
```