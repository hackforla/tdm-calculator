update CalculationRule set
 dataType = 'choice',
 choices = '[{"id": "0", "name": "N/A"},
    {"id": "1", "name": "25-49% of 1/4 mi walkshed"},
    {"id": "2", "name": "50-74% of 1/4 mi walkshed"},
    {"id": "3", "name": "75-99% of 1/4 mi walkshed"},
	{"id": "4", "name": "100% of 1/4 mi walkshed"}
	]', minValue = null, maxValue = null
where calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_1'

update CalculationRule set
 functionBody = 'switch (<<STRATEGY_MOBILITY_INVESTMENT_1>>)
      {   case 1:    return 4;   
        case 2:    return 6;   
        case 3:    return 8;   
		case 4:	return 10;
        default:   return 0;  	};',
 minValue = 4,
 maxValue = 10
where calculationId = 1 and code = 'PTS_MOBILITY_INVESTMENT_1'

update CalculationRule set
 dataType = 'choice',
 choices = '[{"id": "0", "name": "N/A"},
    {"id": "1", "name": "$50,000-$199,999"},
    {"id": "2", "name": "$200,000-$499,999"},
    {"id": "3", "name": "$500,000+"}
	]', minValue = null, maxValue = null
where calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_2'


update CalculationRule set
 functionBody = 'switch (<<STRATEGY_MOBILITY_INVESTMENT_2>>)
      {   case 1:    return 2;   
        case 2:    return 4;   
        case 3:    return 6;   
        default:   return 0;  	};',
 minValue = 2,
 maxValue = 6
where calculationId = 1 and code = 'PTS_MOBILITY_INVESTMENT_2'

update CalculationRule set
 functionBody = 'return <<STRATEGY_PARKING_2>> ? 4 : 0;',
 minValue = 4, maxValue = 4
where calculationId = 1 and code = 'PTS_PARKING_2'

update CalculationRule set
 functionBody = 'switch (<<STRATEGY_PARKING_5>>){   
 case 1:    return 2;   
 case 2:    return 4;   
 case 3:    return 8;   
 case 4:    return 12;  
 default:    return 0;  };',
 minValue = 2, maxValue = 12
where calculationId = 1 and code = 'PTS_PARKING_5'