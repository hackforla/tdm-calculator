UPDATE CalculationRule SET
description = '
<div>
	<p>&quot;Parking Provided / Baseline&quot; displays a percentage derived
  by dividing your project&apos;s parking supply by the number of spaces indicated in
  the &quot;Citywide Parking Baseline&quot; row.
  A reduction of at least 10% (when &quot;Parking Provided / Baseline&quot; is 90% or less) results
  in points earned through the &quot;Reduced Parking Supply&quot; strategy. Providing 110%
  or more of the Baseline results in increased Target Points for the project.

	<div style="display:flex;flex-direction:column;align-items:center;margin:0">
	<ul style="list-style-type:disc;width:25em;margin:0;">
		<li>2 pts - spaces reduced by 10%-24%</li>
		<li>4 pts - spaces reduced by 25%-49%</li>
		<li>8 pts - spaces reduced by 50%-89%</li>
		<li>12 pts - spaces reduced by 90%-100%</li>
	</ul>
	<div>
	</div>
'
WHERE calculationid = 1 and code = 'PARK_RATIO'

UPDATE CalculationRule SET
description = '
<div>
	<p>
		Reduction in parking supply below the generalized Citywide Parking Baseline, using parking 
    reduction mechanisms
		including, but not limited to, TOC, Density Bonus, Bicycle Parking ordinance, locating in an Enterprise
		Zone or Specific Plan area, or compliance with zoning regulations that require
		less parking than the generalized Citywide Parking Baseline. Points are also awarded for projects
		providing a reduced supply of parking as allowed by an approved variance.
	</p>
	<p>Points for Reduced Parking Supply are calculated automatically based on the information
  about the project&apos;s use and parking entered on the previous pages of the TDM Calculator.
  A reduction of at least 10% below the Citywide Parking Baseline (when &quot;Parking Provided / Baseline&quot; is
  90% or less) results in points earned through this strategy.
  </p>
	<div style="display:flex;flex-direction:column;align-items:center;margin:0">
	<ul style="list-style-type:disc;width:25em;margin:0;">
		<li>2 pts - spaces reduced by 10%-24%</li>
		<li>4 pts - spaces reduced by 25%-49%</li>
		<li>8 pts - spaces reduced by 50%-89%</li>
		<li>12 pts - spaces reduced by 90%-100%</li>
	</ul>
	<div>
	</div>
',
choices = '[
  {"id": "0", "name": "N/A"},
  {"id": "1", "name": "Reduced by 10%-24%"},
  {"id": "2", "name": "Reduced by 25%-49%"},
  {"id": "3", "name": "Reduced by 50%-89%"},
  {"id": "4", "name": "Reduced by 90%-100%"}]'
WHERE calculationid = 1 and code = 'STRATEGY_PARKING_5'
