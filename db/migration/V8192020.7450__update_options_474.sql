UPDATE [dbo].[CalculationRule]
SET choices ='[{"id": "0", "name": "none"},
{"id": "1", "name": "Each parking space is at least $25 a month"},
{"id": "4", "name": "Each parking space is at least $110 a month"},
{"id": "8", "name": "Each parking space is at least $220 a month"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_1';

UPDATE [dbo].[CalculationRule]
SET choices ='[{"id": "0", "name": "none"},
{"id": "1", "name": "Reduces 25% of spaces available"},
{"id": "2", "name": "Reduces 50% of spaces available"},
{"id": "3", "name": "Reduces 75% of spaces available"},
{"id": "4", "name": "Reduces 100% of spaces available"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_5';