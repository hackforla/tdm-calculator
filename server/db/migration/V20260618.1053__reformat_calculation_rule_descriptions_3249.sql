UPDATE CalculationRule SET description = '<p>Special Uses</p>' WHERE code = 'LAND_USE_OTHER';
UPDATE CalculationRule SET description = '<p>The Point Target establishes the total number of points a project must meet by selecting from the list of TDM strategies. Target points are a function of Project Level and the total parking supply of a project.</p>' WHERE code = 'TARGET_POINTS_PARK';
UPDATE CalculationRule SET description = '<p>The City defines "habitable rooms" as enclosed spaces used for living purposes. This includes bedrooms, living rooms and dining rooms, given that they are all enclosed.</p><p>Any non-enclosed alcove more than 50 square feet in size is also included in this definition (dining area excluded). The City&apos;s definition of habitable room excludes lobbies, hallways, and bathrooms. The City includes kitchens in the definition only for calculating parking requirements.</p><p>Therefore, a living room, dining room, and kitchen, all completely separated from each other with walls, will count as three habitable rooms for parking calculation purposes.</p>' WHERE code = 'UNITS_HABIT_LT3';
UPDATE CalculationRule SET description = '<p>The City defines "habitable rooms" as enclosed spaces used for living purposes. 
This includes bedrooms, living rooms and dining rooms, given that they are all enclosed.
	</p><p>Any non-enclosed alcove more than 50 square feet in size is also included in this definition 
(dining area excluded). The City&apos;s definition of habitable room excludes lobbies, hallways, 
and bathrooms. The City includes kitchens in the definition only for calculating parking requirements.
	</p><p>Therefore, a living room, dining room, and kitchen, all completely separated from each 
other with walls, will count as three habitable rooms for parking calculation purposes.</p>' WHERE code = 'UNITS_HABIT_3';
UPDATE CalculationRule SET description = '<p>The City defines "habitable rooms" as enclosed spaces used for living purposes. This includes bedrooms, living rooms and dining rooms, given that they are all enclosed. Any non-enclosed alcove more than 50 square feet in size is also included in this definition (dining area excluded). The City&apos;s definition of habitable room excludes lobbies, hallways, and bathrooms. The City includes kitchens in the definition only for calculating parking requirements. Therefore, a living room, dining room, and kitchen, all completely separated from each other with walls, will count as three habitable rooms for parking calculation purposes.</p>' WHERE code = 'UNITS_HABIT_GT3';
UPDATE CalculationRule SET description = '<p>This strategy is not available for retail use, and cannot be combined with Parking Cash-Out.</p><p>Pricing of parking encourages sustainable modes of travel (non-drive alone) and can be accomplished in several ways. Property managers and homeowner associations can unbundle the price of parking from rents or sale of units. The parking cost is set by the project applicant and paid by the vehicle owners/drivers.</p>' WHERE code = 'STRATEGY_PARKING_1';
UPDATE CalculationRule SET description = '<p><strong>Locate near a Bike Share Station:</strong> Project is located within 600 feet of an existing bike share station - <a href="https://bikeshare.metro.net/stations/" target="_blank">Bike Share Location Map</a>. LADOT shall pre-approve the selection of this TDM Strategy.</p><p><strong>Install Bike Share Station:</strong> Install a publicly accessible bike share station with a minimum of 10 docks. Must meet LADOT Bike Share Siting Guidelines and be pre-approved by qualified LADOT bike share program staff.</p>' WHERE code = 'STRATEGY_BIKE_1';
UPDATE CalculationRule SET description = '<p>Provide real-time transit arrival displays at each major entrance of the project site. Display should capture transit options within 0.25 miles.</p>' WHERE code = 'STRATEGY_INFO_1';
UPDATE CalculationRule SET description = '<p>Each TDM strategy has been assigned a point value a project applicant can select and implement to meet its Point Target. 
  The selection of TDM strategies informs the total earned points. This should be referenced to determine when the project meets the Target Points.</p>' WHERE code = 'PTS_EARNED';
