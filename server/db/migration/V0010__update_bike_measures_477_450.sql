UPDATE CalculationRule SET
	description = 'Implementation of three or more Bicycle Facilities strategies for bonus points.'
WHERE calculationId = 1 and code = 'STRATEGY_BIKE_BONUS'

UPDATE CalculationRule SET
functionBody = 
'
// <<STRATEGY_BIKE_BONUS>>
return Math.max(0, Math.sign(<<PTS_BIKE_1>>) 
	+ Math.sign(<<PTS_BIKE_2>>) 
	+ Math.sign(<<PTS_BIKE_3>>) 
	+ Math.sign(<<PTS_BIKE_4>>) 
	+ Math.sign(<<PTS_BIKE_5>>)
	-2);
	'
WHERE calculationId = 1 and code = 'PTS_BIKE_BONUS'

UPDATE CalculationRule SET
	value = 'true'
WHERE calculationId = 1 and code = 'STRATEGY_BIKE_4'