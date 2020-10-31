-- Delete all 'Accessibility' and 'Mobility Hubs' strategies, associated calculation panel, and usages
-- Delete 'HOV Ride Matching' and 'Neighborhood Connection to Transit Station' and usages
DELETE FROM CalculationRule
WHERE calculationId = 1 
AND code IN ('PTS_ACCESS', 'PTS_ACCESS_1', 'PTS_ACCESS_2', 'PTS_ACCESS_3', 'STRATEGY_ACCESS_1','STRATEGY_ACCESS_2', 'STRATEGY_ACCESS_3')
OR code IN ('PTS_MOBILITY_HUBS', 'STRATEGY_MOBILITY_HUBS')
OR code IN ('PTS_HOV_1', 'STRATEGY_HOV_1')
OR code IN ('PTS_TRANSIT_ACCESS_2', 'STRATEGY_TRANSIT_ACCESS_2');

-- Delete Accessibility, Mobility Hubs, and duplicate Telecommute from CalculationPanel
DELETE FROM CalculationPanel 
WHERE calculationId = 1 and [id] IN (13, 21); 

-- Remove <<PTS_ACCESS>> and <<PTS_MOBILITY_HUBS>>
UPDATE CalculationRule
SET functionBody = 'return <<PTS_AFFORDABLE>> 
  + <<PTS_BIKE>> 
  + <<PTS_CAR_SHARE>> 
  + <<PTS_CHILD_CARE>>
  + <<PTS_HOV>> 
  + <<PTS_INFO>> 
  + <<PTS_MIXED_USE>> 
  + <<PTS_PARKING>>
  + <<PTS_SHARED_MOBILITY>>
  + <<PTS_TELECOMMUTE>>
  + <<PTS_TRANSIT_ACCESS>>
  + <<PTS_TMO>>
  + <<PTS_APPLICANT>>
  + <<PTS_PKG_RESIDENTIAL>>
  + <<PTS_PKG_COMMERCIAL>>;'
WHERE calculationid = 1 AND code ='PTS_EARNED';

-- Remove <<PTS_HOV_1>>
UPDATE CalculationRule
SET functionBody = 'return <<PTS_HOV_2>> +
	<<PTS_HOV_3>> +
	<<PTS_HOV_4>> +
	<<PTS_HOV_5>>;'
WHERE calculationid = 1 AND code ='PTS_HOV';

-- Remove <<PTS_TRANSIT_ACCESS_2>>
UPDATE CalculationRule
SET functionBody = 'return <<PTS_TRANSIT_ACCESS_1>> +
	<<PTS_TRANSIT_ACCESS_3>> +
	<<PTS_TRANSIT_ACCESS_4>>;'
WHERE calculationid = 1 AND code ='PTS_TRANSIT_ACCESS';



