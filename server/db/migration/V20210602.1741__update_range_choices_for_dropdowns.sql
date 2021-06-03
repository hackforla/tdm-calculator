UPDATE [dbo].[CalculationRule]
SET choices ='[{"id": "0", "name": "N/A"},
{"id": "25", "name": "25%-49% spaces shared"},
{"id": "50", "name": "50%-74% spaces shared"},
{"id": "75", "name": "75%-99% spaces shared"},
{"id": "100", "name": "100% spaces shared"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_3';


UPDATE [dbo].[CalculationRule]
SET choices ='[{"id": "0", "name": "N/A"},
{"id": "25", "name": "Reduces 25%-49% of spaces available"},
{"id": "50", "name": "Reduces 50%-74% of spaces available"},
{"id": "75", "name": "Reduces 75%-99% of spaces available"},
{"id": "100", "name": "Reduces 100% of spaces available"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_5';

UPDATE [dbo].[CalculationRule]
SET choices ='[{"id": "0", "name": "N/A"},
{"id": "25", "name": "25%-49% of monthly fare"},
{"id": "50", "name": "50%-74% of monthly fare"},
{"id": "75", "name": "75%-99% of monthly fare"},
{"id": "100", "name": "100% of monthly fare"}]'
WHERE calculationid = 1 AND code ='STRATEGY_TRANSIT_ACCESS_3';