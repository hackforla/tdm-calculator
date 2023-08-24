/* Update Affordable Housing Tooltips to include new language from the stakeholders */

UPDATE CalculationRule set
    choices = '[{"id": "", "name": "N/A"},
    {"id": "1", "name": "State Density Bonus"},
    {"id": "2", "name": "TOC Tiers 1-3"},
    {"id": "3", "name": "TOC Tier 4"},
    {"id": "4", "name": "100% Affordable"}]',
	description = '<div>
	<p>This strategy is only available for residential uses that include a qualifying amount of restricted affordable housing.</p>
	<p>N/A: Projects that do not meet any of the below criteria</p>
	<hr />
	<p>State Density Bonus: Projects that receive at least 20% of California’s Density Bonus and provide a minimum of:</p>
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
WHERE calculationId = 1 and code = 'STRATEGY_AFFORDABLE'