UPDATE CalculationRule SET description = '<p>This strategy is only available for residential uses that include a qualifying amount of restricted affordable housing.</p><p><strong>N/A:</strong> Projects that do not meet any of the below criteria</p><p><strong>State Density Bonus:</strong> Projects that receive at least 20% of California’s Density Bonus and provide a minimum of:</p><ol><li data-list="bullet"><span></span><span>10% Low Income; or</span></li><li data-list="bullet"><span></span><span>5% Very Low Income.</span></li></ol><p><strong>TOC Tier 1-3:</strong> Projects that provide the following Affordable Housing percentages:</p><ol><li data-list="bullet"><span></span><span>20% Low Income;</span></li><li data-list="bullet"><span></span><span>11% Very Low Income; or</span></li><li data-list="bullet"><span></span><span>8% Extremely Low Income.</span></li></ol><p><strong>TOC Tier 4</strong>: Projects that provide the following Affordable Housing percentages:</p><ol><li data-list="bullet"><span></span><span>25% Low Income;</span></li><li data-list="bullet"><span></span><span>15% Very Low Income; or</span></li><li data-list="bullet"><span></span><span>11% Extremely Low Income.</span></li></ol><p><strong>100% Affordable:</strong> Projects in which 100% of the housing units (exclusive of any manager’s units) are restricted affordable.</p><p></p>' WHERE code = 'STRATEGY_AFFORDABLE';
UPDATE CalculationRule SET description = '<p>Offer bike share membership passes to employees and/or residents in accordance with available pass options (applicable for locations within 0.25 miles of an existing or planned bike share station - <a href="https://bikeshare.metro.net/stations" target="_blank">Bike Share Location Map</a>).
	</p>' WHERE code = 'STRATEGY_BIKE_3';
UPDATE CalculationRule SET description = '<p>Install and maintain on-site bicycle parking at or above ratios as determined in Sections 12.03, 12.21, and 12.21.1 of the L.A.M.C.&nbsp;</p>' WHERE code = 'STRATEGY_BIKE_4';
UPDATE CalculationRule SET description = '<p>This strategy is only available for non-residential uses.</p><p>Provide clothes changing and/or shower facilities for employees or students at or above ratios as determined in Sections 91.6307 of the L.A.M.C.</p>' WHERE code = 'STRATEGY_BIKE_5';
UPDATE CalculationRule SET description = '<p>This strategy is not available for school uses.</p><p>Provide at least one car share space per 25 employees/units, with a minimum of two car-share parking spaces. Requires cooperation with a car share service provider.</p>' WHERE code = 'STRATEGY_CAR_SHARE_1';
UPDATE CalculationRule SET description = '<p>This strategy is not available for school uses.</p><p>Offer an annual car share membership, not including trip fees (through a third-party car share service operator) for at least 50% of residents or employees (applicable for locations within 0.25 miles of an existing service area). If the applicant selects BlueLA as the provider, the TDM point total from this measure is 4 points. </p><p>
	</p>' WHERE code = 'STRATEGY_CAR_SHARE_3';
UPDATE CalculationRule SET description = '<p>This strategy is not available for school uses.</p><p><br /></p><p>Provide a car share fleet to all building occupants. Minimum of 2 cars per project site.</p>' WHERE code = 'STRATEGY_CAR_SHARE_4';
UPDATE CalculationRule SET description = '<p>The Electric Vehicle Bonus strategy is only available if the Car Share Memberships or Private Car Share Fleet strategy is also selected. The Bonus is automatically earned if BlueLA is selected as the Car Share Membership provider.</p><p>Provide 100% electric vehicle fleet or membership to electric vehicle car share program.
</p><p>
	</p>' WHERE code = 'STRATEGY_CAR_SHARE_ELECTRIC';
