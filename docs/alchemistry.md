### Alchemistry

#### Atomizer

```js
global.mrt.alchemistry.atomizer(event, <Output item>, [<Input fluid>, <Amount (1000 by default)>], <id>)
```

#### (Chemical) Combiner

```js
global.mrt.alchemistry.combiner(event, <Output item>, [<Input items>], <id>)
```

#### (Chemical) Dissolver

```js
global.mrt.alchemistry.dissolver(event, [[[Output items], <Chance / Weight (1 by default)>], ...], <Input item>, <Chance is relative ? (false by default, if relative it works like weight)>, <Amount of output rolls (1 by default)>, <id>)
```

#### Evaporator

```js
global.mrt.alchemistry.evaporator(event, <Output item>, [<Input fluid>, <Amount (1000 by default)>], <id>)
```

#### Liquifier

```js
global.mrt.alchemistry.liquifier(event, Fluid.of(<Output fluid>, <Amount>), <Input item>, <id>)
```