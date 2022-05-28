UPDATE CalculationRule SET
	description = 'Reduction in parking supply below the generalized citywide parking 
	baseline, using parking reduction mechanisms, including, but not 
	limited to, TOC, Density Bonus, Bicycle Parking ordinance, locating in an Enterprise 
	Zone or Specific Plan area, or compliance with zoning regulations that require less 
	parking than the generalized citywide parking baseline. Points are also awarded for 
	projects providing a reduced supply of parking as allowed by an approved variance.'
WHERE calculationId = 1 and code = 'STRATEGY_PARKING_5'