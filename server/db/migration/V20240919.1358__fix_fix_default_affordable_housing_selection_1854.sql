UPDATE calculationRule SET 
choices = '[{"id": "0", "name": "N/A"},
    {"id": "1", "name": "State Density Bonus"},
    {"id": "2", "name": "TOC Tiers 1-3"},
    {"id": "3", "name": "TOC Tier 4"},
    {"id": "4", "name": "100% Affordable"}]'
where calculationId = 1 and code = 'STRATEGY_AFFORDABLE'