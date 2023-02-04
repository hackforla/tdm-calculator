/* Add explanation of applicability to the tooltips for strategies that have restrictions */

UPDATE CalculationRule set
	name = 'Affordable Housing',
	description = '<div>
	<p>This strategy is only available for residential uses that include a qualifying amount of restricted affordable housing.</p>
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
WHERE calculationId = 1 and code = 'STRATEGY_AFFORDABLE'

UPDATE CalculationRule set
	name = 'Changing and Shower Facilities',
	description = '<div>
	<p>This strategy is only available for non-residential uses.</p>
	<p>Provide clothes changing and/or shower facilities for employees or students at or above ratios as determined in Sections 91.6307 of the L.A.M.C.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_BIKE_5'

UPDATE CalculationRule set
	description = '<div>
	<p>
	Implement three or more Bicycle Facilities strategies to automatically earn bonus points. Earn 1 point for 3 strategies; earn 2 points for 4 strategies.
	</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_BIKE_BONUS'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for school uses.</p>
	<p>Provide at least one car share space per 25 employees/units, with a minimum of two car-share parking spaces. Requires cooperation with a car share service provider.
	</p></div>'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_1'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for school uses.</p>
	<p>Offer an annual car share membership, not including trip fees 
	(through a third-party car share service operator) for at least 50% of residents 
	or employees (applicable for locations within 0.25 miles of an existing service area). 
	If the applicant selects BlueLA as the provider, the TDM point total from this measure is 4 points. </p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_3'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for school uses.</p>
	<p>Provide a car share fleet to all building occupants. 
	Minimum of 2 cars per project site.</p>'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_4'

UPDATE CalculationRule set
	description = '<div>
	<p>The Electric Vehicle Bonus strategy is only available if the Car Share Memberships or Private 
	Car Share Fleet strategy is also selected. The Bonus is automatically 
	earned if BlueLA is selected as the Car Share Membership provider.</p>
	<p>Provide 100% electric vehicle fleet or membership to electric vehicle car share program.
</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_ELECTRIC'

UPDATE CalculationRule set
	description = 'Implement two or more Car Sharing strategies to automatically earn two bonus points.
'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_BONUS'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for residential uses.</p>
	<p>On-site child care provided by a licensed childcare provider.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_CHILD_CARE'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for residential uses.</p>
	<p>Provide at least six annual taxi or Transportation Network Companies (TNC) 
	fare vouchers or reimbursements for at least 50% of employees 
	who travel by non-drive alone trips.</p></div>'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_2'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for residential uses.</p>
	<p>Provide free, reserved HOV parking spaces (carpool, vanpool, etc.). 
	Should be closer to the building entrance than other non-HOV parking spaces (excluding ADA stalls).
	Must install a minimum of 2 HOV parking spaces. HOV parking must account for 10% or more of total parking spaces.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_3'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for retail or hotel uses.</p>
	<p>HOV Program where school administrators, employers, residential property managers, 
	or homeowners associations coordinate, promote, and maintain a HOV program or service 
	to match individuals, groups, parents and/or families available to share 
	rides on a regular basis.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_4'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for residential uses and may not be combined with the 
	Information - Encouragement Program Strategy.
	</p>
	<p>Deploy an employee-focused travel behavior change program that targets 
	individual attitudes, goals, and travel behaviors, educating participants on the 
	impacts of travel choices and opportunities to alter their habits. The program typically 
	includes a coordinated ride-sharing, vanpool and/or carpooling program, requires a 
	program coordinator, and includes program monitoring, reporting and evaluation. 
	A minimum of 50% of all employees on site should be eligible for the trip reduction program. 
	</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_5'

UPDATE CalculationRule set
description = '<div>
<p>
May not be combined with Mandatory Trip-Reduction Program strategy.
</p>
<ol style="margin-left:-1.6em;margin-top:0;margin-bottom:0">  
<li> Education, Marketing and Outreach: Offer new employees and residents a   packet of materials and/or provide 
personal consultation detailing sustainable (non-drive alone)   travel options. These materials or consultation must be available on an ongoing   
basis and/or on permanent online channels. Packet must include the   distribution of a one Metro TAP card pre-loaded with a trip, to each   
employee or residential unit.
</li>  
<li style="margin-top:0.5em"> Travel Behavior Change Program:   A multi-faceted program involving two-way communication campaigns and   
travel feedback that actively engages participants to target individual attitudes,   
goals, and travel behaviors to alter their travel choices and habits.   
Program must include the distribution of one Metro TAP card preloaded   
with a day pass or equivalent value, to each employee or residential   
unit. Selection of this strategy requires a coordinator to manage the   
program, and ensure communication is available to all regular occupants   
of a site with a special focus on new occupants and/or employees.   
Must include participation from 20% of the project site’s tenants/users   
to qualify for this TDM strategy. This strategy pairs well with a TMO.   
</li>  
</ol>
</div>'
WHERE calculationId = 1 and code = 'STRATEGY_INFO_3'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is only available for school uses.
	</p>
	<p>The yearlong Safety Campaign targets the school’s parents and students to heighten their awareness of the importance of traffic safety. This campaign also integrates TDM strategies to bring awareness to how parents and students can reduce congestion.
	</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_INFO_5'

/* Pricing/Unbundling */
UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is only available for residential, commercial, warehouse or hotel land uses, and cannot be combined with Cash-Out.</p>
	<p>Pricing of parking encourages sustainable modes of travel (non-drive alone) and can be accomplished in several ways. 
Property managers and homeowner associations can unbundle the price of parking from rents or sale of units. 
The parking cost is set by the project applicant and paid by the vehicle owners/drivers.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_PARKING_1'

/* Parking Cash-Out */
UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for residential uses, and cannot be combined with Pricing/Unbundling</p>
	<p>Implement a “cash out” program, where all full or 
 part-time employees who do not use a parking space are paid the 
 value of the space instead in time increments that the parking is leased. 
 The value of a space shall be the leased value, if leased, and shall be the 
 market value of a parking space if owned by the property owner.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_PARKING_2'

/* Not sure the applicability is right */
UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is only available for Commercial, Medical or Arena/Stadium/Theater uses.</p>
	<p>Offer employees a telecommute option for at least 1 day a week,   
	which would allow employees to work from home rather than commute to the office.   
	This telecommute option must be available to at least 50% of employees   
	assigned to the project site.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_TELECOMMUTE_1'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is not available for Hotel uses.</p>
	<p><p>Operate a neighborhood serving transit service</p>  
	<p>High-quality Transit Areas (HQTA&apos;s) are within one-half mile from major transit stops and high-quality transit 
	corridors and developed based on the language in Senate Bill (SB) 375. 
	The definitions of major transit stops and high-quality transit corridors are as follows:
	</p> 
	<ol style="margin-left:0;margin-bottom:0"> 
	<li>A. Major Transit Stop: A site containing an existing rail transit station, a ferry terminal served by 
	either a bus or rail transit service, or the intersection of two or more major bus routes with a 
	frequency of service interval of 15 minutes or less during the morning and afternoon peak commute periods 
	(CA Public Resource Code Section 21064.3). 
	It also includes major transit stops that are included in the applicable regional transportation.
	</li> 
	<li style="margin-top:0.5em">B. High-Quality Transit Corridor (HQTC): A corridor with fixed-route 
	bus service with service intervals no longer than 15 minutes during peak commute hours.
	</li> 
	</ol>
	</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_TRANSIT_ACCESS_1'

UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is only available if Neighborhood Shuttles / Microtransit Service is selected.</p>
	<p>Provide 100% electric vehicle or bus.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_TRANSIT_ACCESS_5'

