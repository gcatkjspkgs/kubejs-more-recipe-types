// Universal Functions

function arrConvert(element) {
	return Array.isArray(element) ? element : [element]
}

function ingredientOfNoCount(item) {
	let ingredient = Ingredient.of(item)
	let json
	if (ingredient.withCount(1).tag === undefined){
		json = {item: ingredient.id}
		if (ingredient.getNbt() != null) json["nbt"] = ingredient.getNbt()
		if (!isNaN(ingredient.getChance())) json["chance"] = ingredient.getChance()
	} else {
		json = {tag: ingredient.withCount(1).tag}
	}
	return json
}

function ingredientOfAlwaysIngredient(item) {
	let ingredient = Ingredient.of(item)
	let json
	if (ingredient.withCount(1).tag === undefined){
		json = {ingredient: {item: ingredient.id}}
		if (ingredient.getNbt() != null) json["ingredient"]["nbt"] = ingredient.getNbt()
		if (!isNaN(ingredient.getChance())) json["ingredient"]["chance"] = ingredient.getChance()
	} else {
		json = {ingredient: {tag: ingredient.withCount(1).tag}}
	}
	json["count"] = ingredient.getCount()
	return json
}

function ingredientOfAlwaysChance(item) {
	let ingredient = Item.of(item)
	let json = {item: ingredient.id}
	json["count"] = ingredient.getCount()
	json["chance"] = isNaN(ingredient.getChance()) ? 1.0 : ingredient.getChance()
	if (ingredient.getNbt()!=null) json["nbt"] = ingredient.getNbt()
	return json
}

function ingredientsConvert(items) {
	let ingredients = []
	items.forEach(item => {ingredients.push(Ingredient.of(item))})
	return ingredients
}

function fluidConvert(fluid) {
	if (typeof fluid == "string") fluid = Fluid.of(fluid, 1000)
	return {fluid: fluid.id, amount: fluid.getAmount()}
}

function fluidsConvert(fluidArray) {
	let fluids = []
	fluidArray.forEach(fluid => {fluids.push(fluidConvert(fluid))})
	return fluids
}

function fluidConvertWithTag(fluidArray, typeNames, amountName) {
	Array.isArray(typeNames) ? typeNames = arrConvert(typeNames).slice(0, 2) : typeNames = ["fluid", "tag"]
	typeNames = typeNames.concat(["fluid", "tag"].slice(typeNames.length, 2))
	if (typeof amountName != "string") amountName = "amount"

	let fluid = {}
	if(typeof fluidArray[0] == "string") {
		fluidArray[0].substring(0, 1) === "#" ? fluid[typeNames[1]] = fluidArray[0].substring(1) : fluid[typeNames[0]] = fluidArray[0]
		fluid[amountName] = typeof fluidArray[1] == "number" ? fluidArray[1] : 1000
	}else{
		fluid[typeNames[0]] = fluidArray[0].id
		fluid[amountName] = fluidArray[0].getAmount()
	} 
	return fluid
}

function fluidConvertOnlyTag(fluidArray) {
	if (typeof fluidArray[0] == "string" && fluidArray[0].substring(0, 1) === "#") fluidArray[0] = fluidArray[0].substring(1)
	return {tag: fluidArray[0], amount: typeof fluidArray[1]=="number" ? fluidArray[1] : 1000 }
}

function fluidsConvertWithTag(fluidArray, typeNames, amountName) {
	let fluids = []
	fluidArray.forEach(fluid => {
		fluids.push(fluidConvertWithTag(arrConvert(fluid), typeNames, amountName))})
	return fluids
}

function blockConvert(blockString, withType) {
	let block = blockString.substring(0, 1) === "#" ? {tag: blockString.substring(1)} : {block: blockString}
	if (withType) block["type"] = blockString.substring(0, 1) === "#" ? "tag" : "block"
	return block
}
function blockIngredientsConvert(blockArray, withType) {
	let ingredients = []
	blockArray.forEach(block => {ingredients.push(blockConvert(block, withType))})
	return ingredients
}

function applyID(event, id, recipe) {
	typeof id == "string" ? event.custom(recipe).id(id) : event.custom(recipe)
}

// Mod Specific Functions

function gasConvert(gasArray, withChemicalType, gasAmountPerAmount, defaultAmount) {
	if (typeof gasAmountPerAmount!="number") gasAmountPerAmount = 1
	if (typeof defaultAmount!="number") defaultAmount = 1

	let amount = typeof gasArray[1]=="number" ? Math.round(gasArray[1]/gasAmountPerAmount) : defaultAmount
	let gas = {amount: amount===0 ? 1 : amount}
	gasArray[0].substring(0, 1)==="#" ? gas["tag"] = gasArray[0].substring(1) : gas["gas"] = gasArray[0] 
	if (withChemicalType===true) gas["chemicalType"] = "gas"
	return gas
}

function slurryConvert(slurryArray, withChemicalType, slurryAmountPerAmount, defaultAmount) {
	if (typeof slurryAmountPerAmount!="number") slurryAmountPerAmount = 1
	if (typeof defaultAmount!="number") defaultAmount = 1

	let amount = typeof slurryArray[1]=="number" ? Math.round(slurryArray[1]/slurryAmountPerAmount) : defaultAmount
	let slurry = {amount: amount===0 ? 1 : amount}
	slurryArray[0].substring(0, 1)==="#" ? slurry["tag"] = slurryArray[0].substring(1) : slurry["slurry"] = slurryArray[0] 
	if (withChemicalType===true) slurry["chemicalType"] = "slurry"
	return slurry
}

function pigmentConvert(pigmentArray) {
	return {pigment: pigmentArray[0], amount: typeof pigmentArray[1]=="number" ? pigmentArray[1] : 32}
}

function addFTBICRecipes(event, output, input, type, id) {
	let ingredients = []
	input.forEach(item => {
		let ingredient = Ingredient.of(item)
		let ingredientJson

		if (ingredient.withCount(1).tag===undefined) {
			ingredientJson = {ingredient: {item: ingredient.id}, count: ingredient.getCount()}
			if (ingredient.getNbt()!=null){
				ingredientJson["ingredient"]["type"] = "forge:nbt"
				ingredientJson["ingredient"]["nbt"] = String(ingredient.getNbt())
			}
		} else {
			ingredientJson = {ingredient: {tag: ingredient.withCount(1).tag}, count: ingredient.getCount()}
		}
		
		ingredients.push(ingredientJson)
	})

	applyID(event, id, {
		type: type,

		inputItems: ingredients,
		outputItems: ingredientsConvert(arrConvert(output))
	})
}

function addBossToolsRecipes(event, type, output, input, time, id) {
	applyID(event, id, {
		type: type,

		input: {ingredient: Ingredient.of(input)},
		output: Ingredient.of(output),

		cookTime: typeof time == "number" ? time : 200
	})
}

function SMIngredientConvert(ingredientArray) {
	let values = []
	arrConvert(ingredientArray).forEach(value => {
		values.push(Ingredient.of(value).withCount(1).toJson())
	})
	return {value: values, count: Ingredient.of(ingredientArray[0]).count}
}

