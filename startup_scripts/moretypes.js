onEvent("loaded", e => {
	global.more_recipe_types = {
		powah: {
			energizing: (event, input, output, energy) => {
				if (energy==null) energy=100
				if (!Array.isArray(input)) input = [input]
				
				let ingredients = []
				input.forEach(i => {ingredients.push(Ingredient.of(i))})

				event.custom({
					type: "powah:energizing",

					ingredients: ingredients,
					result: Ingredient.of(output),

					energy: energy
				})
			}
		}
	}
})
