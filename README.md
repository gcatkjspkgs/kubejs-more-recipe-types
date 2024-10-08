
# KubeJS More Recipe Types

[![kjspkg-available](https://github-production-user-asset-6210df.s3.amazonaws.com/79367505/250114674-fb848719-d52e-471b-a6cf-2c0ea6729f1c.svg)](https://kjspkglookup.modernmodpacks.site/#more-recipe-types)

## Quickstart

All new types are functions inside of the `global` object. They should be called inside of the `recipes` event like so: `global.mrt.<mod>.<type>(event, {args}, <id>)`. 

- the recipe id and almost all number and boolean parameters are optional
- to use nbt in items use Item.of(`<Item>`, `<Nbt>`)
- to use chance in items use Item.of(`<Item>`).withChance(`<Chance>`)

For more info look at the section below.

## Types

#### A

- [Alchemistry](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/alchemistry.md)
- [Apotheosis](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/apotheosis.md)
- [Advent of Ascension 3](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/aoa3.md)
- [Applied Energistics 2](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/appliedenergistics2.md)
- [Ars Nouveau](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/ars_nouveau.md)
- [Astral Sorcery](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/astralsorcery.md)
- [Atum](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/atum.md)

#### B

- [Better End Forge](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/betterendforge.md)
- [Boss Tools](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/boss_tools.md)
- [Boss Tools Giselle Addon](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/boss_tools_giselle_addon.md)
- [Botania](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/botania.md)
- [Botany Pots](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/botanypots.md)

#### C

- [Create Crafts & Additions](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/createaddition.md)

#### D

- [Divine RPG](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/divinerpg.md)
- [Draconic Evolution](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/draconicevolution.md)

#### E

- [Eidolon](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/eidolon.md) (Requires [Eidolon Data Recipes](https://www.curseforge.com/minecraft/mc-mods/eidolon-data-recipes))
- [Elemental Craft](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/elementalcraft.md)
- [Evil Craft](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/evilcraft.md)
- [Ex Compressum](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/excompressum.md)
- [Ex Nihilo Sequentia](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/exnihilosequentia.md)

#### F

- [Farmer's Delight](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/farmersdelight.md)
- [FTB Dripper](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/ftbdripper.md)
- [FTB Industrial Contraptions](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/ftbic.md)

#### I

- [Immersive Petroleum](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/immersivepetroleum.md)
- [Industrial Foregoing](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/industrialforegoing.md)
- [Integrated Dynamics](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/integrateddynamics.md)

#### L 

- [Lazier AE2](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/lazierae2.md)

#### M

- [Mekanism](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/mekanism.md)
- [Mystical Agriculture](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/mysticalagriculture.md)
- [Mythic Botany](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/mythicbotany.md)

#### N

- [Nature's Aura](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/naturesaura.md)

#### O

- [Occultism](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/occultism.md)

#### P

- [Pedestals](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/pedestals.md)
- [Pneumatic Craft: Repressurized](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/pneumaticcraft.md)
- [Powah](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/powah.md)
- [Psi](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/psi.md)

#### S

- [Silent Gear](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/silentgear.md)
- [Silent's Mechanism's](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/silents_mechanisms.md)

#### T

- [Tinker's Construct](https://github.com/gcatkjspkgs/kubejs-more-recipe-types/blob/main/docs/tconstruct.md)