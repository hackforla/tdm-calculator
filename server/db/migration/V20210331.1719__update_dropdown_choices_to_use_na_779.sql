UPDATE [dbo].[CalculationRule]
SET choices ='[{"id": "0", "name": "N/A"},
{"id": "25", "name": "25%+ spaces shared"},
{"id": "50", "name": "50%+ spaces shared"},
{"id": "75", "name": "75%+ spaces shared"},
{"id": "100", "name": "100% spaces shared"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_3';

UPDATE CalculationRule SET
choices =  N'[{"id": "", "name": "N/A"},
{"id": "1", "name": "35% of State Density Bonus"},
{"id": "2", "name": "TOC Tiers 1-3"},
{"id": "3", "name": "TOC Tier 4"},
{"id": "4", "name": "100% Affordable"}]'
WHERE calculationId = 1 and code = 'STRATEGY_AFFORDABLE'