UPDATE CalculationRule SET description = '<p>This strategy is not available for residential uses.</p><p>On-site child care provided by a licensed childcare provider.</p>' WHERE code = 'STRATEGY_CHILD_CARE';
UPDATE CalculationRule SET description = '<p>This strategy is not available for residential uses.</p><p>Provide at least six annual taxi or Transportation Network Companies (TNC) fare vouchers or reimbursements for at least 50% of employees who travel by non-drive alone trips.</p>' WHERE code = 'STRATEGY_HOV_2';
UPDATE CalculationRule SET description = '<p>This strategy is not available for residential uses.</p><p>Provide free, reserved HOV parking spaces (carpool, vanpool, etc.). Should be closer to the building entrance than other non-HOV parking spaces (excluding ADA stalls). Must install a minimum of 2 HOV parking spaces. HOV parking must account for 10% or more of total parking spaces.</p><p>
	</p>' WHERE code = 'STRATEGY_HOV_3';
UPDATE CalculationRule SET description = '<p>This strategy is not available for retail or hotel uses.</p><p>HOV Program where school administrators, employers, residential property managers, or homeowners associations coordinate, promote, and maintain a HOV program or service to match individuals, groups, parents and/or families available to share rides on a regular basis.</p><p>
	</p>' WHERE code = 'STRATEGY_HOV_4';
UPDATE CalculationRule SET description = '<p>This strategy is not available for residential uses and may not be combined with the Information - Encouragement Program Strategy.</p><p>Deploy an employee-focused travel behavior change program that targets individual attitudes, goals, and travel behaviors, educating participants on the impacts of travel choices and opportunities to alter their habits. The program typically includes a coordinated ride-sharing, vanpool and/or carpooling program, requires a program coordinator, and includes program monitoring, reporting and evaluation. A minimum of 50% of all employees on site should be eligible for the trip reduction program. 
	</p><p>
	</p>' WHERE code = 'STRATEGY_HOV_5';
UPDATE CalculationRule SET description = '<p>Post wayfinding signage near major entrances directing building users 
	to rail stations, bus stops, bicycle facilities, bicycle parking, car 
	sharing kiosks, and other sustainable (non-drive alone) travel options, 
	provided inside and/or outside of the building.</p>' WHERE code = 'STRATEGY_INFO_2';
UPDATE CalculationRule SET description = '<p>May not be combined with Mandatory Trip-Reduction Program strategy.</p><p><strong>Education, Marketing and Outreach:</strong> Offer new employees and residents a   packet of materials and/or provide personal consultation detailing sustainable (non-drive alone)   travel options. These materials or consultation must be available on an ongoing  basis and/or on permanent online channels. Packet must include the   distribution of a one Metro TAP card pre-loaded with a trip, to each  employee or residential unit.</p><p><strong>Travel Behavior Change Program:</strong>   A multi-faceted program involving two-way communication campaigns and travel feedback that actively engages participants to target individual attitudes, goals, and travel behaviors to alter their travel choices and habits. Program must include the distribution of one Metro TAP card preloaded with a day pass or equivalent value, to each employee or residential unit. Selection of this strategy requires a coordinator to manage the program, and ensure communication is available to all regular occupants of a site with a special focus on new occupants and/or employees. Must include participation from 20% of the project site’s tenants/users to qualify for this TDM strategy. </p><p>This strategy pairs well with a TMO.   
</p><p>
</p>' WHERE code = 'STRATEGY_INFO_3';
UPDATE CalculationRule SET description = '<p>Projects that are zoned for mixed use and provide no more than 85% of floor area for a single land use</p>' WHERE code = 'STRATEGY_MIXED_USE';
UPDATE CalculationRule SET description = '
	<p>This strategy is not available for residential or retail uses, and cannot be combined with Parking Pricing/Unbundling.</p>
	<p>Implement a “cash out” program, where all full or 
 part-time employees who do not use a parking space are paid the 
 value of the space instead in time increments that the parking is leased. 
 The value of a space shall be the leased value, if leased, and shall be the 
 market value of a parking space if owned by the property owner.</p>
	' WHERE code = 'STRATEGY_PARKING_2';
