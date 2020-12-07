UPDATE [dbo].[CalculationRule]
SET description ='Offer bike share membership passes to employees and/or residents in accordance to the Bikeshare for Business  membership levels  (applicable for locations within 0.25 miles from an existing or planned bike share station - Bike Share Location Map).',
choices ='[{"id": "0", "name": "none"},
{"id": "3", "name": "Bronze"},
{"id": "4", "name": "Silver"},
{"id": "5", "name": "Gold"}]',
dataType='choice'
WHERE calculationid = 1 AND code ='STRATEGY_BIKE_3';

UPDATE [dbo].[CalculationRule]
SET functionbody ='switch (<<STRATEGY_BIKE_3>>){   case 5:    return 5;   case 4:    return 4;   case 3:    return 3;  default:    return 0;  };',
minValue=3,
maxValue=5
WHERE calculationid = 1 AND code ='PTS_BIKE_3';

UPDATE [dbo].[CalculationRule]
SET description ='<div><p>Pricing of parking encourages sustainable modes of travel (non-SOV) and can be accomplished in several ways. Property managers and homeowner associations can unbundle the price of parking from rents or sale of units. The parking cost is set by the project applicant, between $25 and $220 per month, and paid by the vehicle owners/drivers.</p>
<p>In retail settings, parking fees can be charged to shoppers.</p>
<p>Where on-street parking is not currently metered and is highly utilized during the same time as proposed use, the existence or creation of a new residential area parking permit program will be a prerequisite for priced and unbundled parking strategies for employer and residential sites. Additional vehicle parking utilization studies may be required for this strategy.</p></div>',
dataType='choice',
choices ='[{"id": "0", "name": "none"},
{"id": "1", "name": "the cost of each parking space is $25/mo"},
{"id": "4", "name": "the cost of each parking space is $110/mo"},
{"id": "8", "name": "the cost of each parking space is $220/mo"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_1';

UPDATE [dbo].[CalculationRule]
SET functionbody ='switch (<<STRATEGY_PARKING_1>>){   case 1:    return 1;   case 4:    return 4;   case 8:    return 8;  default:    return 0;  };',
minValue=1,
maxValue=8
WHERE calculationid = 1  AND code ='PTS_PARKING_1'; 

UPDATE [dbo].[CalculationRule]
SET 
choices ='[{"id": "0", "name": "none"},
{"id": "1", "name": "Reduces 25% of the parking spaces available relative to the  parking baseline"},
{"id": "2", "name": "Reduces 50% of the parking spaces available relative to the  parking baseline"},
{"id": "3", "name": "Reduces 75% of the parking spaces available relative to the  parking baseline"},
{"id": "4", "name": "Reduces 100% of the parking spaces available relative to the  parking baseline"}]',
dataType='choice'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_5';


UPDATE [dbo].[CalculationRule]
SET functionbody ='switch (<<STRATEGY_PARKING_5>>){   case 1:    return 1;   case 2:    return 2;   case 3:    return 3;   case 4:    return 4;  default:    return 0;  };',
minValue=1,
maxValue=4
WHERE calculationid = 1  AND code ='PTS_PARKING_5'; 

UPDATE [dbo].[CalculationRule]
SET 
choices ='[{"id": "0", "name": "none"},
{"id": "2", "name": "1 day"},
{"id": "3", "name": "2 days"},
{"id": "4", "name": "3 days"},
{"id": "5", "name": "4 days"},
{"id": "6", "name": "5 days"}]',
dataType='choice'
WHERE calculationid = 1 AND code ='STRATEGY_TELECOMMUTE';


UPDATE [dbo].[CalculationRule]
SET functionbody ='switch (<<STRATEGY_TELECOMMUTE>>){   case 2:    return 2;   case 3:    return 3;   case 4:    return 4;   case 5:    return 5;   case 6:    return 6;  default:    return 0;  };',
minValue=2,
maxValue=6
WHERE calculationid = 1  AND code ='PTS_TELECOMMUTE'; 

UPDATE [dbo].[CalculationRule]
SET description ='Provide all employees/units transit subsidies. Points awarded vary based on the amount of transit subsidy provided per employee or residential unit.',
choices ='[{"id": "0", "name": "none"},
{"id": "7", "name": "25% of monthly fare"},
{"id": "10", "name": "50% of monthly fare"},
{"id": "12", "name": "75% of monthly fare"},
{"id": "14", "name": "100% of monthly fare"}]',
dataType='choice'
WHERE calculationid = 1 AND code ='STRATEGY_TRANSIT_ACCESS_3';

UPDATE [dbo].[CalculationRule]
SET functionbody ='switch (<<STRATEGY_TRANSIT_ACCESS_3>>){   case 7:    return 7;   case 10:    return 10;   case 12:    return 12;   case 14:    return 14;  default:    return 0;  };',
minValue=7,
maxValue=14
WHERE calculationid = 1  AND code ='PTS_TRANSIT_ACCESS_3'; 