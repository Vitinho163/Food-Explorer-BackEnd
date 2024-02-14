class IngredientsRepositoryInMemory {
  constructor() {
    this.ingredients = [];
    this.id = Math.floor(Math.random() * 1000) + 1
  }

  async createIngredients(ingredients) {
    const createdIngredients = ingredients.map(ingredient => {
      return {
        id: this.id,
        name: ingredient
      }
    })

    this.ingredients.push(...createdIngredients);

    return this.ingredients;
  }
}

module.exports = IngredientsRepositoryInMemory;