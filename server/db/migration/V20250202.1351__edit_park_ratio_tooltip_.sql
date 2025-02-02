UPDATE CalculationRule SET description = 
'
<div>
	<p>&quot;Parking Provided / Baseline&quot; displays a percentage derived
  by dividing your project&apos;s parking supply by the number of spaces indicated in
  the &quot;Citywide Parking Baseline&quot; row.
  A reduction of at least 10% (when &quot;Parking Provided / Baseline&quot; is 90% or less) results
  in points earned through the &quot;Reduced Parking Supply&quot; strategy. Providing 110%
  or more of the Baseline results in increased Target Points for the project.

	<div style="display:flex;flex-direction:column;align-items:center;margin:0">
	<ul style="list-style-type:disc; margin: 0; padding: 0;">
		<li>2 pts - spaces reduced by 10%-24%</li>
		<li>4 pts - spaces reduced by 25%-49%</li>
		<li>8 pts - spaces reduced by 50%-89%</li>
		<li>12 pts - spaces reduced by 90%-100%</li>
	</ul>
	<div>
	</div>'
WHERE calculationId = 1 and code = 'PARK_RATIO'