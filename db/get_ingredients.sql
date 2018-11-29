SELECT DISTINCT ON (ingredients.ingredient_id) ingredients.ingredient, ingredients.ingredient_id
FROM ingredients
WHERE user_id = $1