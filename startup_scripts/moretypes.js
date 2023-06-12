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
function blockConvert(i) {
	i.substring(0, 1)==="#" ? i = {tag: i.substring(1)} : i = {block: i}
	return i
}
function blockConvertWithType(i) {
	let block = blockConvert(i)
	i.substring(0, 1)==="#" ? block["type"] = "tag" : block["type"] = "block"
	return block
}
function blockIngredientsConvert(i) {
	let ingredients = []
	i.forEach(block => {ingredients.push(blockConvert(block))})
	return ingredients
}

let i

onEvent("loaded", e => {
	global.more_recipe_types = {
		appliedenergistics2: {
			grinder: (event, input, output, turns) => {
				output = ingredientsConvert(arrConvert(output).slice(0, 3))
				if (turns==null) turns = 4

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

					input: blockIngredientsConvert(arrConvert(input)),
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
					catalyst: catalyst==null ? null : blockConvertWithType(catalyst)
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

					input: blockConvertWithType(input),
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
		
		powah: {
			energizing: (event, input, output, energy) => {
				input = arrConvert(input).slice(0, 6)
				if (energy==null) energy=100

				event.custom({
					type: "powah:energizing",

					ingredients: ingredientsConvert(input),
					result: Ingredient.of(output),

					energy: energy
				})
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
			}
		}
	}
})
