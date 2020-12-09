update CalculationRule SET
  minValue = 3,
  maxValue = 9,
  functionBody = 'switch(<<STRATEGY_TRANSIT_ACCESS_1>>){
    case 0: return 0;
    case 1: return 3;
    case 2: return 6;
	case 3: return 7;
    case 4: return 5;
	case 5: return 8;
    case 6: return 9;
  }'
where calculationId = 1 and code = 'PTS_TRANSIT_ACCESS_1'