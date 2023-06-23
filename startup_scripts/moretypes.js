function arrConvert(i) {
	if (!Array.isArray(i)) i = [i]
	return i
}
function ingredientOfNoCount(i) {
	item = Ingredient.of(i)
	json = i.substring(0, 1)==="#" ? {tag: item.id} : {item: item.id}
	if (item.getNbt()!=null) json["nbt"] = item.getNbt()
	if (!isNaN(item.getChance())) json["chance"] = item.getChance()
	return json
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
function fluidConvertWithTag(i, amount, typeNames, amountName) {
	typeNames==null ? typeNames = ["fluid", "tag"] : typeNames = arrConvert(typeNames).slice(0, 2)
	typeNames = typeNames.concat(["fluid", "tag"].slice(typeNames.length, 2))
	if (amountName==null) amountName = "amount"

	let fluid = {}
	i.substring(0, 1)==="#" ? fluid[typeNames[1]] = i.substring(1) : fluid[typeNames[0]] = i
	fluid[amountName] = typeof amount == "number" ? amount : 1000 
	return fluid
}
function fluidsConvertWithTag(i, typeNames, amountName) {
	let fluids = []
	i.forEach(fluid => {
		fluid = arrConvert(fluid)
		fluids.push(fluidConvertWithTag(fluid[0], fluid[1], typeNames, amountName))})
	return fluids
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
function addFTBICRecipes(event, output, input, type, id) {
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

	applyID(event, id, {
		type: type,

		inputItems: ingredients,
		outputItems: ingredientsConvert(arrConvert(output))
	})
}
function SMIngredientConvert(i) {
	let values = []
	i = arrConvert(i)
	arrConvert(i[0]).forEach(value => {
		values.push(Ingredient.of(value).toJson())
	})
	if (typeof i[1]!="number") i[1] = 1
	return {value: values, count: i[1]}
}
function exCompressumLootTable(i) {
	let lootTable = {
		type: "minecraft:block",
		pools: []
	}

	i.forEach(pool => {
		pool = arrConvert(pool)
		item = Ingredient.of(pool[0])

		lootTable["pools"].push({
			rolls: 1,
			entries: [{
				type: "minecraft:item",
				name: item.id,
				functions: [{
					function: "minecraft:set_count",
					count: item.getCount()
				}]
			}],
			conditions: [{
				condition: "minecraft:random_chance",
				chance: typeof pool[1]!="number" ? 1 : pool[1]
			}]
		})
	})
	
	return lootTable
}
function applyID(event, id, recipe) {
	id==null ? event.custom(recipe) : event.custom(recipe).id(id)
}

let i

onEvent("loaded", e => {
	global.mrt = {
		aoa3: {
			infusion: (event, output, mainInput, input, id) => {
				applyID(event, id, {
					type: "aoa3:infusion",

					input: Ingredient.of(mainInput),
					ingredients: ingredientsConvert(arrConvert(input).slice(0, 9)),
					result: Ingredient.of(output)
				})
			},
			upgrade_kit: (event, output, input, upgradeKit, id) => {
				applyID(event, id, {
					type: "aoa3:upgrade_kit",

					input: Ingredient.of(input),
					upgrade_kit: Ingredient.of(upgradeKit),
					result: Ingredient.of(output)
				})
			}
		},

		appliedenergistics2: {
			grinder: (event, output, input, turns, id) => {
				output = ingredientsConvert(arrConvert(output).slice(0, 3))
				if (typeof turns!="number") turns = 4

				applyID(event, id, {
					type: "appliedenergistics2:grinder",

					input: Ingredient.of(input),
					result: {
						primary: output[0],
						optional: output.slice(1, 3)
					},

					turns: turns
				})
			},
			inscriber: (event, output, input, keep, id) => {
				input = ingredientsConvert(arrConvert(input).slice(0, 3))
				let input_names = ["top", "middle", "bottom"]
				let ingredients = {}
				for (i = 0; i < input.length; i++) {
					if (input[i] !== "" && input[i] !== "minecraft:air") {
						ingredients[input_names[i]] = input[i]
					}
				}

				applyID(event, id, {
					type: "appliedenergistics2:inscriber",
					mode: keep===true ? "inscribe" : "press",

					ingredients: ingredients,
					result: Ingredient.of(output)
				})
			}
		},

		ars_nouveau: {
			enchanting_apparatus: (event, output, mainInput, sideInput, id) => {
				let recipe = {
					type: "ars_nouveau:enchanting_apparatus",

					reagent: [ingredientOfNoCount(mainInput)],
					output: Ingredient.of(output)
				}

				sideInput = arrConvert(sideInput)
				for (i = 0; i < sideInput.length; i++) {
					if (Ingredient.of(sideInput[i]).id!=="minecraft:air") {
						recipe[`item_${i + 1}`] = [ingredientOfNoCount(sideInput[i])]
					}
				}

				applyID(event, id, recipe)
			},
			crush: (event, output, input, id) => {

				applyID(event, id, {
					type: "ars_nouveau:crush",
					
					input: Ingredient.of(input),
					output: ingredientsConvert(arrConvert(output))
				})
			},
			glyph_recipe: (event, output, input, tier, id) => {
				if (typeof tier!="number" && typeof tier!="string") tier = 1
				tier = ["ONE", "TWO", "THREE"][tier - 1]

				applyID(event, id, {
					type: "ars_nouveau:glyph_recipe",
					
					input: Ingredient.of(input).id,
					output: Ingredient.of(output).id,
					tier: tier===undefined ? "ONE" : tier
				})
			}
		},

		astralsorcery: {
			block_transmutation: (event, output, input, starlight, id) => {
				if (typeof starlight!="number") starlight = 200

				applyID(event, id, {
					type: "astralsorcery:block_transmutation",

					input: blockIngredientsConvert(arrConvert(input), false),
					output: {block: output},

					starlight: starlight
				})
			},
			infuser: (event, output, input, duration, consumptionChance, settings, inputFluid, id) => {
				if (typeof duration!="number") duration = 100
				if (typeof consumptionChance!="number") consumptionChance = 0.1
				if (!Array.isArray(settings)) settings = [false, true, false]
				settings = settings.slice(0, 3)
				settings = settings.concat([false, true, false].slice(settings.length, 3))
				if (typeof inputFluid!="string") inputFluid = "astralsorcery:liquid_starlight"

				applyID(event, id, {
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
			lightwell: (event, outputFluid, input, productionMultiplier, shatterMultiplier, color, id) => {
				if (typeof productionMultiplier!="number") productionMultiplier = 1
				if (typeof shatterMultiplier!="number") shatterMultiplier = 10
				if (typeof color!="number") color = -2236929

				applyID(event, id, {
					type: "astralsorcery:lightwell",

					input: Ingredient.of(input),
					output: outputFluid,

					productionMultiplier: productionMultiplier,
					shatterMultiplier: shatterMultiplier,
					color: color
				})
			},
			liquid_interaction: (event, output, inputFluid1, inputFluid2, weight, id) => {
				inputFluid1 = arrConvert(inputFluid1)
				inputFluid2 = arrConvert(inputFluid2)
				let fluid1 = fluidConvert(inputFluid1[0])
				let fluid2 = fluidConvert(inputFluid2[0])
				if (typeof inputFluid1[1]=='undefined') inputFluid1.push(1)
				if (typeof inputFluid2[1]=='undefined') inputFluid2.push(1)
				if (typeof weight!="number") weight = 1

				applyID(event, id, {
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

		atum: {
			kiln: (event, output, input, experience, id) => {
				if (typeof experience!="number") experience = 0.1

				applyID(event, id, {
					type: "atum:kiln",

					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),

					experience: experience
				})
			},
			quern: (event, output, input, rotations, id) => {
				if (typeof rotations!="number") rotations = 1

				applyID(event, id, {
					type: "atum:quern",

					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),

					rotations: rotations
				})
			},
			spinning_wheel: (event, output, input, rotations, id) => {
				if (typeof rotations!="number") rotations = 1

				applyID(event, id, {
					type: "atum:spinning_wheel",

					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),

					rotations: rotations
				})
			}
		},

		betterendforge: {
			alloying: (event, output, input, experience, time, id) => {
				if (typeof experience!="number") experience = 1
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "betterendforge:alloying",

					ingredients: ingredientsConvert(arrConvert(input).slice(0, 2)),
					result: Ingredient.of(output),

					experience: experience,
					smelttime: time
				})
			},
			anvil_smithing: (event, output, input, toolLevel, anvilLevel, toolDamage, id) => {
				if (typeof toolLevel!="number") toolLevel = 0
				if (typeof anvilLevel!="number") anvilLevel = 1
				if (typeof toolDamage!="number") toolDamage = 1

				applyID(event, id, {
					type: "betterendforge:anvil_smithing",

					input: Ingredient.of(input),
					result: Ingredient.of(output).id,

					level: toolLevel,
					anvilLevel: anvilLevel,
					damage: toolDamage
				})
			},
			infusion: (event, output, middleInput, catalystInput, time, id) => {
				catalystInput = arrConvert(catalystInput).slice(0, 8)
				let catalysts = []
				for (i = 0; i < catalystInput.length; i++) {
					if (Ingredient.of(catalystInput[i]).id!=="minecraft:air") {
						catalysts.push({item: Ingredient.of(catalystInput[i]), index: i})
					}
				}
				if (typeof time!="number") time = 100

				applyID(event, id, {
					type: "betterendforge:infusion",
					
					input: Ingredient.of(middleInput),
					output: Ingredient.of(output).id,
					catalysts: catalysts,
					
					time: time
				})
			}
		},
		
		boss_tools: {
			blasting: (event, output, input, cookTime, id) => {
				if (typeof cookTime!="number") cookTime = 200

				applyID(event, id, {
					type: "boss_tools:blasting",

					input: {ingredient: Ingredient.of(input)},
					output: Ingredient.of(output),

					cookTime: cookTime
				})
			},
			compressing: (event, output, input, cookTime, id) => {
				if (typeof cookTime!="number") cookTime = 200

				applyID(event, id, {
					type: "boss_tools:compressing",

					input: {ingredient: Ingredient.of(input)},
					output: Ingredient.of(output),

					cookTime: cookTime
				})
			}
		},

		botania: {
			brew: (event, outputBrew, input, id) => {
				applyID(event, id, {
					type: "botania:brew",

					brew: outputBrew,
					ingredients: ingredientsConvert(arrConvert(input))
				})
			},
			elven_trade: (event, output, input, id) => {
				applyID(event, id, {
					type: "botania:elven_trade",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: ingredientsConvert(arrConvert(output))
				})
			},
			mana_infusion: (event, output, input, mana, catalyst, id) => {
				if (typeof mana!="number") mana = 1000

				applyID(event, id, {
					type: "botania:mana_infusion",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					mana: mana,
					catalyst: typeof catalyst!="string" ? null : blockConvert(catalyst, true)
				})
			},
			petal_apothecary: (event, output, input, id) => {
				applyID(event, id, {
					type: "botania:petal_apothecary",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output)
				})
			},
			pure_daisy: (event, output, input, id) => {
				applyID(event, id, {
					type: "botania:pure_daisy",

					input: blockConvert(input, true),
					output: {name: output}
				})
			},
			runic_altar: (event, output, input, mana, id) => {
				if (typeof mana!="number") mana = 5000

				applyID(event, id, {
					type: "botania:runic_altar",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output),

					mana: mana
				})
			},
			terra_plate: (event, output, input, mana, id) => {
				if (typeof mana!="number") mana = 100000

				applyID(event, id, {
					type: "botania:terra_plate",

					ingredients: ingredientsConvert(arrConvert(input)),
					result: Ingredient.of(output),

					mana: mana
				})
			}
		},

		botanypots: {
			crop: (event, output, inputSeed, SoilCategories, growthTicks, displayBlock, id) => {
				if (typeof growthTicks!="number") growthTicks = 1200
				if (typeof displayBlock!="string") displayBlock = inputSeed
				let results = []
				output.forEach(roll => {
					results.push({
						output: Ingredient.of(roll[0]),
						chance: typeof roll[1]=='undefined' ? 1 : roll[1],
						minRolls: typeof roll[2]=='undefined' ? 1 : roll[2],
						maxRolls: typeof roll[3]=='undefined' ? 1 : roll[3]
					})
				})

				applyID(event, id, {
					type: "botanypots:crop",

					seed: Ingredient.of(inputSeed).id,
					results: results,

					categories: arrConvert(SoilCategories),
					growthTicks: growthTicks,
					display: blockConvert(displayBlock, false)
				})
			},
			fertilizer: (event, fertilizer, minTicks, maxTicks, id) => {
				if (typeof minTicks!="number") minTicks = 100
				if (typeof maxTicks!="number") maxTicks = minTicks + 100

				applyID(event, id, {
					type: "botanypots:fertilizer",

					fertilizer: Ingredient.of(fertilizer),
					minTicks: minTicks,
					maxTicks: maxTicks
				})
			},
			soil: (event, inputSoil, SoilCategories, growthModifier, displayBlock, id) => {
				if (typeof growthModifier!="number") growthModifier = 0
				if (typeof displayBlock!="string") displayBlock = inputSoil

				applyID(event, id, {
					type: "botanypots:soil",

					input: Ingredient.of(inputSoil),

					categories: arrConvert(SoilCategories),
					growthModifier: growthModifier,
					display: blockConvert(displayBlock, false)
				})
			}
		},
		
		draconicevolution: {
			fusion_crafting: (event, output, mainInput, sideInput, tier, energy, id) => {
				if (typeof tier!="string") tier = "DRACONIUM"
				if (typeof energy!="number") energy = 100000
				catalyst = Ingredient.of(mainInput)
				if (catalyst.getCount() > 1) {
					catalyst = {
						type: "draconicevolution:ingredient_stack",
						items: [catalyst],
						count: catalyst.getCount()
					}
				}
				
				applyID(event, id, {
					type: "draconicevolution:fusion_crafting",

					catalyst: catalyst,
					ingredients: ingredientsConvert(arrConvert(sideInput)),
					result: Ingredient.of(output),

					total_energy: energy,
					tier: tier
				})
			}
		},
		
		divinerpg: {
			arcanium_extractor: (event, output, input, experience, time, id) => {
				if (typeof experience!="number") experience = 0.1
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "divinerpg:arcanium_extractor",
					
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),
					
					experience: 0.1,
					cookingtime: 100
				})
			},
			
			infusion_table: (event, output, input, template) => {

				applyID(event, id, {
					type: "divinerpg:infusion_table",
					
					input: Ingredient.of(input),
					template: Ingredient.of(template),
					output: Ingredient.of(output)
				})
			}
		},

		elementalcraft: {
			binding: (event, output, input, elementType, elementAmount, id) => {
				if (typeof elementAmount!="number") elementAmount = 1000

				applyID(event, id, {
					type: "elementalcraft:binding",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: elementAmount
				})
			},
			crystallization: (event, output, input, elementType, elementAmount, id) => {
				input = ingredientsConvert(arrConvert(input))
				if (typeof elementAmount!="number") elementAmount = 1000
				let results = []
				output.forEach(result => {
					let resultItem = Ingredient.of(result[0])
					results.push({
						result: {id: resultItem.id, Count: resultItem.getCount()},
						weight: typeof result[1]=='undefined' ? 1 : result[1],
						quality: typeof result[2]=='undefined' ? null : result[2]
					})
				})

				applyID(event, id, {
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
			grinding: (event, output, input, elementAmount, id) => {
				if (typeof elementAmount!="number") elementAmount = 1000

				applyID(event, id, {
					type: "elementalcraft:grinding",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					element_amount: elementAmount,
				})
			},
			tool_infusion: (event, input, toolInfusionType, elementAmount, id) => {
				if (typeof elementAmount!="number") elementAmount = 1000

				applyID(event, id, {
					type: "elementalcraft:tool_infusion",

					input: Ingredient.of(input),

					tool_infusion: toolInfusionType,
					element_amount: elementAmount,
				})
			},
			infusion: (event, output, input, elementType, elementAmount, id) => {
				if (typeof elementAmount!="number") elementAmount = 1000

				applyID(event, id, {
					type: "elementalcraft:infusion",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: elementAmount,
				})
			},
			inscription: (event, output, input, elementType, elementAmount, id) => {
				input = ingredientsConvert(arrConvert(input).slice(0, 4))
				if (typeof elementAmount!="number") elementAmount = 1000

				applyID(event, id, {
					type: "elementalcraft:inscription",

					slate: input[0],
					ingredients: input.slice(1),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: elementAmount
				})
			},
			pureinfusion: (event, output, input, elementAmount, id) => {
				input = arrConvert(input).slice(0, 5)
				if (typeof elementAmount!="number") elementAmount = 1000

				applyID(event, id, {
					type: "elementalcraft:pureinfusion",

					ingredients: ingredientsConvert(input),
					output: Ingredient.of(output),

					element_amount: elementAmount,
				})
			},
			spell_craft: (event, output, input, id) => {
				input = ingredientsConvert(arrConvert(input))

				applyID(event, id, {
					type: "elementalcraft:spell_craft",

					gem: input[0],
					crystal: input[1],
					output: Ingredient.of(output),
				})
			}
		},

		evilcraft: {
			blood_infuser: (event, output, inputItem, inputFluid, tier, time, experience, id) => {
				if (typeof experience!="number") experience = 0.1
				if (typeof tier!="number") tier = 0
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "evilcraft:blood_infuser",
					
					item: Ingredient.of(inputItem),
					fluid: fluidConvert(inputFluid).toJson(),
					result: Ingredient.of(output),
					
					duration: time,
					xp: experience,
					tier: tier
				})
			},
			environmental_accumulator: (event, output, outputWeather, input, inputAction, time, cooldownTime, id) => {
				if (typeof time!="number") time = 100
				if (typeof cooldownTime!="number") cooldownTime = 0

				applyID(event, id, {
					type: "evilcraft:environmental_accumulator",
					
					item: Ingredient.of(input),
					weather: inputAction,
					result: {
						item: Ingredient.of(output),
						weather: outputWeather
					},
					
					duration: time,
					cooldownTime: cooldownTime
				})
			}
		},
		
		excompressum: {
			chicken_stick: (event, output, input, id) => {
				output = arrConvert(output)
				
				applyID(event, id, {
					type: "excompressum:chicken_stick",
					
					input: Ingredient.of(input),
					lootTable: exCompressumLootTable(output)
				})
			},
			compressed_hammer: (event, output, input, id) => {
				output = arrConvert(output)

				applyID(event, id, {
					type: "excompressum:compressed_hammer",
					
					input: Ingredient.of(input),
					lootTable: exCompressumLootTable(output)
				})
			},
			heavy_sieve: (event, input, inputOfNormalSieve, id) => {
				applyID(event, id, {
					type: "excompressum:heavy_sieve_generated",
					
					input: Ingredient.of(input),
					source: Ingredient.of(inputOfNormalSieve).id
				})
			}
		},
		
		exnihilosequentia: {
			compost: (event, input, amount, id) => {
				if (typeof amount!="number") amount = 100

				applyID(event, id, {
					type: "exnihilosequentia:compost",
					
					input: Ingredient.of(input),
					amount: amount
				})
			},
			crook: (event, output, input, id) => {
				applyID(event, id, {
					type: "exnihilosequentia:crook",
					
					input: Ingredient.of(input),
					results: ingredientsConvert(arrConvert(output))
				})
			},
			crucible: (event, output, input, isWood, id) => {
				output = fluidConvert(output)
				
				applyID(event, id, {
					type: "exnihilosequentia:crucible",
					
					input: Ingredient.of(input),
					amount: output.getAmount(),
					fluidResult: {
						fluid: output.id
					},
					
					crucibleType: isWood===true ? "wood" : "fired"
				})
			},
			fluid_item: (event, output, inputFluid, inputItem, id) => {
				applyID(event, id, {
					type: "exnihilosequentia:fluid_item",
					
					fluid: fluidConvert(inputFluid).toJson(),
					input: Ingredient.of(inputItem),
					result: Ingredient.of(output)
				})
			},
			fluid_on_top: (event, output, inputFluid1, inputFluid2, id) => {
				applyID(event, id, {
					type: "exnihilosequentia:fluid_on_top",
					
					fluidInTank: fluidConvert(inputFluid1).toJson(),
					fluidOnTop: fluidConvert(inputFluid2).toJson(),
					result: Ingredient.of(output)
				})
			},
			fluid_transform: (event, output, inputFluid, inputItem, id) => {
				applyID(event, id, {
					type: "exnihilosequentia:fluid_transform",
					
					fluidInTank: fluidConvert(inputFluid).toJson(),
					catalyst: Ingredient.of(inputItem),
					result: fluidConvert(output).toJson()
				})
			},
			hammer: (event, output, input, id) => {
				applyID(event, id, {
					type: "exnihilosequentia:hammer",
					
					input: Ingredient.of(input),
					results: ingredientsConvert(arrConvert(output))
				})
			},
			heat: (event, block, state, boost, id) => {
				if (typeof boost!="number") boost = 1

				applyID(event, id, {
					type: "exnihilosequentia:heat",
					
					block: block,
					amount: boost,
					state: state
				})
			},
			sieve: (event, output, input, meshes, isWaterlogged, id) => {
				meshes = arrConvert(meshes)
				let rolls = []
				meshes.forEach(mesh => {
					mesh = arrConvert(mesh)
					rolls.push({
						mesh: mesh[0],
						chance: typeof mesh[1]!="number" ? 0.1 : mesh[1]
					})
				})

				applyID(event, id, {
					type: "exnihilosequentia:sieve",
					
					input: Ingredient.of(input),
					result: Ingredient.of(output),
					
					rolls: rolls,
					waterlogged: isWaterlogged===true
				})
			}
		},
		
		ftbic: {
			antimatter_boost: (event, input, boost, id) => {
				if (typeof boost!="number") boost = 1000

				applyID(event, id, {
					type: "ftbic:antimatter_boost",

					ingredient: Ingredient.of(input),
					boost: boost
				})
			},
			basic_generator_fuel: (event, input, ticks, id) => {
				if (typeof ticks!="number") ticks = 200

				applyID(event, id, {
					type: "ftbic:basic_generator_fuel",

					ingredient: Ingredient.of(input),
					ticks: ticks
				})
			},
			canning: (event, output, input, id) => {
				input = arrConvert(input).slice(0, 2)
				addFTBICRecipes(event, output, input, "ftbic:canning", id)
			},
			compressing: (event, output, input, id) => {
				input = arrConvert(input)
				addFTBICRecipes(event, output, input, "ftbic:compressing", id)
			},
			extruding: (event, output, input, id) => {
				input = arrConvert(input)
				addFTBICRecipes(event, output, input, "ftbic:extruding", id)
			},
			macerating: (event, output, input, id) => {
				input = arrConvert(input)
				addFTBICRecipes(event, output, input, "ftbic:macerating", id)
			},
			rolling: (event, output, input, id) => {
				input = arrConvert(input)
				addFTBICRecipes(event, output, input, "ftbic:rolling", id)
			},
			separating: (event, output, input, id) => {
				input = arrConvert(input)
				addFTBICRecipes(event, output, input, "ftbic:separating", id)
			}
		},

		industrialforegoing: {
			dissolution_chamber: (event, output, outputFluid, input, inputFluid, time, id) => {
				input = arrConvert(input).slice(0, 8)
				inputFluid = fluidConvert(inputFluid)
				outputFluid = fluidConvert(outputFluid)
				if (typeof time!="number") time = 20

				applyID(event, id, {
					type: "industrialforegoing:dissolution_chamber",

					input: ingredientsConvert(input),
					inputFluid: `{FluidName:"${inputFluid.id}",Amount:${inputFluid.getAmount()}}`,

					processingTime: time,

					output: Ingredient.of(output),
					outputFluid: `{FluidName:"${outputFluid!=null ? outputFluid.id : ""}",Amount:${outputFluid!=null ? outputFluid.getAmount() : 0}}`
				})
			},
			fluid_extractor: (event, output, input, breakchance, result, id) => {
				output = fluidConvert(output)
				if (typeof breakchance!="number") breakchance = 0
				if (typeof result!="string") result = "minecraft:air"

				applyID(event, id, {
					type: "industrialforegoing:fluid_extractor",

					input: Ingredient.of(input),
					result: result,
					output: `{FluidName:"${output.id}",Amount:${output.getAmount()}}`,

					breakChance: breakchance,
					defaultRecipe: false
				})
			},
			laser_drill: (event, output, catalyst, rarities, fluidRecipe, entity, id) => {
				fluidRecipe ? output = fluidConvert(output) : output = Ingredient.of(output)
				if (fluidRecipe!==true) fluidRecipe = false
				if (typeof entity!="string") entity = "minecraft:empty"

				let mineIn = []
				if (typeof rarities[0]=='undefined') rarities = [["", "", ""]]
				rarities.forEach(rarity => {
					if (!(Array.isArray(rarity[0]))) rarity[0] = []
					if (!(Array.isArray(rarity[1]))) rarity[1] = []

					if (!(Array.isArray(rarity[0][0]))) rarity[0][0] = []
					if (typeof rarity[0][2]!="string") rarity[0][2] = "minecraft:worldgen/biome"
					let typeList = rarity[0][1] !== true

					if (typeof rarity[1][0]!="number") rarity[1][0] = 0
					if (typeof rarity[1][1]!="number") rarity[1][1] = 64
					if (typeof rarity[2]!="number") rarity[2] = 1

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

				applyID(event, id, recipe)
			},
			stonework_generate: (event, output, water, lava, id) => {
				water = arrConvert(water)
				lava = arrConvert(lava)
				applyID(event, id, {
					type: "industrialforegoing:stonework_generate",

					output: Ingredient.of(output),

					waterNeed: typeof water[0]!="number" ? 1000 : water[0],
					waterConsume: typeof water[1]!="number" ? 0 : water[1],
					lavaNeed: typeof lava[0]!="number" ? 1000 : lava[0],
					lavaConsume: typeof lava[1]!="number" ? 0 : lava[1]
				})
			}
		},
		
		mysticalagriculture: {
			infusion: (event, output, mainInput, sideInput, id) => {
				applyID(event, id, {
					type: "mysticalagriculture:infusion",
					
					input: Ingredient.of(mainInput),
					ingredients: ingredientsConvert(arrConvert(sideInput).slice(0, 8)),
					result: Ingredient.of(output)
				})
			},
			reprocessor: (event, output, input, id) => {
				applyID(event, id, {
					type: "mysticalagriculture:reprocessor",

					input: Ingredient.of(input),
					result: Ingredient.of(output)
				})
			},
			soul_extraction: (event, soulType, soulAmount, input, id) => {
				if (typeof soulAmount!="number") soulAmount = 1
				
				applyID(event, id, {
					type: "mysticalagriculture:soul_extraction",
					input: Ingredient.of(input),
					output: {
						type: soulType,
						souls: soulAmount
					}
				})
			}
		},

		pneumaticcraft: {
			amadron: (event, output, input, id) => {
				input = arrConvert(input)
				output = arrConvert(output)
				let inputFluid = input[1] !== true
				let outputFluid = output[1] !== true

				applyID(event, id, {
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
			assembly_laser: (event, output, input, isDrill, id) => {
				let recipe = {
					type: "pneumaticcraft:assembly_laser",

					input: {
						item: Ingredient.of(input).id,
						count: Ingredient.of(input).getCount()
					},
					result: Ingredient.of(output),

					program: isDrill===true ? "drill" : "laser"
				}

				if (Ingredient.of(input).getCount()!==1) recipe["input"]["type"] = "pneumaticcraft:stacked_item"

				applyID(event, id, recipe)
			},
			explosion_crafting: (event, output, input, loss_rate, id) => {
				if (typeof loss_rate!="number") loss_rate = 20

				applyID(event, id, {
					type: "pneumaticcraft:explosion_crafting",

					input: Ingredient.of(input),
					results: ingredientsConvert(arrConvert(output)),

					loss_rate: loss_rate
				})
			},
			heat_frame_cooling: (event, output, input, max_temp, bonusOutput, id) => {
				input = arrConvert(input)
				if (typeof max_temp!="number") max_temp = 273
				if (!Array.isArray(bonusOutput)) bonusOutput = []
				if (typeof bonusOutput[0]!="number") bonusOutput[0] = 0
				if (typeof bonusOutput[1]!="number") bonusOutput[1] = 0

				applyID(event, id, {
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
			heat_properties: (event, output, input, temperature, thermalResistance, heatCapacity, id) => {
				output = arrConvert(output)
				if (typeof temperature!="number") temperature = 298
				if (typeof thermalResistance!="number") thermalResistance = 200
				if (typeof heatCapacity!="number") heatCapacity = 5000

				let recipe = {
					type: "pneumaticcraft:heat_properties",
					block: input,
					temperature: temperature,
					thermalResistance: thermalResistance,
					heatCapacity: heatCapacity,
				}

				if (output[0]!=="" && output[0]!=="minecraft:air") recipe["transformCold"] = {block: output[0]}
				if (output[1]!=="" && output[1]!=="minecraft:air") recipe["transformHot"] = {block: output[1]}

				applyID(event, id, recipe)
			},
			fluid_mixer: (event, outputFluid, outputItem, input1, input2, pressure, time, id) => {
				outputFluid = fluidConvert(outputFluid)
				outputItem = Ingredient.of(outputItem)
				input1 = arrConvert(input1)
				input2 = arrConvert(input2)
				if (typeof time!="number") time = 200
				if (typeof pressure!="number") pressure = 1

				recipe = {
					type: "pneumaticcraft:fluid_mixer",

					input1: Object.assign(fluidConvertWithTag(input1[0], input1[1]), {type: "pneumaticcraft:fluid"}),
					input2: Object.assign(fluidConvertWithTag(input2[0], input2[1]), {type: "pneumaticcraft:fluid"}),

					pressure: pressure,
					time: time
				}

				if (outputFluid!=null && outputFluid.id!=="minecraft:empty") recipe["fluid_output"] = outputFluid
				if (outputItem!=null && outputItem.id!=="minecraft:air") recipe["item_output"] = outputItem

				applyID(event, id, recipe)
			},
			fuel_quality: (event, input, air_per_bucket, burn_rate, id) => {
				input = arrConvert(input)
				if (typeof air_per_bucket!="number") air_per_bucket = 100000
				if (typeof burn_rate!="number") burn_rate = 1

				applyID(event, id, {
					type: "pneumaticcraft:fuel_quality",

					fluid: Object.assign(fluidConvertWithTag(input[0], input[1]), {type: "pneumaticcraft:fluid"}),

					air_per_bucket: air_per_bucket,
					burn_rate: burn_rate
				})
			},
			pressure_chamber: (event, output, input, pressure, id) => {
				if (typeof pressure!="number") pressure = 1

				input = ingredientsConvert(arrConvert(input))
				input.forEach(item => {
					let itemJson = {
						item: item.id,
						count: item.getCount()
					}
					if (item.getCount()!==1) itemJson["type"] = "pneumaticcraft:stacked_item"
					input[input.indexOf(item)] = itemJson
				})

				applyID(event, id, {
					type: "pneumaticcraft:pressure_chamber",

					inputs: input,
					results: ingredientsConvert(arrConvert(output)),

					pressure: pressure
				})
			},
			refinery: (event, output, input, temperature, id) => {
				input = arrConvert(input)

				let temperatures = {}
				if (typeof temperature[0]=="number") temperatures["min_temp"] = temperature[0]
				if (typeof temperature[1]=="number") temperatures["max_temp"] = temperature[1]

				applyID(event, id, {
					type: "pneumaticcraft:refinery",

					input: Object.assign(fluidConvertWithTag(input[0], input[1]), {type: "pneumaticcraft:fluid"}),
					results: fluidsConvert(arrConvert(output).slice(0, 4)),

					temperature: temperatures,
				})
			},
			thermo_plant: (event, outputItem, outputFluid, inputItem, inputFluid, temperature, pressure, speed, exothermic, id) => {
				inputItem = Ingredient.of(inputItem)
				let itemJson = {item: inputItem.id, count: inputItem.getCount()}
				if (inputItem.getCount()!==1) inputItem = Object.assign(itemJson, {type: "pneumaticcraft:stacked_item"})

				inputFluid = arrConvert(inputFluid)
				let inputFluidConverted = inputFluid[0].substring(0, 1)==="#" ?  fluidConvert("minecraft:water") : fluidConvert(inputFluid[0], inputFluid[1])

				outputItem = Ingredient.of(outputItem)
				outputFluid = fluidConvert(outputFluid)

				if (typeof speed!="number") speed = 1
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
				if (typeof temperature[0]=="number") temperatures["min_temp"] = temperature[0]
				if (typeof temperature[1]=="number") temperatures["max_temp"] = temperature[1]
				if (temperatures!=={} || temperature===[]) recipe["temperature"] = temperatures

				if (typeof pressure=="number") recipe["pressure"] = pressure

				applyID(event, id, recipe)
			}
		},

		powah: {
			energizing: (event, output, input, energy, id) => {
				input = arrConvert(input).slice(0, 6)
				if (typeof energy!="number") energy = 100

				applyID(event, id, {
					type: "powah:energizing",

					ingredients: ingredientsConvert(input),
					result: Ingredient.of(output),

					energy: energy
				})
			}
		},
		
		psi: {
			trick_crafting: (event, output, input, cad, trick, dimension, id) => {
				let recipe = {
					type: typeof dimension=="string" && dimension!=="" ? "psi:dimension_trick_crafting" : "psi:trick_crafting",
					
					input: Ingredient.of(input),
					output: Ingredient.of(output),
					cad: Ingredient.of(cad)
				}
				
				if (typeof trick=="string" && trick!=="") recipe["trick"] = trick
				if (recipe["type"]==="psi:dimension_trick_crafting") recipe["dimension"] = dimension
				
				applyID(event, id, recipe)
			}
		},
		
		silentgear: {
			compounding: (event, output, input, isGem, id) => {
				applyID(event, id, {
					type: isGem===true ? "silentgear:compounding/gem" : "silentgear:compounding/metal",
					
					ingredients: ingredientsConvert(arrConvert(input).slice(0, 4)),
					result: Ingredient.of(output)
				})
			},
			salvaging: (event, output, input, id) => {
				applyID(event, id, {
					type: "silentgear:salvaging",
					
					ingredient: Ingredient.of(input),
					results: ingredientsConvert(arrConvert(output).slice(0, 9))
				})
			}
		},

		silents_mechanisms: {
			alloy_smelting: (event, output, input, time, id) => {
				input = arrConvert(input).slice(0, 4)
				let ingredients = []
				input.forEach(item => {
					ingredients.push(SMIngredientConvert(item))
				})

				if (typeof time!="number") time = 200
				
				applyID(event, id, {
					type: "silents_mechanisms:alloy_smelting",

					ingredients: ingredients,
					result: Ingredient.of(output),

					process_time: time
				})
			},
			compressing: (event, output, input, time, id) => {
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:compressing",

					ingredient: SMIngredientConvert(arrConvert(input)),
					result: Ingredient.of(output).toJson(),

					process_time: time
				})
			},
			crushing: (event, output, input, time, id) => {
				output = arrConvert(output).slice(0, 4)
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:crushing",

					ingredient: Ingredient.of(input).toJson(),
					results: ingredientsConvert(output),

					process_time: time
				})
			},
			drying: (event, output, input, time, id) => {
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:drying",

					ingredient: Ingredient.of(input).toJson(),
					result: Ingredient.of(output).toJson(),

					process_time: time
				})
			},
			infusing: (event, output, inputItem, inputFluid, time, id) => {
				inputFluid = arrConvert(inputFluid)
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:infusing",

					ingredient: Ingredient.of(inputItem).toJson(),
					fluid: fluidConvertWithTag(inputFluid[0], inputFluid[1]),
					result: Ingredient.of(output).toJson(),

					process_time: time
				})
			},
			mixing: (event, output, input, time, id) => {
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:mixing",

					ingredients: fluidsConvertWithTag(arrConvert(input).slice(0, 4)),
					result: fluidConvert(output).toJson(),

					process_time: time
				})
			},
			refining: (event, output, input, time, id) => {
				input = arrConvert(input)
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:refining",

					ingredient: fluidConvertWithTag(input[0], input[1]),
					results: fluidsConvert(arrConvert(output).slice(0, 4)),

					process_time: time
				})
			},
			solidifying: (event, output, input, time, id) => {
				input = arrConvert(input)
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:solidifying",

					ingredient: fluidConvertWithTag(input[0], input[1]),
					result: Ingredient.of(output),

					process_time: time
				})
			}
		},

		tconstruct: {
			alloy: (event, output, input, temperature, id) => {
				if (typeof temperature!="number") temperature = 100

				applyID(event, id, {
					type: "tconstruct:alloy",

					inputs: fluidsConvertWithTag(arrConvert(input), "name"),
					result: fluidConvert(output).toJson(),

					temperature: temperature
				})
			},
			casting: (event, output, inputFluid, inputCast, isBasin, castConsumed, time, id) => {
				inputFluid = arrConvert(inputFluid)
				inputCast = Ingredient.of(inputCast)
				if (typeof time!="number") time = 60

				let recipe = {
					type: isBasin===true ? "tconstruct:casting_basin" : "tconstruct:casting_table",

					fluid: fluidConvertWithTag(inputFluid[0], inputFluid[1], "name"),
					result: Ingredient.of(output),
					
					cooling_time: time,
					cast_consumed: castConsumed===true
				}
				
				if (inputCast.id!=="minecraft:air") recipe["cast"] = inputCast.toJson()
				
				applyID(event, id, recipe)
			},
			entity_melting: (event, output, entity, damage, id) => {
				if (typeof damage!="number") damage = 1
				
				applyID(event, id, {
					type: "tconstruct:entity_melting",

					entity: {type: entity},
					result: fluidConvert(output).toJson(),

					damage: damage
				})
			},
			melting: (event, output, input, temperature, time, id) => {
				if (typeof temperature!="number") temperature = 100
				if (typeof time!="number") time = 300	

				applyID(event, id, {
					type: "tconstruct:melting",
					
					ingredient: ingredientOfNoCount(input),
					result: fluidConvert(output).toJson(),
					
					temperature:  temperature,
					time: time
				})
			},
			molding_table: (event, outputCast, inputCast, inputPattern, id) => {
				applyID(event, id, {
					type: "tconstruct:molding_table",
					
					material: Ingredient.of(inputCast),
					pattern: Ingredient.of(inputPattern),
					result: Ingredient.of(outputCast)
				})
			},
			part_builder: (event, output, pattern, materialCost, id) => {
				if (typeof materialCost!="number") materialCost = 1	

				applyID(event, id, {
					type: "tconstruct:part_builder",

					pattern: Ingredient.of(pattern).id,
					result: {item: Ingredient.of(output).id},

					cost: materialCost,
				})
			},
			severing: (event, output, entity, id) => {
				applyID(event, id, {
					type: "tconstruct:severing",
					
					entity: {type: entity},
					result: Ingredient.of(output)
				})
			},
			table_casting_material: (event, output, inputCast, materialCost, id) => {
				if (typeof materialCost!="number") materialCost = 1	

				applyID(event, id, {
					type: "tconstruct:table_casting_material",
					
					cast: ingredientOfNoCount(inputCast),
					result: Ingredient.of(output).id,
					
					item_cost: materialCost
				})
			}
		}
	}
})
