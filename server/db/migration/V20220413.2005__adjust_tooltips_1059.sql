update CalculationRule set 
choices = '[{"id": "", "name": "N/A"},
{"id": "1", "name": "20% of State Density Bonus"},
{"id": "2", "name": "TOC Tiers 1-3"},
{"id": "3", "name": "TOC Tier 4"},
{"id": "4", "name": "100% Affordable"}]',
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
 description = '<ol style="margin-left:-1.6em">
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

update CalculationRule set 
 description = 'Install or make contributions to new or improved facilities in the 
 public right-of-way (PROW) that support greater access to the project by people 
 that bicycle, walk, and take transit. All PROW investment shall be consistent 
 with the Mobility Plan 2035, and may include, but are not limited to, curb extensions, 
 leading pedestrian intervals, controlled mid-block crosswalks, pedestrian refuge 
 islands, protected bicycle lanes, bike boxes, exclusive bicycle signal phases, 
 street trees, etc. LADOT shall be consulted to verify the opportunity and feasibility 
 of access improvements near the project site.. Point value relative to improvement 
 and location, and determined in coordination with LADOT staff.'
where calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_1'

update CalculationRule set 
 description = 'Implement a “cash out” program, where all full or 
 part-time employees who do not use a parking space are paid the 
 value of the space instead in time increments that the parking is leased. 
 The value of a space shall be the leased value, if leased, and shall be the 
 market value of a parking space if owned by the property owner.'
where calculationId = 1 and code = 'STRATEGY_PARKING_2'

update CalculationRule set 
 description = 'Provide public access to the property''s parking. 
 Must be coupled with on-demand parking availability publicized 
 through public signage and/or approved mobile application. This 
 strategy is especially encouraged for properties that provide parking 
 supply at rates above L.A.M.C. or a Specific Plan requirements. To earn 
 points for this strategy, a project must provide the number of parking 
 spaces available for public use. That supply must be, at a minimum, 
 25% of the total parking supply rounded up to the next whole number.'
where calculationId = 1 and code = 'STRATEGY_PARKING_4'

update CalculationRule set 
 description = 'Partner with a shared micro-mobility company to provide 
 discounted membership fees for building occupants 
 (e.g. residents and employees) Make shared micro-mobility 
 fleet devices accessible for easy identification and use.'
where calculationId = 1 and code = 'STRATEGY_SHARED_MOBILITY_1'

update CalculationRule set 
 description = 'Purchase and operate a shared micro-mobility fleet that 
 is available on-site for use or rent for building occupants 
 (e.g. residents and employees). The fleet size shall be determined 
 to ensure a shared device is available 90 percent of the 
 time it is requested.'
where calculationId = 1 and code = 'STRATEGY_SHARED_MOBILITY_2'

update CalculationRule set 
 description = 'Provide funding to a local transit provider for 
 improvements that improve service quality (reduce headways, etc.) 
 at transit stops within ¼ mile radius of the project site. Funds 
 could also contribute to an existing shuttle or microtransit 
 service (e.g. DASH) in consultation with LADOT if this option 
 is available near the project site.'
where calculationId = 1 and code = 'STRATEGY_TRANSIT_ACCESS_4'