function exCompressumLootTable(items) {
	let lootTable = {
		type: "minecraft:block",
		pools: []
	}

	items.forEach(pool => {
		item = Ingredient.of(pool)

		lootTable["pools"].push({
			rolls: 1,
			entries: [{
				type: "minecraft:item",
				name: item.id,
				functions: [{
					function: "minecraft:set_count",
					count: item.getCount()
				},{
					function: "minecraft:set_nbt",
					tag: item.getNbt()==null ? "{}" : String(item.getNbt())
				}]
			}],
			conditions: [{
				condition: "minecraft:random_chance",
				chance: isNaN(item.getChance()) ? 1 : item.getChance()
			}]
		})
	})
	
	return lootTable
}

// Recipes

let i

onEvent("loaded", e => {
	global.mrt = {
		alchemistry: {
			atomizer: (event, output, input, id) => {
				applyID(event, id, {
					type: "alchemistry:atomizer",
					group: "minecraft:misc",
					input: fluidConvertWithTag(arrConvert(input)),
					result: Ingredient.of(output)
				})
			},
			combiner: (event, output, input, id) => {
				applyID(event, id, {
					type: "alchemistry:combiner",
					group: "minecraft:misc",
					input: ingredientsConvert(arrConvert(input)),
					result: Ingredient.of(output)
				})
			},
			dissolver: (event, output, input, relative, rolls, id) => {
				let groups = []
				arrConvert(output).forEach(group =>{
					group = arrConvert(group)
					groups.push({stacks: ingredientsConvert(arrConvert(group[0])), probability: typeof group[1]=="number" ? group[1] : 1})
				})

				applyID(event, id, {
					type: "alchemistry:dissolver",
					group: "minecraft:misc",
					input: Ingredient.of(input),
					output: {
					  	rolls: typeof rolls=="number" ? rolls : 1,
					  	relativeProbability: relative===true,
					  	groups: groups
					}
				})
			},
			evaporator: (event, output, input, id) => {
				applyID(event, id, {
					type: "alchemistry:evaporator",
					group: "minecraft:misc",
					input: fluidConvertWithTag(arrConvert(input)),
					result: Ingredient.of(output)
				  })
			},
			liquifier: (event, output, input, id) => {
				applyID(event, id, {
					type: "alchemistry:liquifier",
					group: "minecraft:misc",
					ingredient: Ingredient.of(input),
					inputCount: Ingredient.of(input).getCount(),
					result: fluidConvert(output)
				  })
			}
		},

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

		apotheosis: {
			enchanting: (event, output, input, displayLevelRequiement, stats, id) => {
				stats = arrConvert(stats).slice(0, 3)
				stats.forEach((stat, index) => {stats[index] = arrConvert(stat)})
				stats = stats.concat(["", "", ""].slice(stats.length, 3))

				applyID(event, id, {
					type: "apotheosis:enchanting",
					input: Ingredient.of(input),
					result: Ingredient.of(output),
					display_level: typeof displayLevelRequiement=="number" ? displayLevelRequiement : 3,
					requirements: {
						eterna: typeof stats[0][0] == "number" ? stats[0][0] : 20,
						quanta: typeof stats[1][0] == "number" ? stats[1][0] : 20,
						arcana: typeof stats[2][0] == "number" ? stats[2][0] : 20
					},
					max_requirements: {
						eterna: typeof stats[0][1] == "number" ? stats[0][1] : typeof stats[0][0] == "number" ? stats[0][0] : 20,
						quanta: typeof stats[1][1] == "number" ? stats[1][1] : typeof stats[1][0] == "number" ? stats[1][0] + 20 : 40,
						arcana: typeof stats[2][1] == "number" ? stats[2][1] : typeof stats[2][0] == "number" ? stats[2][0] + 20 : 40
					}
				})
			},
			fletching: (event, output, input, id) => {
				applyID(event, id, {
					type: "apotheosis:fletching",
					ingredients: ingredientsConvert(arrConvert(input).slice(0, 3)),
					result: Ingredient.of(output)
				})
			},
			spawner_modifier: (event, stats, input, id) => {
				stats = arrConvert(stats)
				let statChanges = []
				stats.forEach(stat => {
					stat = arrConvert(stat)
					let statChange = {
						id: stat[0],
						value: stat[1]
					}
					if (typeof stat[2]=="number") statChange["min"] = stat[2]
					if (typeof stat[3]=="number") statChange["max"] = stat[3]
					statChanges.push(statChange)
				})

				let recipe = {
					type: "apotheosis:spawner_modifier",
					stat_changes: statChanges
				}

				input = arrConvert(input)
				if (Ingredient.of(input[0]).id!=="minecraft:air") recipe["mainhand"] = Ingredient.of(input[0])
				if (Ingredient.of(input[1]).id!=="minecraft:air") {
					recipe["offhand"] = Ingredient.of(input[1])
					recipe["consumes_offhand"] = input[2] === true
				}

				applyID(event, id, recipe)
			}
		},

		appliedenergistics2: {
			grinder: (event, output, input, turns, id) => {
				output = ingredientsConvert(arrConvert(output).slice(0, 3))

				applyID(event, id, {
					type: "appliedenergistics2:grinder",

					input: Ingredient.of(input),
					result: {
						primary: output[0],
						optional: output.slice(1, 3)
					},

					turns: typeof turns == "number" ? turns : 4
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
				if (typeof tier=="number"){
					if (tier < 1 || tier > 3) tier = 1
					tier = ["ONE", "TWO", "THREE"][tier - 1]
				} else if (typeof tier=="string"){
					if(!(["ONE", "TWO", "THREE"].includes(tier))) tier = "ONE"
				} else {tier = "ONE"}

				applyID(event, id, {
					type: "ars_nouveau:glyph_recipe",
					
					input: Ingredient.of(input),
					output: Ingredient.of(output),
					tier: tier
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

					starlight: typeof starlight == "number" ? starlight : 200
				})
			},
			infuser: (event, output, input, time, consumptionChance, settings, inputFluid, id) => {
				if (!Array.isArray(settings)) settings = [false, true, false]
				settings = settings.slice(0, 3)
				settings = settings.concat([false, true, false].slice(settings.length, 3))
				if (typeof inputFluid!="string") inputFluid = "astralsorcery:liquid_starlight"

				applyID(event, id, {
					type: "astralsorcery:infuser",

					fluidInput: typeof inputFluid == "string" ? inputFluid : "astralsorcery:liquid_starlight",
					input: Ingredient.of(input),
					output: Ingredient.of(output),

					consumptionChance: typeof consumptionChance == "number" ? consumptionChance : 0.1,
					duration: typeof time == "number" ? time : 100,
					consumeMultipleFluids: settings[0],
					acceptChaliceInput: settings[1],
					copyNBTToOutputs: settings[2]
				})
			},
			lightwell: (event, outputFluid, input, productionMultiplier, shatterMultiplier, color, id) => {
				applyID(event, id, {
					type: "astralsorcery:lightwell",

					input: Ingredient.of(input),
					output: outputFluid,

					productionMultiplier: typeof productionMultiplier == "number" ? productionMultiplier : 1,
					shatterMultiplier: typeof shatterMultiplier == "number" ? shatterMultiplier : 10,
					color: typeof color == "number" ? color : 0xFFFFFF
				})
			},
			liquid_interaction: (event, output, inputFluid1, inputFluid2, weight, id) => {
				inputFluid1 = arrConvert(inputFluid1)
				inputFluid2 = arrConvert(inputFluid2)
				let fluid1 = fluidConvert(inputFluid1[0])
				let fluid2 = fluidConvert(inputFluid2[0])
				if (typeof inputFluid1[1]=='undefined') inputFluid1.push(1)
				if (typeof inputFluid2[1]=='undefined') inputFluid2.push(1)

				applyID(event, id, {
					type: "astralsorcery:liquid_interaction",

					reactant1: fluid1.fluid,
					reactant1Amount: fluid1.amount,
					chanceConsumeReactant1: inputFluid1[1],

					reactant2: fluid2.fluid,
					reactant2Amount: fluid2.amount,
					chanceConsumeReactant2: inputFluid2[1],

					result: {
						id: "astralsorcery:drop_item",
						data: {
							output: Ingredient.of(output)
						}
					},

					weight: typeof weight == "number" ? weight : 1
				})
			}
		},

		atum: {
			kiln: (event, output, input, experience, id) => {
				applyID(event, id, {
					type: "atum:kiln",

					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),

					experience: typeof experience == "number" ? experience : 0.1
				})
			},
			quern: (event, output, input, rotations, id) => {
				applyID(event, id, {
					type: "atum:quern",

					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),

					rotations: typeof rotations == "number" ? rotations : 1
				})
			},
			spinning_wheel: (event, output, input, rotations, id) => {
				if (typeof rotations!="number") rotations = 1

				applyID(event, id, {
					type: "atum:spinning_wheel",

					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),

					rotations: typeof rotations == "number" ? rotations : 1
				})
			}
		},

		betterendforge: {
			alloying: (event, output, input, experience, time, id) => {
				applyID(event, id, {
					type: "betterendforge:alloying",

					ingredients: ingredientsConvert(arrConvert(input).slice(0, 2)),
					result: Ingredient.of(output),

					experience: typeof experience == "number" ? experience : 1,
					smelttime: typeof time == "number" ? time : 200
				})
			},
			anvil_smithing: (event, output, input, toolLevel, anvilLevel, toolDamage, id) => {
				applyID(event, id, {
					type: "betterendforge:anvil_smithing",

					input: Ingredient.of(input),
					result: Ingredient.of(output).id,

					level: typeof toolLevel == "number" ? toolLevel : 0,
					anvilLevel: typeof anvilLevel == "number" ? anvilLevel : 1,
					damage: typeof toolDamage == "number" ? toolDamage : 1
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

				applyID(event, id, {
					type: "betterendforge:infusion",
					
					input: Ingredient.of(middleInput),
					output: Ingredient.of(output).id,
					catalysts: catalysts,
					
					time: typeof time == "number" ? time : 100
				})
			}
		},
		
		boss_tools: {
			blasting: (event, output, input, time, id) => {
				addBossToolsRecipes(event, "boss_tools:blasting", output, input, time, id)
			},
			compressing: (event, output, input, time, id) => {
				addBossToolsRecipes(event, "boss_tools:compressing", output, input, time, id)
			}
		},
		boss_tools_giselle_addon: {
			extruding: (event, output, input, time, id) => {
				addBossToolsRecipes(event, "boss_tools_giselle_addon:extruding", output, input, time, id)
			},
			rolling: (event, output, input, time, id) => {
				addBossToolsRecipes(event, "boss_tools_giselle_addon:rolling", output, input, time, id)
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
				applyID(event, id, {
					type: "botania:mana_infusion",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					mana: typeof mana == "number" ? mana : 1000,
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
				applyID(event, id, {
					type: "botania:runic_altar",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output),

					mana: typeof mana == "number" ? mana : 5000
				})
			},
			terra_plate: (event, output, input, mana, id) => {
				applyID(event, id, {
					type: "botania:terra_plate",

					ingredients: ingredientsConvert(arrConvert(input)),
					result: Ingredient.of(output),

					mana: typeof mana == "number" ? mana : 100000
				})
			}
		},

		botanypots: {
			crop: (event, output, inputSeed, SoilCategories, growthTicks, displayBlock, id) => {
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
					growthTicks: typeof growthTicks == "number" ? growthTicks : 1200,
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
		
		createaddition: {
			rolling: (event, output, input, id) => {		
				applyID(event, id, {
					type:"createaddition:rolling",

					input: Ingredient.of(input),
					result: Ingredient.of(output)
				})
			},
			crude_burning: (event, input, time, id) => {		
				applyID(event, id, {
					type:"createaddition:crude_burning",

					input: fluidConvertWithTag(arrConvert(input), ["fluid", "fluidTag"]),
					burnTime: typeof time == "number" ? time : 200
				})
			}
		},

		draconicevolution: {
			fusion_crafting: (event, output, mainInput, sideInput, tier, energy, id) => {
				if (typeof tier!="string") tier = "DRACONIUM"
				let catalyst = Ingredient.of(mainInput)
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

					total_energy: typeof energy == "number" ? energy : 100000,
					tier: tier
				})
			}
		},
		
		divinerpg: {
			arcanium_extractor: (event, output, input, experience, time, id) => {
				applyID(event, id, {
					type: "divinerpg:arcanium_extractor",
					
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),
					
					experience: typeof experience == "number" ? experience : 0.1,
					cookingtime: typeof time == "number" ? time : 200
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

		eidolon: {
			crucible: (event, output, steps, id) => {
				final_steps = []
				arrConvert(steps).forEach(step => {
					step = arrConvert(step)
					ingredients = []
					arrConvert(step[0]).forEach(ingredient => {
						item = ingredientOfNoCount(ingredient)
						for (i = 0; i < Ingredient.of(ingredient).getCount(); i++){
							ingredients.push(item)
						}
					})

					final_steps.push({
						ingredients: ingredients,
						stirs: typeof step[1] == "number" ? step[1] : 0
					})
				})

				applyID(event, id, {
					type: "eidolon:crucible",
					result: Ingredient.of(output),
					steps: final_steps
				})
			}
		},

		elementalcraft: {
			binding: (event, output, input, elementType, elementAmount, id) => {
				applyID(event, id, {
					type: "elementalcraft:binding",

					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: typeof elementAmount == "number" ? elementAmount : 1000
				})
			},
			crystallization: (event, output, input, elementType, elementAmount, id) => {
				input = ingredientsConvert(arrConvert(input))
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
					element_amount: typeof elementAmount == "number" ? elementAmount : 1000
				})
			},
			grinding: (event, output, input, elementAmount, id) => {
				applyID(event, id, {
					type: "elementalcraft:grinding",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					element_amount: typeof elementAmount == "number" ? elementAmount : 1000,
				})
			},
			tool_infusion: (event, input, toolInfusionType, elementAmount, id) => {
				applyID(event, id, {
					type: "elementalcraft:tool_infusion",

					input: Ingredient.of(input),

					tool_infusion: toolInfusionType,
					element_amount: typeof elementAmount == "number" ? elementAmount : 1000,
				})
			},
			infusion: (event, output, input, elementType, elementAmount, id) => {
				applyID(event, id, {
					type: "elementalcraft:infusion",

					input: Ingredient.of(input),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: typeof elementAmount == "number" ? elementAmount : 1000,
				})
			},
			inscription: (event, output, input, elementType, elementAmount, id) => {
				input = ingredientsConvert(arrConvert(input).slice(0, 4))
				applyID(event, id, {
					type: "elementalcraft:inscription",

					slate: input[0],
					ingredients: input.slice(1),
					output: Ingredient.of(output),

					element_type: elementType,
					element_amount: typeof elementAmount == "number" ? elementAmount : 1000
				})
			},
			pureinfusion: (event, output, input, elementAmount, id) => {
				input = arrConvert(input).slice(0, 5)
				applyID(event, id, {
					type: "elementalcraft:pureinfusion",

					ingredients: ingredientsConvert(input),
					output: Ingredient.of(output),

					element_amount: typeof elementAmount == "number" ? elementAmount : 1000
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
				applyID(event, id, {
					type: "evilcraft:blood_infuser",
					
					item: Ingredient.of(inputItem),
					fluid: fluidConvert(inputFluid),
					result: Ingredient.of(output),
					
					duration: typeof time == "number" ? time : 200,
					xp: typeof experience == "number" ? experience : 0.1,
					tier: typeof tier == "number" ? tier : 0
				})
			},
			environmental_accumulator: (event, output, outputWeather, input, inputAction, time, cooldownTime, id) => {
				applyID(event, id, {
					type: "evilcraft:environmental_accumulator",
					
					item: Ingredient.of(input),
					weather: inputAction,
					result: {
						item: Ingredient.of(output),
						weather: outputWeather
					},
					
					duration: typeof time == "number" ? time : 100,
					cooldownTime: typeof cooldownTime == "number" ? cooldownTime : 0
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
					
					fluid: fluidConvert(inputFluid),
					input: Ingredient.of(inputItem),
					result: Ingredient.of(output)
				})
			},
			fluid_on_top: (event, output, inputFluid1, inputFluid2, id) => {
				applyID(event, id, {
					type: "exnihilosequentia:fluid_on_top",
					
					fluidInTank: fluidConvert(inputFluid1),
					fluidOnTop: fluidConvert(inputFluid2),
					result: Ingredient.of(output)
				})
			},
			fluid_transform: (event, output, inputFluid, inputItem, id) => {
				applyID(event, id, {
					type: "exnihilosequentia:fluid_transform",
					
					fluidInTank: fluidConvert(inputFluid),
					catalyst: Ingredient.of(inputItem),
					result: fluidConvert(output)
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
		
		farmersdelight: {
			cooking: (event, output, input, container, experience, time, id) => {
				applyID(event, id, {
					type: "farmersdelight:cooking",
					ingredients: ingredientsConvert(arrConvert(input)),
					result: Ingredient.of(output),
					container: Ingredient.of(container),
					experience: typeof experience=="number" ? experience : 0.5,
					cookingtime: typeof time=="number" ? time : 200
				  })
			},
			cutting: (event, output, input, tool, id) => {
				applyID(event, id, {
					type: "farmersdelight:cutting",
					ingredients: ingredientsConvert(arrConvert(input)),
					tool: Ingredient.of(tool),
					result: ingredientsConvert(arrConvert(output))
				})
			}
		},

		ftbdripper: {
			drip: (event, output, inputBlock, inputFluid, chance, id) => {
				let recipe = {
					type: "ftbdripper:drip",
					inputBlock: Ingredient.of(inputBlock).id,
					outputBlock: Ingredient.of(output).id,
					chance: typeof chance=="number" ? chance : 1.0
				}

				inputFluid.substring(0, 1)==="#" ? recipe["fluidTag"] = inputFluid.substring(1) : recipe["fluid"] = inputFluid
				
				applyID(event, id, recipe)
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
			basic_generator_fuel: (event, input, time, id) => {
				applyID(event, id, {
					type: "ftbic:basic_generator_fuel",

					ingredient: Ingredient.of(input),
					ticks: typeof time == "number" ? time : 200
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

		immersivepetroleum: {
			coker: (event, outputFluid, outputItem, inputFluid, inputItem, time, energyPerTick, id) => {
				if (typeof time!="number") time = 200
				inputItem = Ingredient.of(inputItem)

				applyID(event, id, {
					type: "immersivepetroleum:coker",
					input: {
					  count: inputItem.getCount(),
					  base_ingredient: inputItem.withCount(1).tag===undefined ? {item: inputItem.id} : {tag: inputItem.withCount(1).tag}
					},
					inputfluid: fluidConvertOnlyTag(arrConvert(inputFluid)),
					result: Ingredient.of(outputItem),
					resultfluid: fluidConvertOnlyTag(arrConvert(outputFluid)),
					time: time,
					energy: typeof energyPerTick=="number" ? energyPerTick * time : 512 * time
				})
			},
			distillation: (event, outputFluid, outputItem, input, time, energyPerTick, id) => {
				if (typeof time!="number") time = 200
				let byproducts = []
				arrConvert(outputItem).forEach(item => byproducts.push(ingredientOfAlwaysChance(item)))

				console.log(fluidConvertOnlyTag(arrConvert(input)))

				applyID(event, id, {
					type: "immersivepetroleum:distillation",
					input: fluidConvertOnlyTag(arrConvert(input)),
					results: fluidsConvert(arrConvert(outputFluid)),
					byproducts: byproducts,
					time: time,
					energy: typeof energyPerTick=="number" ? energyPerTick * time : 2048 * time
				})
			},
			hydrotreater: (event, outputFluid, outputItem, input, time, energyPerTick, id) => {
				input = arrConvert(input)
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "immersivepetroleum:hydrotreater",
					input: fluidConvertOnlyTag(arrConvert(input[0])),
					secondary_input: fluidConvertOnlyTag(arrConvert(input[1])),
					result: fluidConvert(outputFluid),
					secondary_result: ingredientOfAlwaysChance(outputItem),
					time: time,
					energy: typeof energyPerTick=="number" ? energyPerTick * time : 512 * time
				})
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
					outputFluid: `{FluidName:"${outputFluid===Fluid.empty ? "" : outputFluid.id}",Amount:${outputFluid===Fluid.empty ? 0 : outputFluid.getAmount()}}`
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
				output = fluidRecipe ? fluidConvert(output) : Ingredient.of(output)
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
		
		integrateddynamics: {
			drying_basin: (event, output, inputItem, inputFluid, time, addInMechanical, id) => {
				let recipe = {
					type: "integrateddynamics:drying_basin",
					result: Ingredient.of(output),
					duration: typeof time == "number" ? time : 200
				}

				if (Ingredient.of(inputItem).id!=="minecraft:air") recipe["item"] = Ingredient.of(inputItem)
				recipe["fluid"] = fluidConvertWithTag(arrConvert(inputFluid))

				applyID(event, id, recipe)

				if (addInMechanical===true) {
					if (id!=null) id = `${id}/in_mechanical`
					global.mrt.integrateddynamics.mechanical_drying_basin(event, output, inputItem, inputFluid, Math.round(time/10), id)
				}
			},
			mechanical_drying_basin: (event, output, inputItem, inputFluid, time, id) => {
				let recipe = {
					type: "integrateddynamics:mechanical_drying_basin",
					result: Ingredient.of(output),
					duration: typeof time == "number" ? time : 200
				}

				if (Ingredient.of(inputItem).id!=="minecraft:air") recipe["item"] = Ingredient.of(inputItem)
				recipe["fluid"] = fluidConvertWithTag(arrConvert(inputFluid))

				applyID(event, id, recipe)
			},
			squeezer: (event, outputItems, outputFluid, input, id) => {
				outputItems = ingredientsConvert(arrConvert(outputItems))
				outputFluid = fluidConvert(outputFluid)

				let result = {}
				if(outputItems.length > 0) result["items"] = outputItems
				if(outputFluid.fluid != "minecraft:empty") result["fluid"] = outputFluid
				
				applyID(event, id, {
					type: "integrateddynamics:squeezer",
					item: Ingredient.of(input),
					result: result
				})
			},
			mechanical_squeezer: (event, outputItems, outputFluid, input, time, id) => {
				outputItems = ingredientsConvert(arrConvert(outputItems))
				outputFluid = fluidConvert(outputFluid)

				let result = {}
				if(outputItems.length > 0) result["items"] = outputItems
				if(outputFluid.fluid != "minecraft:empty") result["fluid"] = outputFluid
				
				applyID(event, id, {
					type: "integrateddynamics:mechanical_squeezer",
					item: Ingredient.of(input),
					result: result,
					duration: typeof time == "number" ? time : 10
				})
			}
		},

		lazierae2: {
			aggregator: (event, output, inputs, time, energy, id) => {
				applyID(event, id, {
					type: "lazierae2:aggregator",
					process_time: typeof time == "number" ? time : 200,
					energy_cost: typeof energy == "number" ? energy : 1000,
					output: Item.of(output),
					input: ingredientsConvert(arrConvert(inputs).slice(0, 3))
				})
			},
			centrifuge: (event, output, input, time, energy, id) => {
				applyID(event, id, {
					type: "lazierae2:centrifuge",
					process_time: typeof time == "number" ? time : 200,
					energy_cost: typeof energy == "number" ? energy : 1000,
					output: Item.of(output),
					input: [Ingredient.of(input)]
				})
			},
			energizer: (event, output, input, time, energy, id) => {
				applyID(event, id, {
					type: "lazierae2:energizer",
					process_time: typeof time == "number" ? time : 200,
					energy_cost: typeof energy == "number" ? energy : 1000,
					output: Item.of(output),
					input: [Ingredient.of(input)]
				})
			},
			etcher: (event, output, inputs, time, energy, id) => {
				applyID(event, id, {
					type: "lazierae2:etcher",
					process_time: typeof time == "number" ? time : 200,
					energy_cost: typeof energy == "number" ? energy : 1000,
					output: Item.of(output),
					input: ingredientsConvert(arrConvert(inputs).slice(0, 3))
				})
			}
		},

		mekanism: {
			activating: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:activating",
					input: gasConvert(arrConvert(input)),
					output: gasConvert(arrConvert(output))
				})
			},
			centrifuging: (event, output, input, id) => {
				input = arrConvert(input)

				applyID(event, id, {
					type: "mekanism:centrifuging",
					input: gasConvert(arrConvert(input)),
					output: gasConvert(arrConvert(output))
				})
			},
			chemical_infusing: (event, output, input, id) => {
				input = arrConvert(input)

				applyID(event, id, {
					type: "mekanism:chemical_infusing",
					leftInput: gasConvert(arrConvert(input[0])),
					rightInput: gasConvert(arrConvert(input[1])),
					output: gasConvert(arrConvert(output))
				 })
			},
			combining: (event, output, input, id) => {
				input = arrConvert(input)

				applyID(event, id, {
					type: "mekanism:combining",
					mainInput: Ingredient.of(input[0]),
					extraInput: Ingredient.of(input[1]),
					output: Ingredient.of(output)
				 })
			},
			compressing: (event, output, inputItem, inputGas, id) => {
				applyID(event, id, {
					type: "mekanism:compressing",
					itemInput: Ingredient.of(inputItem),
					gasInput: gasConvert(arrConvert(inputGas), false, 200, 1),
					output: Ingredient.of(output)
				})
			},
			crushing: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:crushing",
					input: Ingredient.of(input),
					output: Ingredient.of(output)
				})
			},
			crystallizing: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:crystallizing",
					chemicalType: input[2] === true ? "gas" : "slurry",
					input: input[2] === true ? gasConvert(input) : slurryConvert(input),
					output: Ingredient.of(output)
				 })
			},	
			dissolution: (event, output, inputItem, inputGas, id) => {
				applyID(event, id, {
					type: "mekanism:dissolution",
					itemInput: Ingredient.of(inputItem),
					gasInput: gasConvert(arrConvert(inputGas), false, 100, 1),
					output: output[2] === true ? gasConvert(arrConvert(output), true) : slurryConvert(arrConvert(output), true)
				 })
			},	
			energy_conversion: (event, input, energy, id) => {
				applyID(event, id, {
					type: "mekanism:energy_conversion",
					input: Ingredient.of(input),
					output: typeof energy == "number" ? energy : 10000
				})
			},	
			enriching: (event, output, input, id) => {
				applyID(event, id, {
					type:"mekanism:enriching",
					input: Ingredient.of(input),
					output: Ingredient.of(output)
				 })
			},
			evaporating: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:evaporating",
					input: fluidConvertWithTag(arrConvert(input)),
					output: fluidConvert(output)
				 })
			},
			gas_conversion: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:gas_conversion",
					input: Ingredient.of(input),
					output: gasConvert(arrConvert(output), false, 1, 10)
				 })
			},
			infusion_conversion: (event, output, input, id) => {
				output = arrConvert(output)
				
				applyID(event, id, {
					type: "mekanism:infusion_conversion",
					input: ingredientOfAlwaysIngredient(input),
					output: {
						infuse_type: output[0],
						amount: typeof output[1] == "number" ? output[1] : 10
					}
				})
			},		
			injecting: (event, output, inputItem, inputGas, id) => {
				applyID(event, id, {
					type:"mekanism:injecting",
					itemInput: Ingredient.of(inputItem),
					gasInput: gasConvert(arrConvert(inputGas), false, 200, 1),
					output: Ingredient.of(output)
				})
			},		
			metallurgic_infusing: (event, output, inputItem, inputInfusion, id) => {
				inputInfusion = arrConvert(inputInfusion)

				applyID(event, id, {
					type: "mekanism:metallurgic_infusing",
					itemInput: Ingredient.of(inputItem),
					infusionInput: {
						tag: inputInfusion[0],
						amount: typeof inputInfusion[1] == "number" ? inputInfusion[1] : 10
					},
					output: Ingredient.of(output)
				})
			},		
			nucleosynthesizing: (event, output, inputItem, inputGas, time, id) => {
				applyID(event, id, {
					type: "mekanism:nucleosynthesizing",
					itemInput: ingredientOfAlwaysIngredient(inputItem),
					gasInput: gasConvert(arrConvert(inputGas)),
					output: Ingredient.of(output),
					duration: typeof time == "number" ? time : 200
				})
			},		
			oxidizing: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:oxidizing",
					input: Ingredient.of(input),
					output: gasConvert(arrConvert(output))
				})	
			},		
			painting: (event, output, inputTag, inputPigment, id) => {
				applyID(event, id, {
					type: "mekanism:painting",
					itemInput: {
						ingredient:{
							type: "mekanism:without",
							base: Ingredient.of(inputTag),
							without: Ingredient.of(output)
						}
					},
					chemicalInput: pigmentConvert(arrConvert(inputPigment)),
					output: Ingredient.of(output)
				})
			},		
			pigment_extracting: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:pigment_extracting",
					input: ingredientOfAlwaysIngredient(input),
					output: pigmentConvert(arrConvert(output))
				})
			},		
			pigment_mixing: (event, output, input, id) => {
				input = arrConvert(input)

				applyID(event, id, {
					type:"mekanism:pigment_mixing",
					leftInput: pigmentConvert(arrConvert(input[0])),
					rightInput: pigmentConvert(arrConvert(input[1])),
					output: pigmentConvert(arrConvert(output))
				})
			},
			purifying: (event, output, inputItem, inputGas, id) => {
				applyID(event, id, {
					type: "mekanism:purifying",
					itemInput: Ingredient.of(inputItem),
					gasInput: gasConvert(arrConvert(inputGas), false, 200, 1),
					output: Ingredient.of(output)
				})
			},		
			reaction: (event, outputItem, outputGas, inputItem, inputFluid, inputGas, time, energy, id) => {
				let recipe = {
					type: "mekanism:reaction",
					itemInput: Ingredient.of(inputItem),
					fluidInput: fluidConvertWithTag(arrConvert(inputFluid)),
					gasInput: gasConvert(arrConvert(inputGas)),
					duration: typeof time == "number" ? time : 200,
					energyRequired: typeof energy == "number" ?  energy : 5
				}

				if (Ingredient.of(outputItem).id!=="minecraft:air") recipe["itemOutput"] = Ingredient.of(outputItem)
				if (outputGas!=null && outputGas!=="") recipe["gasOutput"] = gasConvert(outputGas)

				applyID(event, id, recipe)
			},		
			rotary: (event, toGas, toFluid, id) => {
				toGas = arrConvert(toGas)
				toFluid = arrConvert(toFluid)

				applyID(event, id, {
					type: "mekanism:rotary",
					fluidInput: fluidConvertWithTag(arrConvert(toGas[1])),
					gasOutput: gasConvert(arrConvert(toGas[0])),
					gasInput: gasConvert(arrConvert(toFluid[1])),
					fluidOutput: fluidConvert(toFluid[0])
				})
			},		
			sawing: (event, output, input, secondaryChance, id) => {
				output = arrConvert(output)

				let recipe = {
					type: "mekanism:sawing",
					input: Ingredient.of(input),
					mainOutput: Ingredient.of(output[0])
				}

				if (Ingredient.of(output[1]).id!=="minecraft:air") {
					recipe["secondaryOutput"] = Ingredient.of(output[1])
					recipe["secondaryChance"] = typeof secondaryChance=="number" ? secondaryChance : 1.0
				}

				applyID(event, id, recipe)
			},		
			separating: (event, output, input, id) => {
				output = arrConvert(output)

				applyID(event, id, {
					type: "mekanism:separating",
					input: fluidConvertWithTag(arrConvert(input)),
					leftGasOutput: gasConvert(arrConvert(output[0])),
					rightGasOutput: gasConvert(arrConvert(output[1]))
				})
			},		
			smelting: (event, output, input, id) => {
				applyID(event, id, {
					type: "mekanism:smelting",
					input: Ingredient.of(input),
					output: Ingredient.of(output)
				})
			},
			washing: (event, output, inputFluid, inputSlurry, id) => {
				output = arrConvert(output)

				applyID(event, id, {
					type: "mekanism:washing",
					fluidInput: fluidConvertWithTag(arrConvert(inputFluid)),
					slurryInput: slurryConvert(arrConvert(inputSlurry)),
					output: slurryConvert(arrConvert(output))
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
				applyID(event, id, {
					type: "mysticalagriculture:soul_extraction",
					input: Ingredient.of(input),
					output: {
						type: soulType,
						souls: typeof soulAmount == "number" ? soulAmount : 1
					}
				})
			}
		},

		mythicbotany: {
			infusion: (event, output, input, mana, color, id) => {		
				color = arrConvert(color)
				
				applyID(event, id, {
					type: "mythicbotany:infusion",
					group: "infuser",
					ingredients: ingredientsConvert(arrConvert(input)),
					output: Ingredient.of(output),
					mana: typeof mana=="number" ? mana : 500000,
					fromColor: typeof color[0]=="number" ? color[0] : 0xFFFFFF,
					toColor: typeof color[1]=="number" ? color[1] : 0x000000
				})
			}
		},

		naturesaura: {
			altar: (event, output, input, catalyst, is_nether, aura, time, id) => {		
				let recipe = {
					type: "naturesaura:altar",
					input: Ingredient.of(input),
					output: Ingredient.of(output),
					aura_type: is_nether === true ? "naturesaura:nether" : "naturesaura:overworld",
					aura: typeof aura == "number" ? aura : 10000,
					time: typeof time == "number" ? time : 200
				}

				if (Item.of(catalyst).id != "minecraft:air") {
					recipe["catalyst"] = Item.of(catalyst)
				}

				applyID(event, id, recipe)
			},
			animal_spawner: (event, entity, input, aura, time, id) => {		
				applyID(event, id, {
    				type: "naturesaura:animal_spawner",
    				ingredients: ingredientsConvert(arrConvert(input).slice(0, 4)),
    				entity: entity,
					aura: typeof aura == "number" ? aura : 10000,
					time: typeof time == "number" ? time : 200
				})
			},
			offering: (event, output, input, start_item, id) => {		
				applyID(event, id, {
					type: "naturesaura:offering",
					input: Ingredient.of(input),
					start_item: Ingredient.of(start_item),
					output: Ingredient.of(output)
				})
			},
			tree_ritual: (event, output, input, sapling, time, id) => {		
				applyID(event, id, {
					type: "naturesaura:tree_ritual",
					ingredients: ingredientsConvert(arrConvert(input).slice(0, 8)),
					sapling: Ingredient.of(sapling).toJson(),
					output: Ingredient.of(output).toResultJson(),
					time: typeof time == "number" ? time : 200
				})
			}
		},

		occultism: {
			crushing: (event, output, input, time, id) => {
				applyID(event, id, {
					type: "occultism:crushing",
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output),
					crushing_time: typeof time == "number" ? time : 200
				})
			},
			miner: (event, output, weight, isOre, id) => {
				applyID(event, id, {
					type: "occultism:miner",
					ingredient: {tag: isOre === true ? "occultism:miners/ores" : "occultism:miners/basic_resources"},
					result: Ingredient.of(output),
					weight: typeof weight == "number" ? weight : 500
				})
			},
			spirit_fire: (event, output, input, id) => {
				applyID(event, id, {
					type: "occultism:spirit_fire",
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output)
				})
			},
			ritual: (event, output, input, activation_item, ritual_dummy, pentacle_id, ritual_type, time, id) => {
				let ingredients = []
				arrConvert(input).forEach(item => {ingredients.push(Ingredient.of(item).withCount(1))})

				applyID(event, id,     {
					type: "occultism:ritual",

					ritual_dummy: Ingredient.of(ritual_dummy),
					activation_item: Ingredient.of(activation_item),
					ingredients: ingredients,
					result: Ingredient.of(output),
					pentacle_id: pentacle_id,

					ritual_type: typeof ritual_type == "string" ? ritual_type : "occultism:craft",
					duration: typeof time == "number" ? time : 200
				  })
			}
		},

		pedestals: {
			cobblegen: (event, output, input, silk, id) => {
				applyID(event, id, {
					type: silk === true ? "pedestals:pedestal_cobblegensilk" : "pedestals:pedestal_cobblegen",
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output)
				})
			},
			crushing: (event, output, input, advanced, id) => {
				applyID(event, id, {
					type: advanced === true ? "pedestals:pedestal_crushing_advanced" : "pedestals:pedestal_crushing",
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output)
				})
			},
			fluid_to_xp: (event, input, xp_amount, id) => {
				applyID(event, id, {
					type: "pedestals:pedestal_fluid_to_xp",
					ingredient: Ingredient.of(input),
					result: {
						item: "minecraft:experience_bottle",
						count: typeof xp_amount == "number" ? xp_amount : 1
					}
				})
			},
			sawing: (event, output, input, advanced, id) => {
				applyID(event, id, {
					type: advanced === true ? "pedestals:pedestal_sawing_advanced" : "pedestals:pedestal_sawing",
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output)
				})
			},
			smelting_advanced: (event, output, input, advanced, id) => {
				applyID(event, id, {
					type: "pedestals:pedestal_smelting_advanced",
					ingredient: Ingredient.of(input),
					result: Ingredient.of(output)
				})
			}
		},

		pneumaticcraft: {
			amadron: (event, output, input, id) => {
				input = arrConvert(input)
				output = arrConvert(output)
				let inputFluid = input[1] === true
				let outputFluid = output[1] === true

				let recipe = {
					type: "pneumaticcraft:amadron",

					input: {
						type: inputFluid ? "ITEM" : "FLUID",
						id: inputFluid ? fluidConvert(input[0]).id : Ingredient.of(input[0]).id,
						amount: inputFluid ?  fluidConvert(input[0]).getAmount() : Ingredient.of(input[0]).getCount()
					},
					output: {
						type: outputFluid ? "ITEM" : "FLUID",
						id: outputFluid ? fluidConvert(output[0]).id : Ingredient.of(output[0]).id,
						amount: outputFluid ? fluidConvert(output[0]).getAmount() : Ingredient.of(output[0]).getCount()
					},

					static: true,
					level: 0
				}

				if (!(inputFluid)) recipe["input"]["nbt"] = Ingredient.of(input[0]).getNbt()==null ? "{}" : String(Ingredient.of(input[0]).getNbt())
				if (!(outputFluid)) recipe["output"]["nbt"] = Ingredient.of(output[0]).getNbt()==null ? "{}" : String(Ingredient.of(output[0]).getNbt())

				applyID(event, id, recipe)
			},
			assembly_laser: (event, output, input, isDrill, id) => {
				let recipe = {
					type: "pneumaticcraft:assembly_laser",

					input: {
						count: Ingredient.of(input).getCount()
					},
					result: Ingredient.of(output),

					program: isDrill===true ? "drill" : "laser"
				}

				input = Ingredient.of(input)
				input.withCount(1).tag===undefined ? recipe["input"]["item"] = input.id : recipe["input"]["tag"] = input.withCount(1).tag
				if (Ingredient.of(input).getCount()!==1) recipe["input"]["type"] = "pneumaticcraft:stacked_item"

				applyID(event, id, recipe)
			},
			explosion_crafting: (event, output, input, loss_rate, id) => {
				applyID(event, id, {
					type: "pneumaticcraft:explosion_crafting",

					input: Ingredient.of(input),
					results: ingredientsConvert(arrConvert(output)),

					loss_rate: typeof loss_rate == "number" ? loss_rate : 273
				})
			},
			heat_frame_cooling: (event, output, input, max_temp, bonusOutput, id) => {
				if (!Array.isArray(bonusOutput)) bonusOutput = []

				applyID(event, id, {
					type: "pneumaticcraft:heat_frame_cooling",

					input: Object.assign(fluidConvertWithTag(arrConvert(input)), {type: "pneumaticcraft:fluid"}),
					result: Ingredient.of(output),

					max_temp: typeof max_temp == "number" ? max_temp : 273,
					bonus_output: {
						multiplier: typeof bonusOutput[0] == "number" ? bonusOutput[0] : 0,
						limit: typeof bonusOutput[1] == "number" ? bonusOutput[1] : 0
					}
				})
			},
			heat_properties: (event, output, input, temperature, thermalResistance, heatCapacity, id) => {
				output = arrConvert(output)

				let recipe = {
					type: "pneumaticcraft:heat_properties",

					block: input,
					temperature: typeof temperature == "number" ? temperature : 298,
					thermalResistance: typeof thermalResistance == "number" ? thermalResistance : 200,
					heatCapacity: typeof heatCapacity == "number" ? heatCapacity : 5000,
				}

				if (output[0]!=="" && output[0]!=="minecraft:air") recipe["transformCold"] = {block: output[0]}
				if (output[1]!=="" && output[1]!=="minecraft:air") recipe["transformHot"] = {block: output[1]}

				applyID(event, id, recipe)
			},
			fluid_mixer: (event, outputFluid, outputItem, input1, input2, pressure, time, id) => {
				outputFluid = fluidConvert(outputFluid)
				outputItem = Ingredient.of(outputItem)
				if (typeof time!="number") time = 200
				if (typeof pressure!="number") pressure = 1

				recipe = {
					type: "pneumaticcraft:fluid_mixer",

					input1: Object.assign(fluidConvertWithTag(arrConvert(input1)), {type: "pneumaticcraft:fluid"}),
					input2: Object.assign(fluidConvertWithTag(arrConvert(input2)), {type: "pneumaticcraft:fluid"}),

					pressure: pressure,
					time: time
				}

				if (outputFluid.id!=="minecraft:empty") recipe["fluid_output"] = outputFluid
				if (outputItem.id!=="minecraft:air") recipe["item_output"] = outputItem

				applyID(event, id, recipe)
			},
			fuel_quality: (event, input, air_per_bucket, burn_rate, id) => {
				applyID(event, id, {
					type: "pneumaticcraft:fuel_quality",

					fluid: Object.assign(fluidConvertWithTag(arrConvert(input)), {type: "pneumaticcraft:fluid"}),

					air_per_bucket: typeof air_per_bucket == "number" ? air_per_bucket : 100000,
					burn_rate: typeof burn_rate == "number" ? burn_rate : 1
				})
			},
			pressure_chamber: (event, output, input, pressure, id) => {
				if (typeof pressure!="number") pressure = 1

				input = ingredientsConvert(arrConvert(input))
				input.forEach(item => {
					let itemJson = {count: item.getCount()}
					item.withCount(1).tag===undefined ? itemJson["item"] = item.id : itemJson["tag"] = item.withCount(1).tag
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
				let temperatures = {}
				if (typeof temperature[0]=="number") temperatures["min_temp"] = temperature[0]
				if (typeof temperature[1]=="number") temperatures["max_temp"] = temperature[1]

				applyID(event, id, {
					type: "pneumaticcraft:refinery",

					input: Object.assign(fluidConvertWithTag(arrConvert(input)), {type: "pneumaticcraft:fluid"}),
					results: fluidsConvert(arrConvert(output).slice(0, 4)),

					temperature: temperatures,
				})
			},
			thermo_plant: (event, outputItem, outputFluid, inputItem, inputFluid, temperature, pressure, speed, exothermic, id) => {
				inputItem = Ingredient.of(inputItem)
				let itemJson = {count: inputItem.getCount()}
				inputItem.withCount(1).tag===undefined ? itemJson["item"] = inputItem.id : itemJson["tag"] = inputItem.withCount(1).tag
				if (inputItem.getCount()!==1) inputItem = Object.assign(itemJson, {type: "pneumaticcraft:stacked_item"})

				inputFluid = arrConvert(inputFluid)
				let inputFluidConverted = inputFluid[0].substring(0, 1)==="#" ?  fluidConvert("minecraft:water") : fluidConvert(inputFluid)

				outputItem = Ingredient.of(outputItem)
				outputFluid = fluidConvert(outputFluid)

				if (typeof speed!="number") speed = 1
				temperature = arrConvert(temperature)

				let recipe = {
					type: "pneumaticcraft:thermo_plant",
					speed: speed,
					exothermic: exothermic===true
				}

				if (inputItem.id!=="minecraft:air") recipe["item_input"] = inputItem
				if (inputFluidConverted.id!=="minecraft:empty") {
					recipe["fluid_input"] = Object.assign(fluidConvertWithTag(arrConvert(inputFluid)), {type: "pneumaticcraft:fluid"})
				}

				if (outputItem.id!=="minecraft:air") recipe["item_output"] = outputItem
				if (outputFluid.id!=="minecraft:empty") recipe["fluid_output"] = outputFluid

				let temperatures = {}
				if (typeof temperature[0]=="number") temperatures["min_temp"] = temperature[0]
				if (typeof temperature[1]=="number") temperatures["max_temp"] = temperature[1]
				if (Object.keys(temperatures).length === 0) recipe["temperature"] = temperatures

				if (typeof pressure=="number") recipe["pressure"] = pressure

				applyID(event, id, recipe)
			}
		},

		powah: {
			energizing: (event, output, input, energy, id) => {
				input = arrConvert(input).slice(0, 6)

				applyID(event, id, {
					type: "powah:energizing",

					ingredients: ingredientsConvert(input),
					result: Ingredient.of(output),

					energy: typeof energy == "number" ? energy : 200
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
					ingredients.push(SMIngredientConvert(arrConvert(item)))
				})

				applyID(event, id, {
					type: "silents_mechanisms:alloy_smelting",

					ingredients: ingredients,
					result: Ingredient.of(output),

					process_time: typeof time == "number" ? time : 200
				})
			},
			compressing: (event, output, input, time, id) => {
				applyID(event, id, {
					type: "silents_mechanisms:compressing",

					ingredient: SMIngredientConvert(arrConvert(input)),
					result: Ingredient.of(output).toJson(),

					process_time: typeof time == "number" ? time : 200
				})
			},
			crushing: (event, output, input, time, id) => {
				output = arrConvert(output).slice(0, 4)
				applyID(event, id, {
					type: "silents_mechanisms:crushing",

					ingredient: Ingredient.of(input).toJson(),
					results: ingredientsConvert(output),

					process_time: typeof time == "number" ? time : 200
				})
			},
			drying: (event, output, input, time, id) => {
				applyID(event, id, {
					type: "silents_mechanisms:drying",

					ingredient: Ingredient.of(input).toJson(),
					result: Ingredient.of(output).toJson(),

					process_time: typeof time == "number" ? time : 200
				})
			},
			infusing: (event, output, inputItem, inputFluid, time, id) => {
				applyID(event, id, {
					type: "silents_mechanisms:infusing",

					ingredient: Ingredient.of(inputItem).toJson(),
					fluid: fluidConvertWithTag(arrConvert(inputFluid)),
					result: Ingredient.of(output).toJson(),

					process_time: typeof time == "number" ? time : 200
				})
			},
			mixing: (event, output, input, time, id) => {
				applyID(event, id, {
					type: "silents_mechanisms:mixing",

					ingredients: fluidsConvertWithTag(arrConvert(input).slice(0, 4)),
					result: fluidConvert(output),

					process_time: typeof time == "number" ? time : 200
				})
			},
			refining: (event, output, input, time, id) => {
				applyID(event, id, {
					type: "silents_mechanisms:refining",

					ingredient: fluidConvertWithTag(arrConvert(input)),
					results: fluidsConvert(arrConvert(output).slice(0, 4)),

					process_time: typeof time == "number" ? time : 200
				})
			},
			solidifying: (event, output, input, time, id) => {
				if (typeof time!="number") time = 200

				applyID(event, id, {
					type: "silents_mechanisms:solidifying",

					ingredient: fluidConvertWithTag(arrConvert(input)),
					result: Ingredient.of(output),

					process_time: typeof time == "number" ? time : 200
				})
			}
		},

		tconstruct: {
			alloy: (event, output, input, temperature, id) => {
				applyID(event, id, {
					type: "tconstruct:alloy",

					inputs: fluidsConvertWithTag(arrConvert(input), ["name"]),
					result: fluidConvert(output),
 
					temperature: typeof temperature == "number" ? temperature : 100
				})
			},
			casting: (event, output, inputFluid, inputCast, isBasin, castConsumed, time, id) => {
				inputCast = Ingredient.of(inputCast)

				let recipe = {
					type: isBasin===true ? "tconstruct:casting_basin" : "tconstruct:casting_table",

					fluid: fluidConvertWithTag(arrConvert(inputFluid), ["name"]),
					result: Ingredient.of(output),
					
					cooling_time: typeof time == "number" ? time : 300,
					cast_consumed: castConsumed === true
				}
				
				if (inputCast.id!=="minecraft:air") recipe["cast"] = inputCast.toJson()
				
				applyID(event, id, recipe)
			},
			entity_melting: (event, output, entity, damage, id) => {
				if (typeof damage!="number") damage = 1
				
				applyID(event, id, {
					type: "tconstruct:entity_melting",

					entity: {type: entity},
					result: fluidConvert(output),

					damage: damage
				})
			},
			melting: (event, output, input, temperature, time, id) => {
				applyID(event, id, {
					type: "tconstruct:melting",
					
					ingredient: ingredientOfNoCount(input),
					result: fluidConvert(output),
					
					temperature: typeof temperature == "number" ? temperature : 100,
					time: typeof time == "number" ? time : 300
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
			ore_melting: (event, output, byproducts, input, temperature, time, id) => {
				byproducts = arrConvert(byproducts)

				let recipe = {
					type: "tconstruct:ore_melting",

					ingredient: ingredientOfNoCount(input),
					result: fluidConvert(output),

					temperature: typeof temperature == "number" ? temperature : 100,
					time: typeof time == "number" ? time : 300
				}

				if (byproducts.length > 0) recipe["byproducts"] = fluidsConvert(byproducts)
				
				applyID(event, id, recipe)
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
				applyID(event, id, {
					type: "tconstruct:table_casting_material",
					
					cast: ingredientOfNoCount(inputCast),
					result: Ingredient.of(output).id,
					
					item_cost: typeof materialCost == "number" ? materialCost : 1
				})
			}
		}
	}
})
