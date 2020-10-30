UPDATE [dbo].[CalculationRule]
SET description = 'Install a publicly accessible bike share station with a minimum of 8 docks. Must meet LADOT Bike Share Siting Guidelines and pre-approved by qualified LADOT bike share program staff. '
WHERE calculationid = 1 AND code ='STRATEGY_BIKE_2';

UPDATE [dbo].[CalculationRule]
SET description = 'HOV Program where school administrators, employers, residential property managers, or homeowners associations coordinate, promote, and maintain a HOV program or service to match individuals, groups, parents and/or families available to share rides on a regular basis. '
WHERE calculationid = 1 AND code ='STRATEGY_HOV_4';

UPDATE [dbo].[CalculationRule]
SET description = 'The yearlong Safety Campaign targets the school’s parents and students to heighten their awareness of the importance of traffic safety. This campaign also integrates TDM strategies to bring awareness to how parents and students can reduce congestion. '
WHERE calculationid = 1 AND code ='STRATEGY_INFO_5';

UPDATE [dbo].[CalculationRule]
SET description = 'Implement a “cash out” program, where all eligible employees who do not use a parking space are paid the value of the space instead. '
WHERE calculationid = 1 AND code ='STRATEGY_PARKING_2';

UPDATE [dbo].[CalculationRule]
SET description = 'Join an existing TMO. At a minimum, must commit to a two year membership. ' 
WHERE calculationid = 1 AND code ='STRATEGY_TMO_1';

UPDATE [dbo].[CalculationRule]
SET functionBody = 'return <<STRATEGY_TMO_1>> ? 2 : 0;', minValue =  2, maxValue = 2
WHERE calculationid = 1 AND code ='PTS_TMO_1';

UPDATE [dbo].[CalculationRule]
SET functionBody = 'return <<STRATEGY_TMO_2>> ? 4 : 0;', minValue =  4, maxValue = 4
WHERE calculationid = 1 AND code ='PTS_TMO_2';

UPDATE [dbo].[CalculationRule]
SET description = '<div>
	<ul style="list-style-type:disc;">
	<li> Education, Marketing and Outreach: Offer new employees and residents a packet of materials and/or provide personal consultation detailing sustainable (non-SOV) travel options. These materials or consultation must be available on an ongoing basis and/or on permanent online channels. Packet must include the distribution of a one Metro TAP card pre-loaded with a trip, to each employee or residential unit.</li>
	<li> Travel Behavior Change Program: A multi-faceted program typically involving two-way communication campaigns and travel feedback that actively engages participants to target individual attitudes, goals, and travel behaviors to alter their travel choices and habits. Program must include the distribution of a one Metro TAP card pre-loaded with a trip, to each employee or residential unit. Selection of this strategy requires a coordinator to manage the program. May not be combined with Information 3.</li>
	</ul>
</div> '
WHERE calculationid = 1 AND code ='STRATEGY_INFO_3';

