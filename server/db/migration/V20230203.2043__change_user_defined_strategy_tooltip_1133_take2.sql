UPDATE CalculationRule SET
	description = '<div><p>Customized, project-specific strategy that ' + 
	'is distinct from any strategies available in the TDM strategy ' +
	'menu. A User-Defined Strategy requires pre-approval from ' +
	'LADOT and an Alternative Compliance approval (discretionary ' +
	'entitlement) from LA City Planning. Applicants must provide ' +
	'justification from studies or academic literature that the ' +
	'proposed strategy is in line with the TDM Program’s goals. ' +
	'The application must include details of how the strategy ' +
	'works, past examples of the strategy’s use in development ' +
	'projects, if available, and estimated number of single-occupant ' +
	'vehicle trips reduced if implemented.</p></div>'
WHERE calculationId = 1 and code = 'STRATEGY_APPLICANT'