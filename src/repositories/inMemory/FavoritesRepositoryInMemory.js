class FavoritesRepositoryInMemory {
  constructor() {
    this.favorites = [];
  }

  async createFavorite({ user_id, product_id }) {
    const Id = Math.floor(Math.random() * 1000) + 1;
    const favorite = { id: Id, user_id, product_id };
    this.favorites.push(favorite);
    return favorite;
  }

  async deleteFavorite(id) {
    this.favorites = this.favorites.filter(favorite => favorite.id !== id);
  }

  async listFavorites(user_id) {
    return this.favorites.filter(favorite => favorite.user_id === user_id);
  }

  async findFavoriteByProductId({ product_id }) {
    return this.favorites.find(favorite => favorite.product_id === product_id);
  }

  async findFavoriteByID(id) {
    return this.favorites.find(favorite => favorite.id === id);
  }
}

module.exports = FavoritesRepositoryInMemory;
