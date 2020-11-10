  update [dbo].[CalculationRule]
  set [description] = 'The City assigns a Project Level based on project size and use activity, which is reflective of the project’s transportation demand related to the project''s scope of activities. The Project Level informs progressive compliance and monitoring requirements of the TDM program.'
  where calculationid = 1 and code ='PROJECT_LEVEL';

  update [dbo].[CalculationRule]
  set [description] = 'Each TDM strategy has been assigned a point value a project applicant can select and implement to meet its Point Target. The slection of TDM strategies informs the total earned points. This should be referenced to determine when the project meets the Target Points.'
  where calculationid = 1 and code ='PTS_EARNED';

  update [dbo].[CalculationRule]
  set [description] = 'The Point Target establishes the total number of points a project must meet by selecting from the list of TDM strategies. Target points are a function of Project Level and the total parking supply of a project.'
  where calculationid = 1 and code ='TARGET_POINTS_PARK';

  update [dbo].[CalculationRule]
  set [description] = 'The City''s Municipal Code contains parking minimums applied to different land uses. The TDM Calculator uses these numbers as the "Baseline", even though different community plans and specific plans may call for differing numbers.'
  where calculationid = 1 and code ='INPUT_PARK_REQUIREMENT';