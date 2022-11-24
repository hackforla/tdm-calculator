/* Not sure the applicability is right */
UPDATE CalculationRule set
	description = '<div>
	<p>This strategy is only available for Commercial, Medical or Arena/Stadium/Theater uses.</p>
	<p>Offer visitors virtual visitation options including telehealth, virtual meetings and conferencing.</p>
	</div>'
WHERE calculationId = 1 and code = 'STRATEGY_TELECOMMUTE_2'