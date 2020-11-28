UPDATE CalculationRule SET
	description = '<div><p>The City defines "habitable rooms" as enclosed spaces used for living purposes. 
	This includes bedrooms, living rooms and dining rooms, given that they are all enclosed.
	</p>
	<p>Any non-enclosed alcove more than 50 square feet in size is also included in this definition 
	(dining area excluded). The City''s definition of habitable room excludes lobbies, hallways, 
	and bathrooms. The City includes kitchens in the definition only for calculating parking requirements.
	</p>
	<p>Therefore, a living room, dining room, and kitchen, all completely separated from each 
	other with walls, will count as three habitable rooms for parking calculation purposes.</p></div>'
WHERE calculationId = 1 and code in ('UNITS_HABIT_LT3', 'UNITS_HABIT_3', 'UNITS_HABIT_GT3')