/*
	Script for Issue #2576 - Modifications to the Mobility Investment Strategies
*/

/* Update the STRATEGY_MOBILITY_INVESTMENT_1 (Access Improvements) input rule */
UPDATE CalculationRule SET
	choices = '[{"id": "0", "name": "N/A"},
    {"id": "1", "name": "$200,000-299,999"},
    {"id": "2", "name": "$300,000-399,999"},
    {"id": "3", "name": "$400,000-549,999"},
	{"id": "4", "name": "$550,000-699,999"},
	{"id": "5", "name": "$700,000-899,999"},
	{"id": "6", "name": "$900,000-1,099,999"},
    {"id": "7", "name": "$1,100,000-1,349,999"},
    {"id": "8", "name": "$1,350,000-1,599,999"},
	{"id": "9", "name": "$1,600,000-1,899,999"},
	{"id": "10", "name": "$1,900,000 or greater"}
	]',
	description = '<div><p>Applicant will install or make contributions to new or improved'
	+ ' facilities in the public right-of-way (PROW) that support greater access to'
	+ ' the project by people that bicycle, walk, and take transit. Applicants will receive'
	+ ' TDM points for implementing projects in the PROW in accordance with a'
	+ ' Pedestrian, Bicycle, and Transit Access assessment or a Vehicle Safety and'
	+ ' Access assessment. All PROW investment shall be consistent with the Mobility'
	+ ' Plan 2035 and any approved streetscape plan, and may include, but is not limited to,'
	+ ' curb extensions, leading pedestrian intervals, controlled mid-block crosswalks,'
	+ ' pedestrian refuge islands, protected bicycle lanes, bike boxes, exclusive bicycle'
	+ ' signal phases, street trees, installing unidirectional curb ramps, restoring or'
	+ ' installing a missing crosswalk leg, installing a new pedestrian HAWK signal, or'
	+ ' installing traffic calming devices such as chicanes, mini-roundabouts, diverters,'
	+ ' etc. LADOT shall be consulted to verify the opportunity and feasibility of access'
	+ ' improvements near the project site.</p>'
	+ '<p>The point value is based on the dollar value of the improvements.'
	+ ' This strategy has two options: contribute the specified amount to the City’s Mobility'
	+ ' Investment Trust Fund or install the improvements as part of the development project.'
	+ ' To indicate that the project will install the improvement, check the box on the'
	+ ' next line, and an additional two points will be earned.</p></div>'
WHERE calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_1'

/* Update the PTS_MOBILITY_INVESTMENT_1 calculation rule */
UPDATE CalculationRule SET
	functionBody = 'switch (<<STRATEGY_MOBILITY_INVESTMENT_1>>)
      {   case 1:    return 1;   
        case 2:    return 2;   
        case 3:    return 3;  
		case 4:    return 4; 
		case 5:    return 5; 
		case 6:    return 6; 
		case 7:    return 7;  
		case 8:    return 8; 
		case 9:    return 9; 
		case 10:    return 10; 
        default:   return 0;  	};',
		minValue = 1
WHERE calculationId = 1 and code = 'PTS_MOBILITY_INVESTMENT_1'

/* Update the STRATEGY_MOBILITY_INVESTMENT_2 (Mobility Management) input rule */
UPDATE CalculationRule SET
	choices = '[{"id": "0", "name": "N/A"},
    {"id": "1", "name": "$200,000-299,999"},
    {"id": "2", "name": "$300,000-399,999"},
    {"id": "3", "name": "$400,000-549,999"},
	{"id": "4", "name": "$550,000-699,999"},
	{"id": "5", "name": "$700,000-899,999"},
	{"id": "6", "name": "$900,000 or greater"}
	]',
	description = 'Fund for construction of investments in capital expansion and operations '
	+ 'and maintenance for existing sustainable  mobility programs (Metro Bike Share, carshare, etc. )'
	+ ' The point value is based on the dollar value of the contribution.',
	displayOrder = 1655
WHERE calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_2'

/* Update the PTS_MOBILITY_INVESTMENT_2 calculation rule */
UPDATE CalculationRule SET
	functionBody = 'switch (<<STRATEGY_MOBILITY_INVESTMENT_2>>)
      {   case 1:    return 1;   
        case 2:    return 2;   
        case 3:    return 3;  
		case 4:    return 4; 
		case 5:    return 5; 
		case 6:    return 6; 
        default:   return 0;  	};',
		minValue = 1
WHERE calculationId = 1 and code = 'PTS_MOBILITY_INVESTMENT_2'

/* Insert a new rule that awards 2 bonus points if the Mobility Access strategy is
included as part of the project, called "Self-Installed Access Improvements" */
/* Delete statements allow script to be re-run */
delete CalculationRule where code = 'STRATEGY_MOBILITY_INVESTMENT_3'
delete CalculationRule where code = 'PTS_MOBILITY_INVESTMENT_3'

