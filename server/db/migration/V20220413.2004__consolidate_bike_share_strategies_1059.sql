UPDATE CalculationRule SET 
name = 'Bike Share Station',
dataType = 'choice',
choices = '[{"id": "0", "name": "N/A"},
{"id": "1", "name": "Locate near a Bike Share Station"},
{"id": "2", "name": "Install Bike Share Station"}]',
minValue = NULL,
maxValue = NULL,
description = '<div><p><b>Locate near a Bike Share Station:</b> 
Project is located within 600 feet of an existing bike share station - <a href="https://bikeshare.metro.net/stations/">Bike Share Location Map</a>. LADOT shall pre-approve the selection of this TDM Strategy.</p>
<p style="margin-bottom:0;"><b>Install Bike Share Station:</b> Install a publicly accessible bike share station with a minimum of 10 docks. 
Must meet LADOT Bike Share Siting Guidelines and be pre-approved by qualified LADOT bike share program staff.</p>
</div>'
where calculationId = 1 and code = 'STRATEGY_BIKE_1'

UPDATE CalculationRule SET
	functionBody = 'switch(<<STRATEGY_BIKE_1>>){
    case 0: return 0;
    case 1: return 2;
    case 2: return 5;
  }',
  minValue = 2,
  maxValue = 5
where calculationId =1 and code = 'PTS_BIKE_1'

UPDATE CalculationRule SET
functionBody = 'return <<PTS_BIKE_1>> + <<PTS_BIKE_3>> + <<PTS_BIKE_4>> + <<PTS_BIKE_5>> + <<PTS_BIKE_BONUS>>;'
where calculationId =1 and code = 'PTS_BIKE'

DELETE CalculationRule 
where calculationId =1 and code = 'STRATEGY_BIKE_2'

DELETE CalculationRule 
where calculationId =1 and code = 'PTS_BIKE_2'

