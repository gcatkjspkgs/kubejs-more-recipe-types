function arrConvert(i) {
	if (!Array.isArray(i)) i = [i]
	return i
}
function ingredientsConvert(i) {
	let ingredients = []
	i.forEach(item => {ingredients.push(Ingredient.of(item))})
	return ingredients
}
function fluidConvert(i) {
	if (typeof i == "string") i = Fluid.of(i, 1000)
	return i
}
function fluidsConvert(i) {
	let fluids = []
	i.forEach(fluid => {fluids.push(fluidConvert(fluid).toJson())})
	return fluids
}
function fluidConvertWithTag(i, amount) {
	let fluid
	i.substring(0, 1)==="#" ? fluid = {tag: i.substring(1)} : fluid = {fluid: i}
	fluid["amount"] = amount
	return fluid
}
function blockConvert(i, withType) {
	let block
	i.substring(0, 1)==="#" ? block = {tag: i.substring(1)} : block = {block: i}
	if (withType) i.substring(0, 1)==="#" ? block["type"] = "tag" : block["type"] = "block"
	return block
}
function blockIngredientsConvert(i, withType) {
	let ingredients = []
	i.forEach(block => {ingredients.push(blockConvert(block, withType))})
	return ingredients
}
function addFTBICRecipes(event, input, output, type) {
	let ingredients = []
	input.forEach(item => {
		let ingredient = Ingredient.of(item)
		let ingredientJson = {ingredient: {item: ingredient.id}, count: ingredient.getCount()}
		
		if (ingredient.nbt!=null){
			ingredientJson["ingredient"]["type"] = "forge:nbt"
			ingredientJson["ingredient"]["nbt"] = String(ingredient.nbt)
		}
		ingredients.push(ingredientJson)
	})

	event.custom({
		type: type,

		inputItems: ingredients,
		outputItems: ingredientsConvert(arrConvert(output))
	})
}

let i

