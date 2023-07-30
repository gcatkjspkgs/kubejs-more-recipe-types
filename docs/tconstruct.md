### Tinker's Construct

#### Alloy (Alloying)

```js
global.mrt.tconstruct.alloy(event, [[<Input fluid>, Fluid.of(<Output fluid>, <Amount>), <Amount (1000 by default)>], ...], <Temperature (100 by default)>, <id>)
```

#### Casting (Table / Basin)

```js
global.mrt.tconstruct.casting(event, <Output item>, [<Input fluid>, <Amount (1000 by default)>], <Input Cast>, <Basin ? (else table, false by default)>, <Cast consumed ? (false by default)>, <Time in ticks (60 by default)>, <id>)
```

#### Entity Melting

```js
global.mrt.tconstruct.entity_melting(event, Fluid.of(<Output fluid>, <Amount>), <Entity>, <Damage (1 by default)>, <id>)
```

#### Melting

```js
global.mrt.tconstruct.melting(event, Fluid.of(<Output fluid>, <Amount>), <Input item>, <Temperature (100 by default)>, <Time in ticks (300 by default)>, <id>)
```

#### Molding (Table)

```js
global.mrt.tconstruct.molding_table(event, <Output cast>, <Input Cast>, <Input item>, <id>)
```

#### Ore Melting

```js
global.mrt.tconstruct.ore_melting(event, Fluid.of(<Output Fluid>, <Amount (write 144 if smeltery should output 2 ingots)>), [Fluid.of(<Output Fluid>, <Amount>), ...], <Input item>, <Temperature (100 by default)>, <Time in ticks (300 by default)>, <id>)
```

#### Part Builder

```js
global.mrt.tconstruct.part_builder(event, <Output Part>, <Input pattern>, <Cost (1 by default)>, <id>)
```

#### Severing

```js
global.mrt.tconstruct.severing(event, <Output item>, <Entity>, <id>)
```

#### Casting Table with Parts (like Part Builder)

```js
global.mrt.tconstruct.table_casting_material(event, <Output Part>, <Input cast>, <Cost (1 by default)>, <id>)
```
