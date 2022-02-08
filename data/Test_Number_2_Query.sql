-- MONAS LATITUDE = -6.1753283960503245
-- MONAS LONGITUDE = 106.82715279746684
	
SELECT
	b.name,
	o.name outlet_name,
	o.address outlet_address,
	o.longitude outlet_longitude,
	o.latitude outlet_latitude,
	p.total_product_in_outlet,
	o.outlet_distance_from_monas
FROM
	brands b
	LEFT JOIN (
	SELECT
		*,
		111.111 * DEGREES(
			ACOS(
				LEAST(
					1.0,
					COS(
						RADIANS( latitude )) * COS(
						RADIANS(- 6.1753283960503245 )) * COS(
						RADIANS(
						longitude - ( 106.82715279746684 ))) + SIN(
						RADIANS( latitude )) * SIN(
					RADIANS(- 6.1753283960503245 ))))) outlet_distance_from_monas 
	FROM
		outlets 
	) o ON b.id = o.brand_id 
	LEFT JOIN (
		SELECT 
		outlet_id,
		COUNT(id) total_product_in_outlet
		FROM products GROUP BY outlet_id
	) p ON o.id = p.outlet_id
ORDER BY
	o.outlet_distance_from_monas ASC;