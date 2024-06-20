if exists (SELECT * from calculationrule where calculationid = 1 and code = 'STRATEGY_INFO_5')
begin
	delete calculationrule where calculationid = 1 and code = 'STRATEGY_INFO_5';
end

if exists (SELECT * from calculationrule where calculationid = 1 and code = 'PTS_INFO_5')

begin
	delete calculationrule where calculationid = 1 and code = 'PTS_INFO_5';
end

update calculationrule set
functionBody = ' return (<<PROJECT_LEVEL>> === 1 && !!<<STRATEGY_BIKE_4>> && <<STRATEGY_HOV_4>> && (<<STRATEGY_MOBILITY_INVESTMENT_2>> >= 2) && !!(<<STRATEGY_INFO_3>> >= 2)) ? 1 : 0; '
where calculationid = 1 and code = 'PTS_PKG_SCHOOL'

update calculationrule set
functionBody = 'return <<PTS_INFO_1>> +  <<PTS_INFO_2>> +  <<PTS_INFO_3>>;'
where calculationid = 1 and code = 'PTS_INFO'
