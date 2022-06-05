UPDATE CalculationRule SET
description = '
<div>
	<p>&quot;Parking Provided / Baseline&quot; displays the percentage of the
	&quot;Citywide Parking Baseline&quot; that your project is providing.
	The percentage is derived by dividing your input by the &quot;Citywide Parking Baseline&quot;
	amount of spaces. &quot;Reduced Parking Supply&quot; points will be earned when spaces are reduced
	by 10%-100% of the baseline.</p>
	<div style="display:flex;flex-direction:column;align-items:center;margin:0">
	<ul style="list-style-type:disc;width:25em;margin:0;">
		<li>2 pts - spaces reduced by 10%-20%</li>
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
		Reduction in parking supply below the generalized citywide parking baseline, using parking reduction mechanisms,
		including, but not limited to, TOC, Density Bonus, Bicycle Parking ordinance, locating in an Enterprise
		Zone or Specific Plan area, or compliance with zoning regulations that require
		less parking than the generalized citywide parking baseline. Points are also awarded for projects
		providing a reduced supply of parking as allowed by an approved variance.
	</p>
	<p>&quot;Parking Provided / Baseline&quot; displays the percentage of the
	&quot;Citywide Parking Baseline&quot; that your project is providing.
	The percentage is derived by dividing your input by the &quot;Citywide Parking Baseline&quot;
	amount of spaces. &quot;Reduced Parking Supply&quot; points will be earned when spaces are reduced
	by 10%-100% of the baseline.</p>
	<div style="display:flex;flex-direction:column;align-items:center;margin:0">
	<ul style="list-style-type:disc;width:25em;margin:0;">
		<li>2 pts - spaces reduced by 10%-20%</li>
		<li>4 pts - spaces reduced by 25%-49%</li>
		<li>8 pts - spaces reduced by 50%-89%</li>
		<li>12 pts - spaces reduced by 90%-100%</li>
	</ul>
	<div>
	</div>
'
WHERE calculationid = 1 and code = 'STRATEGY_PARKING_5'