
UPDATE CalculationRule SET
functionBody =
'
// <<PKG_RESIDENTIAL>>
return (!!<<STRATEGY_BIKE_4>> && !!<<STRATEGY_INFO_3>> && !!(<<STRATEGY_PARKING_1>> === 8)) ? 1 : 0;
'
WHERE calculationId = 1 and code = 'PTS_PKG_RESIDENTIAL'