UPDATE CalculationRule SET description = '<p>Share parking among different land uses or properties. A notarized agreement among tenants or property owners is required to receive points.</p>' WHERE code = 'STRATEGY_PARKING_3';
UPDATE CalculationRule SET description = '<p>Provide public access to the property&apos;s parking. 
</p><p><br /></p><p>Must be coupled with on-demand parking availability publicized through public signage and/or approved mobile application. This strategy is especially encouraged for properties that provide parking supply at rates above L.A.M.C. or a Specific Plan requirements. To earn points for this strategy, a project must provide the number of parking spaces available for public use. That supply must be, at a minimum, 25% of the total parking supply rounded up to the next whole number.</p>' WHERE code = 'STRATEGY_PARKING_4';
UPDATE CalculationRule SET description = '<p>Reduction in parking supply below the generalized Citywide Parking Baseline, using parking 
reduction mechanisms
including, but not limited to, TOC, Density Bonus, Bicycle Parking ordinance, locating in an Enterprise
Zone or Specific Plan area, or compliance with zoning regulations that require
less parking than the generalized Citywide Parking Baseline. Points are also awarded for projects
providing a reduced supply of parking as allowed by an approved variance.
</p><p>
</p><p>Points for Reduced Parking Supply are calculated automatically based on the information
about the project&apos;s use and parking entered on the previous pages of the TDM Calculator.
A reduction of at least 10% below the Citywide Parking Baseline (when "Parking Provided / Baseline" is
90% or less) results in points earned through this strategy.
</p><p>
</p><ol><li><span></span>2 pts - spaces reduced by 10%-24%</li><li><span></span>4 pts - spaces reduced by 25%-49%</li><li><span></span>8 pts - spaces reduced by 50%-89%</li><li><span></span>12 pts - spaces reduced by 90%-100%</li></ol>' WHERE code = 'STRATEGY_PARKING_5';
UPDATE CalculationRule SET description = '<p>Partner with a shared micro-mobility company to provide discounted membership fees for building occupants (e.g. residents and employees) Make shared micro-mobility fleet devices accessible for easy identification and use.</p>' WHERE code = 'STRATEGY_SHARED_MOBILITY_1';
UPDATE CalculationRule SET description = '<p>Purchase and operate a shared micro-mobility fleet that 
 is available on-site for use or rent for building occupants 
 (e.g. residents and employees). The fleet size shall be determined 
 to ensure a shared device is available 90 percent of the 
 time it is requested.</p>' WHERE code = 'STRATEGY_SHARED_MOBILITY_2';
UPDATE CalculationRule SET description = '<p>This strategy is not available for Hotel uses.</p><p>Operate a neighborhood serving transit service. High-quality Transit Areas (HQTAs) are within one-half mile from major transit stops and high-quality transit corridors and developed based on the language in Senate Bill (SB) 375. </p><p>The definitions of major transit stops and high-quality transit corridors are as follows:</p><p><strong>Major Transit Stop:</strong> A site containing an existing rail transit station, a ferry terminal served by either a bus or rail transit service, or the intersection of two or more major bus routes with a frequency of service interval of 15 minutes or less during the morning and afternoon peak commute periods (CA Public Resource Code Section 21064.3). It also includes major transit stops that are included in the applicable regional transportation.</p><p><strong>High-Quality Transit Corridor (HQTC):</strong> A corridor with fixed-route bus service with service intervals no longer than 15 minutes during peak commute hours.
	</p>' WHERE code = 'STRATEGY_TRANSIT_ACCESS_1';
