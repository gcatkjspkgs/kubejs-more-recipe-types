function arrConvert(i) {
	if (!Array.isArray(i)) i = [i]
	return i
}
function ingredientsConvert(i) {
	let ingredients = []
	i.forEach(item => {ingredients.push(Ingredient.of(item).toJson())})
	return ingredients
}
function fluidConvert(i) {
	if (typeof i == "string") i = Fluid.of(i, 1000)
	return i
}

onEvent("loaded", e => {
	global.more_recipe_types = {
		powah: {
			energizing: (event, input, output, energy) => {
				input = arrConvert(input).slice(0, 6)
				if (energy==null) energy=100

				event.custom({
					type: "powah:energizing",

					ingredients: ingredientsConvert(input),
					result: Ingredient.of(output).toJson(),

					energy: energy
				})
			}
		},

		industrialforegoing: {
			dissolution_chamber: (event, input, inputFluid, output, outputFluid, time) => {
				input = arrConvert(input).slice(0, 6)
				inputFluid = fluidConvert(inputFluid)
				outputFluid = fluidConvert(outputFluid)
				if (time==null) time = 20

				event.custom({
					type: "industrialforegoing:dissolution_chamber",
					
					input: ingredientsConvert(input),
					inputFluid: `{FluidName:"${inputFluid.id}",Amount:${inputFluid.amount}}`,
					
					processingTime: time,
		
					output: Ingredient.of(output).toJson(),
					outputFluid: `{FluidName:"${outputFluid!=undefined ? outputFluid.id : ""}",Amount:${outputFluid!=undefined ? outputFluid.amount : 0}}`
				})
			},
			fluid_extractor: (event, input, output, breakchance, result) => {
				output = fluidConvert(output)
				if (breakchance==null) breakchance = 0
				if (result==null) result = "minecraft:air"

				event.custom({
					type: "industrialforegoing:fluid_extractor",
		
					input: Ingredient.of(input).toJson(),
					result: result,
					output: `{FluidName:"${output.id}",Amount:${output.amount}}`,
					
					breakChance: breakchance,
					defaultRecipe: false
				})
			}
		}
	}
})