INSERT INTO [dbo].[CalculationRule]
           ([calculationId]
           ,[code]
           ,[name]
           ,[category]
           ,[dataType]
           ,[units]
           ,[value]
           ,[functionBody]
           ,[displayOrder]
           ,[inactive]
           ,[calculationPanelId]
           ,[used]
           ,[displayFunctionBody]
           ,[minValue]
           ,[maxValue]
           ,[choices]
           ,[calcCode]
           ,[required]
           ,[minStringLength]
           ,[maxStringLength]
           ,[displayComment]
           ,[description]
           ,[mask]
           ,[link]
           ,[validationFunctionBody]
           ,[readOnly])
     VALUES
           ( 1
           , 'PTS_MOBILITY_INVESTMENT_3'
           , 'Pts for Self-Installed Access Improvements'
           , 'calculation'
           , 'number'
           , 'pts'
           , NULL
           , 'return !!<<STRATEGY_MOBILITY_INVESTMENT_3>> ? 2 : 0;'
           , 1653
           , 0
           , 34
           , 0
           ,' return true;'
           , 2
           , 2
           , NULL
           , NULL
           , 0
           , NULL
           , NULL
           , ''
           , ''
           , NULL
           , NULL
           , NULL
           , 0)



INSERT INTO CalculationRule
           (calculationId
           ,code
           ,name
           ,category
           ,dataType
           ,units
           ,value
           ,functionBody
           ,displayOrder
           ,inactive
           ,calculationPanelId
           ,used
           ,displayFunctionBody
           ,minValue
           ,maxValue
           ,choices
           ,calcCode
           ,required
           ,minStringLength
           ,maxStringLength
           ,displayComment
           ,description
           ,mask
           ,link
           ,validationFunctionBody
           ,readOnly)
     VALUES
           (1
           , 'STRATEGY_MOBILITY_INVESTMENT_3'
           , 'Self-Installed Access Improvements'
           , 'measure'
           , 'boolean'
           , ''
           , NULL
           , NULL
           , 1652
           , 0
           , 34
           , 0
           , 'return !!<<PTS_MOBILITY_INVESTMENT_1>>;'
           , NULL
           , NULL
           , NULL
           , 'PTS_MOBILITY_INVESTMENT_3'
           , 0
           , NULL
           , NULL
           , ''
           , 'Check to indicate that Access Improvements will be implemented by the developer'
           , NULL
           , NULL
           , NULL
           , NULL)


/* 
	Insert a new rule that awards 4 points for implementing a
	the Milti-Modal Connections Strategy.
*/
/* Delete statements allow script to be re-run */
delete CalculationRule where code = 'STRATEGY_MOBILITY_INVESTMENT_4'
delete CalculationRule where code = 'PTS_MOBILITY_INVESTMENT_4'

INSERT INTO [dbo].[CalculationRule]
           ([calculationId]
           ,[code]
           ,[name]
           ,[category]
           ,[dataType]
           ,[units]
           ,[value]
           ,[functionBody]
           ,[displayOrder]
           ,[inactive]
           ,[calculationPanelId]
           ,[used]
           ,[displayFunctionBody]
           ,[minValue]
           ,[maxValue]
           ,[choices]
           ,[calcCode]
           ,[required]
           ,[minStringLength]
           ,[maxStringLength]
           ,[displayComment]
           ,[description]
           ,[mask]
           ,[link]
           ,[validationFunctionBody]
           ,[readOnly])
     VALUES
           ( 1
           , 'PTS_MOBILITY_INVESTMENT_4'
           , 'Pts for Multi-Modal Connections'
           , 'calculation'
           , 'number'
           , 'pts'
           , NULL
           , 'return !!<<STRATEGY_MOBILITY_INVESTMENT_4>> ? 4 : 0;'
           , 1653
           , 0
           , 34
           , 0
           , ' return true;'
           , 4
           , 4
           , NULL
           , NULL
           , 0
           , NULL
           , NULL
           , ''
           , ''
           , NULL
           , NULL
           , NULL
           , 0)



INSERT INTO CalculationRule
           (calculationId
           ,code
           ,name
           ,category
           ,dataType
           ,units
           ,value
           ,functionBody
           ,displayOrder
           ,inactive
           ,calculationPanelId
           ,used
           ,displayFunctionBody
           ,minValue
           ,maxValue
           ,choices
           ,calcCode
           ,required
           ,minStringLength
           ,maxStringLength
           ,displayComment
           ,description
           ,mask
           ,link
           ,validationFunctionBody
           ,readOnly)
     VALUES
           (1
           , 'STRATEGY_MOBILITY_INVESTMENT_4'
           , 'Multi-Modal Connections'
           , 'measure'
           , 'boolean'
           , ''
           , NULL
           , NULL
           , 1657
           , 0
           , 34
           , 0
           , 'return true;'
           , NULL
           , NULL
           , NULL
           , 'PTS_MOBILITY_INVESTMENT_4'
           , 0
           , NULL
           , NULL
           , ''
           , 'Design in multi-modal connections that connect the project site'
		   + ' to an abutting multi-use shared path or to an existing or planned'
		   + ' Metro Rail station through the integration of a gateway, knock-out'
		   + ' panel, or other design feature. This strategy requires pre-approval.'
           , NULL
           , NULL
           , NULL
           , NULL)

		   
/* 
	Update PTS_MOBILITY_INVESTMENT to include the new calculations in the subtotal
	for Earned Points due to Mobility Investment Strategies 
*/
UPDATE CalculationRule SET
	functionBody = 'return <<PTS_MOBILITY_INVESTMENT_1>> +'
	+ ' <<PTS_MOBILITY_INVESTMENT_2>> + <<PTS_MOBILITY_INVESTMENT_3>> +'
	+ ' <<PTS_MOBILITY_INVESTMENT_4>>;'
WHERE calculationId = 1 and code = 'PTS_MOBILITY_INVESTMENT'




