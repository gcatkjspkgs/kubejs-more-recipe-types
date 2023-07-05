### Pneumatic Craft: Repressurized

#### Amadron (Amadron Tablet)

```js
global.mrt.pneumaticcraft.amadron(event, [<Output item / Fluid.of(<Output fluid>, <Amount>)>, <Output is Fluid ? (false by default)>], [<Input item / Fluid.of(<Input fluid>, <Amount>)>, <Input is Fluid ? (false by default)>], <id>)
```

#### Assembly Laser (Assembly Controller)

```js
global.mrt.pneumaticcraft.assembly_laser(event, <Output item>, <Input item>, <Type is Drill ? (false by default)>, <id>)
```

#### Explosion Crafting

```js
global.mrt.pneumaticcraft.explosion_crafting(event, [<Output items>], <Input item>, <Loss rate (0 - 100, 20 by default)>, <id>)
```

#### Heat Frame Cooling

```js
global.mrt.pneumaticcraft.heat_frame_cooling(event, <Output item>, [<Input fluid>, <Amount>], <Max temperature (0°C by default)>, [<Bonus output multiplier per degree (0 by default)>, <Bonus output max multiplier (0 by default)>], <id>)
```

#### (Block) Heat Properties

```js
global.mrt.pneumaticcraft.heat_properties(event, [<Output block from Cooling>, <Output block from Heating>], <Input block>, <Block temperature (25°C by default)>, <Thermal Resictance (20 by default)>, <Heat Capacity (1000 by default)>, <id>)
```

#### Fluid Mixer

```js
global.mrt.pneumaticcraft.fluid_mixer(event, Fluid.of(<Output Fluid>, <Amount>), <Output item>, [<Input Fluid 1>, <Amount (1000 by default)>], [<Input Fluid 2>, <Amount (1000 by default)>], <Pressure (1 by default)>, <Time in ticks (200 by default)>, <id>)
```

#### Fuel Quality

```js
global.mrt.pneumaticcraft.fuel_quality(event, <Input fluid>, <Air per bucket (100000 by default)>, <Burn rate (float, 1 by default)>, <id>)
```

#### Pressure Chamber

```js
global.mrt.pneumaticcraft.pressure_chamber(event, [<Output items>], [<Input items>], <Pressure (1 by default)>, <id>)
```

#### Refinery (Refinery Controller)

```js
global.mrt.pneumaticcraft.refinery(event, [Fluid.of(<Output Fluid>, <Amount>), ... (atleast two fluids)], [<Input fluid>, <Amount (1000 by default)>], [<Min temperature>, <Max temperature>], <id>)
```

#### Thermo Plant (Thermopneumatic Processing Plant)

```js
global.mrt.pneumaticcraft.thermo_plant(event, <Output item>, Fluid.of(<Ouput fluid>, <Amount>), <Input item>, [<Input fluid>, <Amount>], [<Min temperature>, <Max temperature>], <Pressure>, <Speed (float, 1 by default)>, <is Exothermic ? (false by default)>, <id>)   
```