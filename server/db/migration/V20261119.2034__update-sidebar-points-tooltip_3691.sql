UPDATE CalculationRule SET
    description = N'<p>Each TDM Strategy has been assigned a point value a project applicant can select and implement to meet the project''s Point Target. The selection of TDM Strategies informs the total earned points. This should be referenced to determine when the project meets the Target Points.</p>'
WHERE code = 'PTS_EARNED';

UPDATE calculationRule SET
    description = N'<p>The Point Target establishes the total number of points a project must meet by selecting from the list of TDM Strategies. Target points are a function of Project Level and the total parking supply of a project.</p>'
WHERE  code = 'TARGET_POINTS_PARK';