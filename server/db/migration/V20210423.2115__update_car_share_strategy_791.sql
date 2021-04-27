UPDATE [dbo].[CalculationRule]
SET name = 'Car Share Memberships',
dataType = 'choice',
choices = '[{"id": "0", "name":"N/A"},{"id": "1", "name":"Third party operator membership"},{"id": "2", "name":"BlueLA"}]',
description = 'Offer an annual car share membership for at least 50% of residents or employees. Membership to Blue LA Car Share earns an additional point due to the program''s priority on promoting equity in selecting the service area. Consult LADOT in determining if the project location is eligible for Blue LA membership based on the service area.'
WHERE calculationid = 1 AND code ='STRATEGY_CAR_SHARE_3';

UPDATE [dbo].[CalculationRule]
SET functionBody = 'switch(<<STRATEGY_CAR_SHARE_3>>){
    case 0: return 0;
    case 1: return 3;
    case 2: return 4;
  }
',
minValue = 3, maxValue = 4
WHERE calculationid = 1 AND code ='PTS_CAR_SHARE_3';

DELETE [dbo].[CalculationRule]
WHERE calculationid = 1 AND code ='STRATEGY_CAR_SHARE_2';

DELETE [dbo].[CalculationRule]
WHERE calculationid = 1 AND code ='PTS_CAR_SHARE_2';

UPDATE [dbo].[CalculationRule]
SET functionBody = 'return <<PTS_CAR_SHARE_1>> + 
	<<PTS_CAR_SHARE_3>> + 
	<<PTS_CAR_SHARE_4>> + 
	<<PTS_CAR_SHARE_BONUS>> + 
	<<PTS_CAR_SHARE_ELECTRIC>> ;
'
WHERE calculationid = 1 AND code ='PTS_CAR_SHARE';

UPDATE [dbo].[CalculationRule]
SET functionBody = '
// <<STRATEGY_CAR_SHARE_BONUS>>
 return  (Math.sign(<<PTS_CAR_SHARE_1>>) 
	+ Math.sign(<<PTS_CAR_SHARE_3>>) 
	+ Math.sign(<<PTS_CAR_SHARE_4>>) > 1) ? 2 : 0;
'
WHERE calculationid = 1 AND code ='PTS_CAR_SHARE_BONUS';