UPDATE ingredients
SET ingredient = $2
WHERE user_id = $1
RETURNING ingredients.ingredient