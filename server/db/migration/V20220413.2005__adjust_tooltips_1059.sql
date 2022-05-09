update CalculationRule set 
description = 
'<div>
	<p>&lt; 20% of State Density Bonus: Projects that do not meet any of the below criteria</p>
	<hr />
	<p>20% of State Density Bonus: Projects that receive 20% of California’s Density Bonus and provide a minimum of:</p>
	<ul style="list-style-type:disc;margin-left:2em">
		<li>10% Low Income; or</li>
		<li>5% Very Low Income.</li>
	</ul>
	<hr />
	<p>TOC Tier 1-3: Projects that provide the following Affordable Housing percentages:</p>
	<ul style="list-style-type:disc;margin-left:2em">
		<li>20% Low Income;
		<li>11% Very Low Income; or
		<li>8% Extremely Low Income.
	</ul>
	<hr/>
	<p>TOC Tier 4: Projects that provide the following Affordable Housing percentages:</p>
	<ul style="list-style-type:disc;margin-left:2em">
		<li>25% Low Income;</li>
		<li>15% Very Low Income; or</li>
		<li>11% Extremely Low Income.</li>
	</ul>
	<hr />
	<p style="margin-bottom:0;">100% Affordable: Projects in which 100% of the housing units (exclusive of any manager’s units) are restricted affordable.</p>
	</div>'

where calculationId = 1 and code = 'STRATEGY_AFFORDABLE'