UPDATE CalculationRule SET description = '<p>Provide all employees/units transit subsidies. Points awarded vary based on the amount of transit subsidy provided per employee or residential unit.</p>' WHERE code = 'STRATEGY_TRANSIT_ACCESS_3';
UPDATE CalculationRule SET description = '<p>Provide funding to a local transit provider for improvements that improve service quality (reduce headways, etc.) at transit stops within ¼ mile radius of the project site. Funds could also contribute to an existing shuttle or microtransit service (e.g. DASH) in consultation with LADOT if this option is available near the project site.</p>' WHERE code = 'STRATEGY_TRANSIT_ACCESS_4';
UPDATE CalculationRule SET description = '<p>Join an existing TMO.</p>' WHERE code = 'STRATEGY_TMO_1';
UPDATE CalculationRule SET description = '<p>Create a new TMO in an area where there is not already an existing TMO service. </p><p>Should a project select to start a new TMO, the project must not be within an existing TMO service area and must commit to a two- year membership to be awarded points.</p>' WHERE code = 'STRATEGY_TMO_2';
UPDATE CalculationRule SET description = '<p>Customized, project-specific strategy that is distinct from any strategies available in the TDM strategy menu. A User-Defined Strategy requires pre-approval from LADOT and an Alternative Compliance approval (discretionary entitlement) from LA City Planning. Applicants must provide justification from studies or academic literature that the proposed strategy is in line with the TDM Program’s goals. The application must include details of how the strategy works, past examples of the strategy’s use in development projects, if available, and estimated number of single-occupant vehicle trips reduced if implemented.</p>' WHERE code = 'STRATEGY_APPLICANT';
UPDATE CalculationRule SET description = '<p>Implement three or more Bicycle Facilities strategies to automatically earn bonus points. Earn 1 point for 3 strategies; earn 2 points for 4 strategies.</p>' WHERE code = 'STRATEGY_BIKE_BONUS';
UPDATE CalculationRule SET description = '<p>The City assigns a Project Level based on project size and use activity, which is reflective of the project’s transportation demand related to the project&apos;s scope of activities. The Project Level informs progressive compliance and monitoring requirements of the TDM program.</p>' WHERE code = 'PROJECT_LEVEL';
UPDATE CalculationRule SET description = '<p>Implement two or more Car Sharing strategies to automatically earn two bonus points.
</p>' WHERE code = 'STRATEGY_CAR_SHARE_BONUS';
UPDATE CalculationRule SET description = '<p>The City&apos;s Municipal Code contains parking minimums applied to different land uses. The TDM Calculator uses these numbers as the "Baseline", even though different community plans and specific plans may call for differing numbers.</p>' WHERE code = 'INPUT_PARK_REQUIREMENT';
UPDATE CalculationRule SET description = '

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
	
	' WHERE code = 'PARK_RATIO';
UPDATE CalculationRule SET description = '<p>The project name should be the way that you refer to the project in conversation.</p>' WHERE code = 'PROJECT_NAME';
UPDATE CalculationRule SET description = '<p>Address can be a single address or range of addresses used for project identification.</p>' WHERE code = 'PROJECT_ADDRESS';
UPDATE CalculationRule SET description = '<p>As described in your Planning or Building Permit application materials</p>' WHERE code = 'PROJECT_DESCRIPTION';
UPDATE CalculationRule SET description = '<p>If you already have a Building Permit # and can provide it here, it may help reduce staff time when reviewing your materials.</p>' WHERE code = 'BUILDING_PERMIT';
UPDATE CalculationRule SET description = '<p>If you already have a LADOT Case # and can provide it here, it may help reduce staff time when reviewing your materials.</p>' WHERE code = 'CASE_NO_LADOT';
UPDATE CalculationRule SET description = '<p>This information is for personal use only.</p>' WHERE code = 'VERSION_NO';
UPDATE CalculationRule SET description = '<p>If you already have a Planning Case # and can provide it here, it may help reduce staff time when reviewing your materials.</p>' WHERE code = 'CASE_NO_PLANNING';
UPDATE CalculationRule SET description = '<p>This strategy is only available for Commercial, Medical or Arena/Stadium/Theater uses.</p><p>Offer employees a telecommute option for at least 1 day a week,  which would allow employees to work from home rather than commute to the office. This telecommute option must be available to at least 50% of employees assigned to the project site.</p>' WHERE code = 'STRATEGY_TELECOMMUTE_1';
UPDATE CalculationRule SET description = '<p>AIN/APN(s) must include all the parcels in the project site. You may  look up your Assessor&apos;s Identification number on the <a href="http://maps.assessor.lacounty.gov" target="_blank">Los Angeles County Property Assessment Information System</a> portal.
	</p><p>
  </p>' WHERE code = 'APN';
