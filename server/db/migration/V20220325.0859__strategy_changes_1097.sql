update CalculationRule set
	dataType = 'boolean', choices = NULL
where calculationId = 1 and code = 'STRATEGY_BIKE_3'

update CalculationRule set
	functionBody = 'return !!<<STRATEGY_BIKE_3>> ? 5 : 0;',
	minValue = 5
where calculationId = 1 and code = 'PTS_BIKE_3'

update CalculationRule set
	name = 'Service Membership'
where calculationId = 1 and code = 'STRATEGY_SHARED_MOBILITY_1'

update CalculationRule set
	dataType = 'boolean', choices = NULL
where calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_1'

update CalculationRule set
	functionBody = 'return <<STRATEGY_MOBILITY_INVESTMENT_1>> ? 4 : 0;',
	minValue = 4, maxValue = 4
where calculationId = 1 and code = 'PTS_MOBILITY_INVESTMENT_1'

update CalculationRule set
	choices = '[
  {"id": "0", "name": "N/A"},
  {"id": "1", "name": "Reduces 10%-24% of spaces available"},
  {"id": "2", "name": "Reduces 25%-49% of spaces available"},
  {"id": "3", "name": "Reduces 50%-89% of spaces available"},
  {"id": "4", "name": "Reduces 90%-100% of spaces available"}]'
where calculationId = 1 and code = 'STRATEGY_PARKING_5'