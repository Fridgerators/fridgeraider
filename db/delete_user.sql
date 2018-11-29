DELETE FROM ingredients
WHERE user_id = $1;

DELETE FROM cookbook
WHERE user_id = $1;

DELETE FROM users
WHERE user_id = $1;