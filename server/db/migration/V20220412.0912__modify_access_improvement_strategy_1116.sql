update calculationrule set
description = '
<div>
Install or make contributions to new or improved facilities in the public right-of-way (PROW) that 
support greater access to the project by people that bicycle, walk, and take transit. 
All PROW investments shall be consistent with the Mobility Plan 2035, and may include, 
but are not limited to, curb extensions, leading pedestrian intervals, controlled mid-block 
crosswalks, pedestrian refuge islands, protected bicycle lanes, bike boxes, 
exclusive bicycle signal phases, street trees, etc. LADOT shall be consulted 
to verify the opportunity and feasibility of access improvements near the project 
site. The point values are relative to the improvement and location, and 
shall be determined in coordination with LADOT staff.
</div>',
dataType = 'choice',
choices = '
[
  {"id": "0", "name": "N/A"},
  {"id": "1", "name": "25-49 percent of ¼ mile walkshed / commensurate value"},
  {"id": "2", "name": "50-74 percent of ¼ mile walkshed / commensurate value"},
  {"id": "3", "name": "75-99 percent of ¼ mile walkshed /commensurate value"},
  {"id": "4", "name": "100 percent of ¼ mile walkshed /commensurate value"}]
'
where calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_1'

update calculationRule set
functionBody = 'switch (<<STRATEGY_MOBILITY_INVESTMENT_1>>){   case 1:    return 4;   case 2:    return 6;   case 3:    return 8;  case 4: return 10; default:    return 0;  };
',
minValue = 4, maxValue = 10
where calculationId = 1 and code = 'PTS_MOBILITY_INVESTMENT_1'