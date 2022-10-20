  update [dbo].[CalculationRule]
  set [description] = 'Each TDM strategy has been assigned a point value a project applicant can select and implement to meet its Point Target. 
  The selection of TDM strategies informs the total earned points. This should be referenced to determine when the project meets the Target Points.'
  where calculationid = 1 and code ='PTS_EARNED';