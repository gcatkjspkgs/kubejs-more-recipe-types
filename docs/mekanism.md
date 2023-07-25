### Mekanism

#### Activating (Solar Neutron Activator)

```js
global.mrt.mekanism.activating(event, [<Output gas>, <Amount (1 by default)>], [<Input gas>, <Amount (1 by default)>], <id>)
```

#### Centrifuging (Isotopic Centrifuge)

```js
global.mrt.mekanism.centrifuging(event, [<Output gas>, <Amount (1 by default)>], [<Input gas>, <Amount (1 by default)>], <id>)
```

#### Chemical Infusing

```js
global.mrt.mekanism.chemical_infusing(event, [<Output gas>, <Amount (1 by default)>], [[<Left input gas>, <Amount (1 by default)>], [<Right input gas>, <Amount (1 by default)>]], <id>)
```

#### Combining

```js
global.mrt.mekanism.combining(event, <Output item>, [<Main input item>, <Extra input item>], <id>)
```

#### (Osmium) Compressing

```js
global.mrt.mekanism.compressing(event, <Output item>, <Input item>, [<Input gas>, <Amount (200 by default)>], <id>)
```

#### Crushing

```js
global.mrt.mekanism.crushing(event, <Output item>, <Input item>, <id>)
```

#### Crystallizing

```js
global.mrt.mekanism.crystallizing(event, <Output item>, [<Input gas or slurry>, <Amount (1 by default)>, <Is gas ? (else slurry, false by default)>], <id>)
```

#### Dissolution (Chemical Dissolution Chamber)

```js
global.mrt.mekanism.dissolution(event, [<Output gas or slurry>, <Amount (1 by default)>, <Is gas ? (else slurry, false by default)>], <Input item>, [<Input gas>, <Amount (100 by default)>], <id>)
```

#### Energy Conversion

```js
global.mrt.mekanism.energy_conversion(event, <Input item>, <Energy in Joule (10000 by default)>, <id>)
```

#### Enriching

```js
global.mrt.mekanism.enriching(event, <Output item>, <Input item>, <id>)
```

#### Evaporating (Thermal Evaporation Controller)

```js
global.mrt.mekanism.evaporating(event,  Fluid.of(<Output fluid>, <Amount>), [<Input fluid>, <Amount (1000 by default)>], <id>)
```

#### Gas Conversion

```js
global.mrt.mekanism.gas_conversion(event, [<Output gas>, <Amount (10 by default)>], <Input item>, <id>)
```

#### Infusion Conversion

```js
global.mrt.mekanism.infusion_conversion(event, [<Output infusion type>, <Amount (10 by default)>], <Input item>, <id>)
```

#### Injecting

```js
global.mrt.mekanism.injecting(event, <Output item>, <Input item>, [<Input gas>, <Amount (200 by default)>], <id>)
```

#### Metallurgic Infusing

```js
global.mrt.mekanism.metallurgic_infusing(event, <Output item>, <Input item>, [<Input infusion type>, <Amount (10 by default)>], <id>)
```

#### (Antiprotonic) Nucleosynthesizing

```js
global.mrt.mekanism.nucleosynthesizing(event, <Output item>, <Input item>, [<Input gas>, <Amount (1 by default)>], <Time in ticks (200 by default)>, <id>)
```

#### Oxidizing

```js
global.mrt.mekanism.oxidizing(event, [<Output gas>, <Amount (1 by default)>], <Input item>, <id>)
```

#### Paiting

```js
global.mrt.mekanism.painting(event, <Output item>, <Input item tag>, [<Input pigment>, <Amount (32 by default)>], <id>)
```

#### Pigment Extracting

```js
global.mrt.mekanism.pigment_extracting(event, [<Output pigment>, <Amount (32 by default)>], <Input item>, <id>)
```

#### Pigment Mixing

```js
global.mrt.mekanism.pigment_mixing(event, [<Output pigment>, <Amount (32 by default)>] , [[<Left input pigment>, <Amount (32 by default)>], [<Right input pigment>, <Amount (32 by default)>]], <id>)  
```

#### Purifying

```js 
global.mrt.mekanism.purifying(event, <Output item>, <Input item>, [<Input gas>, <Amount (200 by default)>], <id>)
```

#### Reaction (Pressurized Reaction Chamber)

```js
global.mrt.mekanism.reaction(event, <Output item>, <Output gas>, <Input item (needed)>, [<Input fluid (needed)>, <Amount (1000 by default)>], [<Input gas (needed)>, <Amount (1 by default)>], <Time in ticks (200 by default)>, <Energy in Joule per tick (5 by default)>, <id>)
```

#### Rotary (Condensentrator)

```js
global.mrt.mekanism.rotary(event, (To Gas:)[[<Output Gas>, <Amount (1 by default)>], [<Input fluid>, <Amount (1000 by default)>]], (To Fluid:)[[Fluid.of(<Output fluid>, <Amount>), [<Input Gas>, <Amount (1 by default)>]], <id>)
```

#### Sawing

```js
global.mrt.mekanism.sawing(event, [<Main output item>, <Second output item>], <Input item>, <Chance for second output (1.0 by default)>, <id>)
```

#### Separating (Electrolytic Separator)

```js
global.mrt.mekanism.separating(event, [[<Left output gas>, <Amount (1 by default)>], [<Right output gas>, <Amount (1 by default)>]], [<Input fluid>, <Amount (1000 by default)>], <id>)
```

#### Smelting

```js
global.mrt.mekanism.smelting(event, <Output item>, <input item>, <id>)
```

#### Washing

```js
global.mrt.mekanism.washing(event, [<Output Slurry>, <Amount (1 by default)>], [<Input fluid>, <Amount (1000 by default)>], [<Input Slurry>, <Amount (1 by default)>], <id>)
```
