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

/* Encouragement Program Strategy */
update CalculationRule set 
 description = '<ol style="margin-left:-1.6em;margin-top:0;margin-bottom:0">
	<li> Education, Marketing and Outreach: Offer new employees and residents a 
	packet of materials and/or provide personal consultation detailing sustainable (non-SOV) 
	travel options. These materials or consultation must be available on an ongoing 
	basis and/or on permanent online channels. Packet must include the 
	distribution of a one Metro TAP card pre-loaded with a trip, to each 
	employee or residential unit.</li>
	<li style="margin-top:0.5em"> Travel Behavior Change Program: A multi-faceted program 
	involving two-way communication campaigns and travel feedback that 
	actively engages participants to target individual attitudes, goals, 
	and travel behaviors to alter their travel choices and habits. 
	Program must include the distribution of a one Metro TAP card pre-loaded with a trip
	to each employee or residential unit. Selection of this strategy requires a 
	coordinator to manage the program, and ensure communication is available to 
	all regular occupants of a site with a special focus on new occupants and/or employees. </li>
	<li style="margin-top:0.5em"> 
		NOTE: Cannot be combined with Required Trip-Reduction Program strategy.
	</li>
</ol>'
where calculationId = 1 and code = 'STRATEGY_INFO_3'