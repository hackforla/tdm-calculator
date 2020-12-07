/*
  Equity Adjustment - Bike Shower
*/
update CalculationRule SET
  dataType = 'choice',
  choices = '[{"id": "0", "name": "N/A"},
{"id": "1", "name": "Private"},
{"id": "2", "name": "Publicly Accessible"},
{"id": "3", "name": "Publicly Accessible AND in a disadvantaged area"}]'
where calculationId = 1 and code = 'STRATEGY_BIKE_5'

update CalculationRule SET
  minValue = 2,
  maxValue = 5,
  functionBody = 'switch(<<STRATEGY_BIKE_5>>){
    case 0: return 0;
    case 1: return 2;
    case 2: return 4;
    case 3: return 5;
  }'
where calculationId = 1 and code = 'PTS_BIKE_5'

/*
  Equity Adjustment - Car Share
*/
update CalculationRule SET
  dataType = 'choice',
  choices = '[{"id": "0", "name": "N/A"},
{"id": "1", "name": "Private"},
{"id": "2", "name": "Publicly Accessible"}]'
where calculationId = 1 and code = 'STRATEGY_CAR_SHARE_1'

update CalculationRule SET
  minValue = 3,
  maxValue = 4,
  functionBody = 'switch(<<STRATEGY_CAR_SHARE_1>>){
    case 0: return 0;
    case 1: return 3;
    case 2: return 4;
  }'
where calculationId = 1 and code = 'PTS_CAR_SHARE_1'

/*
  Equity Adjustment - Transit Displays
*/
update CalculationRule SET
  dataType = 'choice',
  choices = '[{"id": "0", "name": "N/A"},
{"id": "1", "name": "Internally visible"},
{"id": "2", "name": "Publicly visible"}]'
where calculationId = 1 and code = 'STRATEGY_INFO_1'

update CalculationRule SET
  minValue = 2,
  maxValue = 3,
  functionBody = 'switch(<<STRATEGY_INFO_1>>){
    case 0: return 0;
    case 1: return 2;
    case 2: return 3;
  }'
where calculationId = 1 and code = 'PTS_INFO_1'

/*
  Equity Adjustment - Microtransit
*/
update CalculationRule SET
  dataType = 'choice',
  choices = '[{"id": "0", "name": "N/A"},
{"id": "1", "name": "Does not connect to HQTA"},
{"id": "2", "name": "Does not connect to HQTA and if publicly available"},
{"id": "3", "name": "Does not connect to HQTA and if publicly available and in disadvantaged area"},
{"id": "4", "name": "Connects to HQTA"},
{"id": "5", "name": "Connects to HQTA and if publicly available"},
{"id": "6", "name": "Connects to HQTA and if publicly available and in disadvantaged area"}
]'
where calculationId = 1 and code = 'STRATEGY_TRANSIT_ACCESS_1'

update CalculationRule SET
  minValue = 3,
  maxValue = 13,
  functionBody = 'switch(<<STRATEGY_TRANSIT_ACCESS_1>>){
    case 0: return 0;
    case 1: return 3;
    case 2: return 9;
	case 3: return 11;
    case 4: return 5;
	case 5: return 11;
    case 6: return 13;
  }'
where calculationId = 1 and code = 'PTS_TRANSIT_ACCESS_1'