UPDATE CalculationRule SET description = '<p>All units in the Project (exclusive of manager’s units) are covenanted affordable dwelling units.</p>' WHERE code = 'AFFORDABLE_HOUSING';
UPDATE CalculationRule SET description = '
	<p>This strategy is only available for Commercial, Medical or Arena/Stadium/Theater uses.</p>
	<p>Offer visitors virtual visitation options including telehealth, virtual meetings and conferencing.</p>
	' WHERE code = 'STRATEGY_TELECOMMUTE_2';
UPDATE CalculationRule SET description = '<p>Fund or construct new or improved facilities in the public right-of-way that enhance access to the project for people that bicycle, walk, and take public transit. The point value is based on the dollar value of the improvement. This strategy has two options: contribute the specified amount to the City’s Mobility Investment Trust Fund or install the improvements as part of the development project. An additional two points will be awarded for a project that installs the improvements.</p>' WHERE code = 'STRATEGY_MOBILITY_INVESTMENT_1';
UPDATE CalculationRule SET description = '<p>Fund for construction of investments in capital expansion and operations and maintenance for existing sustainable  mobility programs (Metro Bike Share, carshare, etc. ) The point value is based on the dollar value of the contribution.</p>' WHERE code = 'STRATEGY_MOBILITY_INVESTMENT_2';
UPDATE CalculationRule SET description = '<p>Provide 100% electric vehicle or bus.</p>' WHERE code = 'PTS_TRANSIT_ACCESS_5';
UPDATE CalculationRule SET description = '<p>This strategy is only available if Neighborhood Shuttles / Microtransit Service is selected.</p><p>Provide 100% electric vehicle or bus.</p>' WHERE code = 'STRATEGY_TRANSIT_ACCESS_5';
UPDATE CalculationRule SET description = '<p>Check to indicate that Access Improvements will be implemented by the developer</p>' WHERE code = 'STRATEGY_MOBILITY_INVESTMENT_3';
UPDATE CalculationRule SET description = '<p>Design in multi-modal connections that connect the project site to an abutting multi-use shared path or to an existing or planned Metro Rail station through the integration of a gateway, knock-out panel, or other design feature. This strategy requires pre-approval.</p>' WHERE code = 'STRATEGY_MOBILITY_INVESTMENT_4';
UPDATE CalculationRule SET description = '<p>Selecting this package preselects the following strategies  </p><ol><li data-list="bullet"><span></span>Bike Parking: 2 Points</li><li data-list="bullet"><span></span>Encouragement Program (Education, Marketing &amp; Outreach): 4 Points</li><li data-list="bullet"><span></span>Unbundling Parking ($220 / mo) : 8 Points        </li></ol><p>Level 1 non-school projects that provide no more than 110% of the
Citywide Parking Baseline may be eligible for this optional bonus
package. Because the strategies in a Bonus Package work together to
reinforce their effectiveness in reducing drive-alone trips, projects
that select a Bonus Package are awarded 
<strong>one additional bonus point, for a total of 15 earned points.</strong>
</p><p>Bonus Packages may not be ideal for all projects but are a way to provide easy compliance and implementation for small projects.</p><p>
    </p>' WHERE code = 'PKG_RESIDENTIAL';
UPDATE CalculationRule SET description = '<p>Selecting this package preselects the following strategies
</p><ol><li data-list="bullet"><span></span>Bike Parking: 2 Points</li><li data-list="bullet"><span></span>Encouragement Program (Voluntary Behavior Change Program): 6 Points</li><li data-list="bullet"><span></span>HOV Program&lt;: 2 Points</li><li data-list="bullet"><span></span>Mobility Management ($550,000-$699,999): 4 Points </li></ol><p>Level 1 school projects that provide no more than 110% of the Citywide Parking Baseline may be eligible for this optional bonus package. Because the strategies in a Bonus Package work together to reinforce their effectiveness in reducing drive-alone trips, projects that select a Bonus Package are awarded <strong>one additional bonus point, for a total of 15 earned points.</strong></p><p>Bonus Packages may not be ideal for all projects but are a way to provide easy compliance and implementation for small projects.
      </p><p>
    </p>' WHERE code = 'PKG_SCHOOL';