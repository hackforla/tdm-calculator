UPDATE [dbo].[CalculationRule] 
SET description = 'Share parking among different land uses or properties. A notarized agreement among tenants or property owners is required to receive points.' 
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_3';
