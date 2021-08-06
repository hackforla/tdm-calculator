---------------------------------------------------
/* Shared Parking - update IDs and switch cases */
---------------------------------------------------
UPDATE [dbo].[CalculationRule]
SET choices ='[
  {"id": "0", "name": "N/A"},
  {"id": "1", "name": "25%-49% spaces shared"},
  {"id": "2", "name": "50%-74% spaces shared"},
  {"id": "3", "name": "75%-99% spaces shared"},
  {"id": "4", "name": "100% spaces shared"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_3';

UPDATE CalculationRule
SET
  functionBody = 'switch (<<STRATEGY_PARKING_3>>){
    case 0:    return 0;
    case 1:    return 1;
    case 2:    return 2;
    case 3:    return 3;
    case 4:    return 4;
  };'
WHERE calculationId = 1 and code = 'PTS_PARKING_3';

------------------------------------------------------------
/* Reduced Parking Supplies - update IDs and switch cases */
------------------------------------------------------------
UPDATE [dbo].[CalculationRule]
SET choices ='[
  {"id": "0", "name": "N/A"},
  {"id": "1", "name": "Reduces 25%-49% of spaces available"},
  {"id": "2", "name": "Reduces 50%-74% of spaces available"},
  {"id": "3", "name": "Reduces 75%-99% of spaces available"},
  {"id": "4", "name": "Reduces 100% of spaces available"}]'
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_5';

UPDATE CalculationRule
SET
  functionBody = 'switch (<<STRATEGY_PARKING_5>>){
    case 0:    return 0;
    case 1:    return 2;
    case 2:    return 4;
    case 3:    return 8;
    case 4:    return 12;
  };'
WHERE calculationId = 1 and code = 'PTS_PARKING_5';

---------------------------------------------------
/* Transit Passes - update IDs and switch cases */
---------------------------------------------------
UPDATE [dbo].[CalculationRule]
SET choices ='[
  {"id": "0", "name": "N/A"},
  {"id": "1", "name": "25%-49% of monthly fare"},
  {"id": "2", "name": "50%-74% of monthly fare"},
  {"id": "3", "name": "75%-99% of monthly fare"},
  {"id": "4", "name": "100% of monthly fare"}]'
WHERE calculationid = 1 AND code ='STRATEGY_TRANSIT_ACCESS_3';

UPDATE CalculationRule
SET
  functionBody = 'switch (<<STRATEGY_TRANSIT_ACCESS_3>>){
    case 0:    return 0;
    case 1:    return 7;
    case 2:    return 10;
    case 3:    return 12;
    case 4:    return 14;
  };'
WHERE calculationId = 1 and code = 'PTS_TRANSIT_ACCESS_3';
