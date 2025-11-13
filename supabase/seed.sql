insert into public.ingredients(name, category) values
('potato','vegetable') on conflict do nothing,
('salt','spice') on conflict do nothing,
('cumin','spice') on conflict do nothing,
('butter','dairy') on conflict do nothing;


insert into public.recipes(title, instructions, image_url) values
('Simple Mashed Potatoes', 'Boil potatoes, mash, add butter and salt.', null),
('Aloo Jeera', 'Fry cumin in oil, add diced potatoes, salt; cook till crisp.', null)
on conflict do nothing;


-- link ingredients quickly
insert into public.recipe_ingredients(recipe_id, ingredient_id)
select r.id, i.id
from public.recipes r join public.ingredients i on (
(r.title ilike '%Mashed%' and i.name in ('potato','butter','salt')) or
(r.title ilike '%Aloo Jeera%' and i.name in ('potato','cumin','salt'))
);