onEvent("loaded", e => {
	global.more_recipe_types = {
		appliedenergistics2: {
			grinder: (event, input, output, turns) => {
				output = ingredientsConvert(arrConvert(output).slice(0, 3))
				if (turns==null) turns = 4
				console.log(Ingredient.of(input))

				event.custom({
					type: "appliedenergistics2:grinder",

					input: Ingredient.of(input),
					result: {
						primary: output[0],
						optional: output.slice(1, 3)
					},

					turns: turns
				})
			},
			inscriber: (event, input, output, keep) => {
				input = ingredientsConvert(arrConvert(input).slice(0, 3))
				let input_names = ["top", "middle", "bottom"]
				let ingredients = {}
				for (i = 0; i < input.length; i++) {
					if (input[i] !== "" && input[i] !== "minecraft:air") {
						ingredients[input_names[i]] = input[i]
					}
				}

				event.custom({
					type: "appliedenergistics2:inscriber",
					mode: keep ? "inscribe" : "press",

					ingredients: ingredients,
					result: Ingredient.of(output)
				})
			}
		},

		astralsorcery: {
			block_transmutation: (event, input, output, starlight) => {
				if (starlight==null) starlight = 200

				event.custom({
					type: "astralsorcery:block_transmutation",

					input: blockIngredientsConvert(arrConvert(input), false),
					output: {block: output},

					starlight: starlight
				})
			},
			infuser: (event, input, output, duration, consumptionChance, settings, inputFluid) => {
				if (duration==null) duration = 100
				if (consumptionChance==null) consumptionChance = 0.1
				if (settings==null) settings = [false, true, false]
				settings = settings.slice(0, 3)
				settings = settings.concat([false, true, false].slice(settings.length, 3))
				if (inputFluid==null) inputFluid = "astralsorcery:liquid_starlight"

				event.custom({
					type: "astralsorcery:infuser",

					fluidInput: inputFluid,
					input: Ingredient.of(input),
					output: Ingredient.of(output),

					consumptionChance: consumptionChance,
					duration: duration,
					consumeMultipleFluids: settings[0],
					acceptChaliceInput: settings[1],
					copyNBTToOutputs: settings[2]
				})
			},
			lightwell: (event, input, outputFluid, productionMultiplier, shatterMultiplier, color) => {
				if (productionMultiplier==null) productionMultiplier = 1
				if (shatterMultiplier==null) shatterMultiplier = 10
				if (color==null) color = -2236929

				event.custom({
					type: "astralsorcery:lightwell",

					input: Ingredient.of(input),
					output: outputFluid,

					productionMultiplier: productionMultiplier,
					shatterMultiplier: shatterMultiplier,
					color: color
				})
			},
			liquid_interaction: (event, inputFluid1, inputFluid2, output, weight) => {
				inputFluid1 = arrConvert(inputFluid1)
				inputFluid2 = arrConvert(inputFluid2)
				let fluid1 = fluidConvert(inputFluid1[0])
				let fluid2 = fluidConvert(inputFluid2[0])
				if (typeof inputFluid1[1]==='undefined') inputFluid1.push(1)
				if (typeof inputFluid2[1]==='undefined') inputFluid2.push(1)
				if (weight==null) weight = 1

				event.custom({
					type: "astralsorcery:liquid_interaction",

					reactant1: fluid1.id,
					reactant1Amount: fluid1.getAmount(),
					chanceConsumeReactant1: inputFluid1[1],

					reactant2: fluid2.id,
					reactant2Amount: fluid2.getAmount(),
					chanceConsumeReactant2: inputFluid2[1],

					result: {
						id: "astralsorcery:drop_item",
						data: {
							output: Ingredient.of(output)
						}
					},

					weight: weight
				})
			}
		},

		boss_tools: {
			blasting: (event, input, output, cookTime) => {
				if (cookTime==null) cookTime = 200

				event.custom({
					type: "boss_tools:blasting",

					input: {ingredient: Ingredient.of(input)},
					output: Ingredient.of(output),

					cookTime: cookTime
				})
			},
			compressing: (event, input, output, cookTime) => {
				if (cookTime==null) cookTime = 200

				event.custom({
					type: "boss_tools:compressing",

					input: {ingredient: Ingredient.of(input)},
					output: Ingredient.of(output),

					cookTime: cookTime
				})
			}
		},

		botania: {
			brew: (event, input, outputBrew) => {
				event.custom({
					type: "botania:brew",

					brew: outputBrew,
					ingredients: ingredientsConvert(arrConvert(input))
				})
			},
			elven_trade: (event, input, output) => {
				event.custom({
					type: "botania:elven_trade",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: ingredientsConvert(arrConvert(output))
				})
			},
			mana_infusion: (event, input, output, mana, catalyst) => {
				if (mana==null) mana = 1000

				event.custom({
					type: "botania:mana_infusion",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					mana: mana,
					catalyst: catalyst==null ? null : blockConvert(catalyst, true)
				})
			},
			petal_apothecary: (event, input, output) => {
				event.custom({
					type: "botania:petal_apothecary",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output)
				})
			},
			pure_daisy: (event, input, output) => {
				event.custom({
					type: "botania:pure_daisy",

					input: blockConvert(input, true),
					output: {name: output}
				})
			},
			runic_altar: (event, input, output, mana) => {
				if (mana==null) mana = 5000

				event.custom({
					type: "botania:runic_altar",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output),

					mana: mana
				})
			},
			terra_plate: (event, input, output, mana) => {
				if (mana==null) mana = 100000

				event.custom({
					type: "botania:terra_plate",

					ingredients: ingredientsConvert(arrConvert(input)),
					result: Ingredient.of(output),

					mana: mana
				})
			}
		},

		botanypots: {
			crop: (event, inputSeed, SoilCategories, output, growthTicks, displayBlock) => {
				if (growthTicks==null) growthTicks = 1200
				if (displayBlock==null) displayBlock = inputSeed
				let results = []
				output.forEach(roll => {
					results.push({
						output: Ingredient.of(roll[0]),
						chance: typeof roll[1]==='undefined' ? 1 : roll[1],
						minRolls: typeof roll[2]==='undefined' ? 1 : roll[2],
						maxRolls: typeof roll[3]==='undefined' ? 1 : roll[3]
					})
				})

				event.custom({
					type: "botanypots:crop",

					seed: Ingredient.of(inputSeed).id,
					results: results,

					categories: arrConvert(SoilCategories),
					growthTicks: growthTicks,
					display: blockConvert(displayBlock, false)
				})
			},
			fertilizer: (event, fertilizer, minTicks, maxTicks) => {
				if (minTicks==null) minTicks = 100
				if (maxTicks==null) maxTicks = minTicks + 100

				event.custom({
					type: "botanypots:fertilizer",

					fertilizer: Ingredient.of(fertilizer),
					minTicks: minTicks,
					maxTicks: maxTicks
				})
			},
			soil: (event, inputSoil, SoilCategories, growthModifier, displayBlock) => {
				if (growthModifier==null) growthModifier = 0
				if (displayBlock==null) displayBlock = inputSoil

				event.custom({
					type: "botanypots:soil",

					input: Ingredient.of(inputSoil),

					categories: arrConvert(SoilCategories),
					growthModifier: growthModifier,
					display: blockConvert(displayBlock, false)
				})
			}
		},

		elementalcraft: {
			binding: (event, input, output, elementType, elementAmount) => {
				if (elementAmount==null) elementAmount = 1000

				event.custom({
					type: "elementalcraft:binding",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: elementAmount
				})
			},
			crystallization: (event, input, output, elementType, elementAmount) => {
				input = ingredientsConvert(arrConvert(input))
				if (elementAmount==null) elementAmount = 1000
				let results = []
				output.forEach(result => {
					let resultItem = Ingredient.of(result[0])
					results.push({
						result: {id: resultItem.id, Count: resultItem.getCount()},
						weight: typeof result[1]==='undefined' ? 1 : result[1],
						quality: typeof result[2]==='undefined' ? null : result[2]
					})
				})

				event.custom({
					type: "elementalcraft:crystallization",

					ingredients: {
						gem: input[0],
						crystal: input[1],
						shard: input[2]
					},
					outputs: results,

					element_type: elementType,
					element_amount: elementAmount
				})
			},
			grinding: (event, input, output, elementAmount) => {
				if (elementAmount==null) elementAmount = 1000

				event.custom({
					type: "elementalcraft:grinding",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					element_amount: elementAmount,
				})
			},
			tool_infusion: (event, input, toolInfusionType, elementAmount) => {
				if (elementAmount==null) elementAmount = 1000

				event.custom({
					type: "elementalcraft:tool_infusion",

					input: Ingredient.of(input),

					tool_infusion: toolInfusionType,
					element_amount: elementAmount,
				})
			},
			infusion: (event, input, output, elementType, elementAmount) => {
				if (elementAmount==null) elementAmount = 1000

				event.custom({
					type: "elementalcraft:infusion",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: elementAmount,
				})
			},
			inscription: (event, input, output, elementType, elementAmount) => {
				input = ingredientsConvert(arrConvert(input).slice(0, 4))
				output = arrConvert(output)
				let outputItem = Ingredient.of(output[0])
				if (typeof output[1]!=='undefined') outputItem["nbt"] = output[1]
				if (elementAmount==null) elementAmount = 1000

				event.custom({
					type: "elementalcraft:inscription",

					slate: input[0],
					ingredients: input.slice(1),
					output: outputItem,

					element_type: elementType,
					element_amount: elementAmount
				})
			},
			pureinfusion: (event, input, output, elementAmount) => {
				input = arrConvert(input).slice(0, 5)
				if (elementAmount==null) elementAmount = 1000

				event.custom({
					type: "elementalcraft:pureinfusion",

					ingredients: ingredientsConvert(input),
					output: Ingredient.of(output),

					element_amount: elementAmount,
				})
			},
			spell_craft: (event, input, output) => {
				input = ingredientsConvert(arrConvert(input))
				output = arrConvert(output)
				let outputItem = Ingredient.of(output[0])
				if (typeof output[1]!=='undefined') outputItem["nbt"] = output[1]


				event.custom({
					type: "elementalcraft:spell_craft",

					gem: input[0],
					crystal: input[1],
					output: outputItem,
				})
			}
		},

		ftbic: {
			antimatter_boost: (event, input, boost) => {
				if (typeof boost!=="number") boost = 1000

				event.custom({
					type: "ftbic:antimatter_boost",

					ingredient: Ingredient.of(input),
					boost: boost
				})
			},
			basic_generator_fuel: (event, input, ticks) => {
				if (typeof ticks!=="number") ticks = 200

				event.custom({
					type: "ftbic:basic_generator_fuel",

					ingredient: Ingredient.of(input),
					ticks: ticks
				})
			},
			canning: (event, input, output) => {
				input = arrConvert(input).slice(0, 2)
				addFTBICRecipes(event, input, output, "ftbic:canning")
			},
			compressing: (event, input, output) => {
				input = arrConvert(input)
				addFTBICRecipes(event, input, output, "ftbic:compressing")
			},
			extruding: (event, input, output) => {
				input = arrConvert(input)
				addFTBICRecipes(event, input, output, "ftbic:extruding")
			},
			macerating: (event, input, output) => {
				input = arrConvert(input)
				addFTBICRecipes(event, input, output, "ftbic:macerating")
			},
			rolling: (event, input, output) => {
				input = arrConvert(input)
				addFTBICRecipes(event, input, output, "ftbic:rolling")
			},
			separating: (event, input, output) => {
				input = arrConvert(input)
				addFTBICRecipes(event, input, output, "ftbic:separating")
			}
		},

		industrialforegoing: {
			dissolution_chamber: (event, input, inputFluid, output, outputFluid, time) => {
				input = arrConvert(input).slice(0, 8)
				inputFluid = fluidConvert(inputFluid)
				outputFluid = fluidConvert(outputFluid)
				if (time==null) time = 20

				event.custom({
					type: "industrialforegoing:dissolution_chamber",

					input: ingredientsConvert(input),
					inputFluid: `{FluidName:"${inputFluid.id}",Amount:${inputFluid.getAmount()}}`,

					processingTime: time,

					output: Ingredient.of(output),
					outputFluid: `{FluidName:"${outputFluid!=null ? outputFluid.id : ""}",Amount:${outputFluid!=null ? outputFluid.getAmount() : 0}}`
				})
			},
			fluid_extractor: (event, input, output, breakchance, result) => {
				output = fluidConvert(output)
				if (breakchance==null) breakchance = 0
				if (result==null) result = "minecraft:air"

				event.custom({
					type: "industrialforegoing:fluid_extractor",

					input: Ingredient.of(input),
					result: result,
					output: `{FluidName:"${output.id}",Amount:${output.getAmount()}}`,

					breakChance: breakchance,
					defaultRecipe: false
				})
			},
			laser_drill: (event, output, catalyst, rarities, fluidRecipe, entity) => {
				fluidRecipe ? output = fluidConvert(output) : output = Ingredient.of(output)
				if (fluidRecipe!==true) fluidRecipe = false
				if (typeof entity!=="string") entity = "minecraft:empty"

				let mineIn = []
				if (typeof rarities[0]==='undefined') rarities = [["", "", ""]]
				rarities.forEach(rarity => {
					if (!(Array.isArray(rarity[0]))) rarity[0] = []
					if (!(Array.isArray(rarity[1]))) rarity[1] = []

					if (!(Array.isArray(rarity[0][0]))) rarity[0][0] = []
					if (typeof rarity[0][2]!=="string") rarity[0][2] = "minecraft:worldgen/biome"
					let typeList = rarity[0][1] !== true

					if (typeof rarity[1][0]!=="number") rarity[1][0] = 0
					if (typeof rarity[1][1]!=="number") rarity[1][1] = 64
					if (typeof rarity[2]!=="number") rarity[2] = 1

					let whitelist = {}
					let blacklist = {}
					if (typeList) whitelist = {type: rarity[0][1], values: arrConvert(rarity[0][0])}
					if (!(typeList)) blacklist = {type: rarity[0][1], values: arrConvert(rarity[0][0])}

					mineIn.push({
						whitelist: whitelist,
						blacklist: blacklist,
						depth_min: rarity[1][0],
						depth_max: rarity[1][1],
						weight: rarity[2]
					})
				})

				let recipe = {
					type: fluidRecipe ? "industrialforegoing:laser_drill_fluid" : "industrialforegoing:laser_drill_ore",

					output: fluidRecipe ? `{FluidName:"${output.id}",Amount:${output.getAmount()}}` : output,

					pointer: 0,
					catalyst: Ingredient.of(catalyst),

					rarity: mineIn
				}
				if (fluidRecipe) recipe["entity"] = entity

				event.custom(recipe)
			},
			stonework_generate: (event, output, water, lava) => {
				water = arrConvert(water)
				lava = arrConvert(lava)
				event.custom({
					type: "industrialforegoing:stonework_generate",

					output: Ingredient.of(output),

					waterNeed: typeof water[0]!=="number" ? 1000 : water[0],
					waterConsume: typeof water[1]!=="number" ? 0 : water[1],
					lavaNeed: typeof lava[0]!=="number" ? 1000 : lava[0],
					lavaConsume: typeof lava[1]!=="number" ? 0 : lava[1]
				})
			}
		},

		pneumaticcraft: {
			amadron: (event, input, output) => {
				input = arrConvert(input)
				output = arrConvert(output)
				let inputFluid = input[1] !== true
				let outputFluid = output[1] !== true

				event.custom({
					type: "pneumaticcraft:amadron",

					input: {
						type: inputFluid ? "ITEM" : "FLUID",
						id: inputFluid ? Ingredient.of(input[0]).id : fluidConvert(input[0]).id,
						amount: inputFluid ? Ingredient.of(input[0]).getCount() : fluidConvert(input[0]).getAmount()
					},
					output: {
						type: outputFluid ? "ITEM" : "FLUID",
						id: outputFluid ? Ingredient.of(output[0]).id : fluidConvert(output[0]).id,
						amount: outputFluid ? Ingredient.of(output[0]).getCount() : fluidConvert(output[0]).getAmount()
					},

					static: true,
					level: 0
				})
			},
			assembly_laser: (event, input, output, isDrill) => {
				let recipe = {
					type: "pneumaticcraft:assembly_laser",

					input: {
						item: Ingredient.of(input).id,
						count: Ingredient.of(input).getCount()
					},
					result: Ingredient.of(output),

					program: isDrill!==true ? "laser" : "drill"
				}

				if (Ingredient.of(input).getCount()!==1) recipe["input"]["type"] = "pneumaticcraft:stacked_item"

				event.custom(recipe)
			},
			explosion_crafting: (event, input, output, loss_rate) => {
				if (typeof loss_rate!=="number") loss_rate = 20

				event.custom({
					type: "pneumaticcraft:explosion_crafting",

					input: Ingredient.of(input),
					results: ingredientsConvert(arrConvert(output)),

					loss_rate: loss_rate
				})
			},
			heat_frame_cooling: (event, input, output, max_temp, bonusOutput) => {
				input = arrConvert(input)
				if (typeof input[1]!=="number") input[1] = 1000
				if (typeof max_temp!=="number") max_temp = 273
				if (bonusOutput==null) bonusOutput = []
				if (typeof bonusOutput[0]!=="number") bonusOutput[0] = 0
				if (typeof bonusOutput[1]!=="number") bonusOutput[1] = 0

				event.custom({
					type: "pneumaticcraft:heat_frame_cooling",

					input: Object.assign(fluidConvertWithTag(input[0], input[1]), {type: "pneumaticcraft:fluid"}),
					result: Ingredient.of(output),

					max_temp: max_temp,
					bonus_output: {
						multiplier: bonusOutput[0],
						limit: bonusOutput[1]
					}
				})
			},
			heat_properties: (event, input, output, temperature, thermalResistance, heatCapacity) => {
				output = arrConvert(output)
				if (typeof temperature!=="number") temperature = 298
				if (typeof thermalResistance!=="number") thermalResistance = 200
				if (typeof heatCapacity!=="number") heatCapacity = 5000

				let recipe = {
					type: "pneumaticcraft:heat_properties",
					block: input,
					temperature: temperature,
					thermalResistance: thermalResistance,
					heatCapacity: heatCapacity,
				}

				if (output[0]!=="" && output[0]!=="minecraft:air") recipe["transformCold"] = {block: output[0]}
				if (output[1]!=="" && output[1]!=="minecraft:air") recipe["transformHot"] = {block: output[1]}

				event.custom(recipe)
			},
			fluid_mixer: (event, input1, input2, outputFluid, outputItem, pressure, time) => {
				outputFluid = fluidConvert(outputFluid)
				outputItem = Ingredient.of(outputItem)
				input1 = arrConvert(input1)
				input2 = arrConvert(input2)
				if (typeof input1[1]!=="number") input1[1] = 1000
				if (typeof input2[1]!=="number") input2[1] = 1000
				if (typeof time!=="number") time = 200
				if (typeof pressure!=="number") pressure = 1
				
				recipe = {
					type: "pneumaticcraft:fluid_mixer",

					input1: Object.assign(fluidConvertWithTag(input1[0], input1[1]), {type: "pneumaticcraft:fluid"}),
					input2: Object.assign(fluidConvertWithTag(input2[0], input2[1]), {type: "pneumaticcraft:fluid"}),

					pressure: pressure,
					time: time
				}
				
				if (outputFluid!=null && outputFluid.id!=="minecraft:empty") recipe["fluid_output"] = outputFluid
				if (outputItem!=null && outputItem.id!=="minecraft:air") recipe["item_output"] = outputItem
				
				console.log(recipe)
				
				event.custom(recipe)
			},
			fuel_quality: (event, input, air_per_bucket, burn_rate) => {
				input = arrConvert(input)
				if (typeof input[1]!=="number") input[1] = 1000
				if (typeof air_per_bucket!=="number") air_per_bucket = 100000
				if (typeof burn_rate!=="number") burn_rate = 1

				event.custom({
					type: "pneumaticcraft:fuel_quality",
					
					fluid: Object.assign(fluidConvertWithTag(input[0], input[1]), {type: "pneumaticcraft:fluid"}),
					
					air_per_bucket: air_per_bucket,
					burn_rate: burn_rate
				})
			},
			pressure_chamber: (event, input, output, pressure) => {
				if (typeof pressure!=="number") pressure = 1

				input = ingredientsConvert(arrConvert(input))
				input.forEach(item => {
					let itemJson = {
						item: item.id,
						count: item.getCount()
					}
					if (item.getCount()!==1) itemJson["type"] = "pneumaticcraft:stacked_item"
					input[input.indexOf(item)] = itemJson
				})
				
				event.custom({
					type: "pneumaticcraft:pressure_chamber",
					
					inputs: input,
					results: ingredientsConvert(arrConvert(output)),
					
					pressure: pressure
				})
			},
			refinery: (event, input, output, temperature) => {
				console.log(fluidsConvert(arrConvert(output)))
				input = arrConvert(input)
				if (typeof input[1]!=="number") input[1] = 1000

				let temperatures = {}
				if (typeof temperature[0]==="number") temperatures["min_temp"] = temperature[0]
				if (typeof temperature[1]==="number") temperatures["max_temp"] = temperature[1]
				
				event.custom({
					type: "pneumaticcraft:refinery",
					
					input: Object.assign(fluidConvertWithTag(input[0], input[1]), {type: "pneumaticcraft:fluid"}),
					results: fluidsConvert(arrConvert(output).slice(0, 4)),
					
					temperature: temperatures,
				})
			},
			thermo_plant: (event, inputItem, inputFluid, outputItem, outputFluid, temperature, pressure, speed, exothermic) => {
				inputItem = Ingredient.of(inputItem)
				let itemJson = {item: inputItem.id, count: inputItem.getCount()}
				if (inputItem.getCount()!==1) inputItem = Object.assign(itemJson, {type: "pneumaticcraft:stacked_item"})
				
				inputFluid = arrConvert(inputFluid)
				if (typeof inputFluid[1]!=="number") inputFluid[1] = 1000
				let inputFluidConverted = inputFluid[0].substring(0, 1)==="#" ?  fluidConvert("minecraft:water") : fluidConvert(inputFluid[0], inputFluid[1])
				
				outputItem = Ingredient.of(outputItem)
				outputFluid = fluidConvert(outputFluid)
				
				if (typeof speed!=="number") speed = 1
				temperature = arrConvert(temperature)
				
				let recipe = {
					type: "pneumaticcraft:thermo_plant",
					speed: speed,
					exothermic: exothermic===true
				}
				
				if (inputItem!=null && inputItem.id!=="minecraft:air") recipe["item_input"] = inputItem
				if (inputFluid!=null && inputFluidConverted.id!=="minecraft:empty") {
					recipe["fluid_input"] = Object.assign(fluidConvertWithTag(inputFluid[0], inputFluid[1]), {type: "pneumaticcraft:fluid"})
				}
				
				if (outputItem!=null && outputItem.id!=="minecraft:air") recipe["item_output"] = outputItem
				if (outputFluid!=null && outputFluid.id!=="minecraft:empty") recipe["fluid_output"] = outputFluid
				
				let temperatures = {}
				if (typeof temperature[0]==="number") temperatures["min_temp"] = temperature[0]
				if (typeof temperature[1]==="number") temperatures["max_temp"] = temperature[1]
				if (temperatures!=={} || temperature===[]) recipe["temperature"] = temperatures
				
				if (typeof pressure==="number") recipe["pressure"] = pressure
				
				event.custom(recipe)
			}
		},
		
		powah: {
			energizing: (event, input, output, energy) => {
				input = arrConvert(input).slice(0, 6)
				if (energy==null) energy = 100

				event.custom({
					type: "powah:energizing",

					ingredients: ingredientsConvert(input),
					result: Ingredient.of(output),

					energy: energy
				})
			}
		}
	}
})
