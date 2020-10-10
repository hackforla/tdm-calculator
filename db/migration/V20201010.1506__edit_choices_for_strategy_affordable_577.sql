UPDATE CalculationRule SET
choices =  N'[{"id": "", "name": "< 35% of State Density Bonus"},
{"id": "1", "name": "35% of State Density Bonus"},
{"id": "2", "name": "TOC Tiers 1-3"},
{"id": "3", "name": "TOC Tier 4"},
{"id": "4", "name": "100% Affordable"}]'
WHERE calculationId = 1 and code = 'STRATEGY_AFFORDABLE'