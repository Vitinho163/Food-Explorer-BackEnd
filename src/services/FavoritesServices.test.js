const FavoritesRepositoryInMemory = require('../repositories/inMemory/FavoritesRepositoryInMemory');
const FavoritesServices = require('./FavoritesServices');
const AppError = require("../utils/AppError");

describe('FavoritesServices', () => {
  let favoritesRepositoryInMemory;
  let favoritesServices;

  beforeEach(() => {
    favoritesRepositoryInMemory = new FavoritesRepositoryInMemory();
    favoritesServices = new FavoritesServices(favoritesRepositoryInMemory);
  });

  it("should be able to add a new favorite", async() => {
    const favoriteData = {
      user_id: "2",
      product_id: "5"
    };

    const addedFavorite = await favoritesServices.addFavorite(favoriteData);

    expect(addedFavorite).toHaveProperty("id");
    expect(addedFavorite.user_id).toBe(favoriteData.user_id);
    expect(addedFavorite.product_id).toBe(favoriteData.product_id);
  });

  it("should not be able to add a favorite if it already exists", async() => {
    const favoriteData = {
      user_id: "2",
      product_id: "5"
    };

    await favoritesServices.addFavorite(favoriteData);

    await expect(favoritesServices.addFavorite(favoriteData)).rejects.toEqual(new AppError("This product is already in the favorites list!"));
  });

  it("should be able to delete a favorite", async() => {
    const favoriteData = {
      user_id: "2",
      product_id: "5"
    };

    const addedFavorite = await favoritesServices.addFavorite(favoriteData);

    await favoritesServices.deleteFavorite(addedFavorite.id);

    const deletedFavorite = await favoritesRepositoryInMemory.findFavoriteByProductId({ product_id: favoriteData.product_id });
    expect(deletedFavorite).toBeUndefined();
  });

  it("should be able to list favorites for a user", async() => {
    const user_id = "2";
    const favoritesData = [
      { user_id, product_id: "5" },
      { user_id, product_id: "6" },
      { user_id, product_id: "7" }
    ];

    for (const favoriteData of favoritesData) {
      await favoritesServices.addFavorite(favoriteData);
    }

    const userFavorites = await favoritesServices.listFavorites(user_id);

    expect(userFavorites).toHaveLength(favoritesData.length);
    for (const favorite of userFavorites) {
      expect(favorite.user_id).toBe(user_id);
    }
  })

});
