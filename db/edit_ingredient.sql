UPDATE ingredients
SET ingredient = $2
WHERE ingredient_id = $1
RETURNING *