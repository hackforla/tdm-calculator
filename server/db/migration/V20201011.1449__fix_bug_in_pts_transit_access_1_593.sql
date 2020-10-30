update CalculationRule SET  
  minValue = 0, maxValue = 8,
  functionBody = ' 
switch (<<STRATEGY_TRANSIT_ACCESS_1>>){
	case 1:
		return 6;
	case 2:
		return 8;
	default:
		return 0;
};'
WHERE calculationId = 1 and code = 'PTS_TRANSIT_ACCESS_1'