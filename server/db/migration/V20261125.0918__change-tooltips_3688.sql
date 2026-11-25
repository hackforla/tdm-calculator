UPDATE CalculationRule SET
	description = 'All units (exclusive of manager''s units) are covenanted affordable dwelling units.'
WHERE code = 'AFFORDABLE_HOUSING'

UPDATE CalculationRule SET
	description = '<p>
	The City&apos;s Municipal Code contains parking minimums applied to different land uses. 
	The TDM Calculator uses these numbers as the "Baseline", even though 
	different Community Plans and Specific Plans  may call for differing numbers.
	</p>'
WHERE code = 'INPUT_PARK_REQUIREMENT'

UPDATE CalculationRule SET
	description = '
	<p>&quot;Parking Provided / Baseline&quot; displays a percentage derived
  by dividing your project&apos;s parking supply by the number of spaces indicated in
  the &quot;Citywide Parking Baseline&quot; row.
  A reduction of at least 10% (when &quot;Parking Provided / Baseline&quot; is 90% or less) results
  in points earned through the &quot;Reduced Parking Supply&quot; strategy. Providing 110%
  or more of the Baseline results in increased Target Points for the TDM Plan.

	<div style="display:flex;flex-direction:column;align-items:center;margin:0">
	<ul style="list-style-type:disc; margin: 0; padding: 0;">
		<li>2 pts - spaces reduced by 10%-24%</li>
		<li>4 pts - spaces reduced by 25%-49%</li>
		<li>8 pts - spaces reduced by 50%-89%</li>
		<li>12 pts - spaces reduced by 90%-100%</li>
	</ul>	
	'
WHERE code = 'PARK_RATIO'

UPDATE CalculationRule SET
	description = '<p>Selecting this package preselects the following strategies  </p>
	<ol>
	<li data-list="bullet"><span></span>Bike Parking: 2 Points</li>
	<li data-list="bullet"><span></span>Encouragement Program (Education, Marketing &amp; Outreach): 4 Points</li>
	<li data-list="bullet"><span></span>Unbundling Parking ($220 / mo) : 8 Points        </li>
	</ol>
	<p>Level 1 non-school projects that provide no more than 110% of the
Citywide Parking Baseline may be eligible for this optional bonus
package. Because the strategies in a Bonus Package work together to
reinforce their effectiveness in reducing drive-alone trips, projects
that select a Bonus Package are awarded 
<strong>one additional bonus point, for a total of 15 earned points.</strong>
</p>
<p>Bonus Packages may not be ideal for all TDM Plans but are a way to provide easy 
compliance and implementation for small projects.</p>'
WHERE code = 'PKG_RESIDENTIAL'

UPDATE CalculationRule SET
description = '<p>Selecting this package preselects the following strategies
</p><ol>
<li data-list="bullet"><span></span>Bike Parking: 2 Points</li>
<li data-list="bullet"><span></span>Encouragement Program (Voluntary Behavior Change Program): 6 Points</li>
<li data-list="bullet"><span></span>HOV Program&lt;: 2 Points</li>
<li data-list="bullet"><span></span>Mobility Management ($550,000-$699,999): 4 Points </li>
</ol>
<p>Level 1 school projects that provide no more than 110% of the Citywide Parking Baseline may be eligible for this optional bonus package. 
Because the strategies in a Bonus Package work together to reinforce their effectiveness 
in reducing drive-alone trips, projects that select a Bonus Package are awarded 
<strong>one additional bonus point, for a total of 15 earned points.</strong>
</p>
<p>Bonus Packages may not be ideal for all TDM Plans but are a way to provide easy compliance and 
implementation for small projects.
</p>'
WHERE code = 'PKG_SCHOOL'


UPDATE CalculationRule SET
description = '<p>Reduction in parking supply below the generalized Citywide Parking 
Baseline, using parking reduction mechanisms including, but not limited to, 
TOC, Density Bonus, Bicycle Parking ordinance, locating in an Enterprise
Zone or Specific Plan area, or compliance with zoning regulations that require
less parking than the generalized Citywide Parking Baseline. Points are also awarded for projects
providing a reduced supply of parking as allowed by an approved variance.
</p><p>
</p><p>Points for Reduced Parking Supply are calculated automatically based on the information
about the land uses and parking entered on the previous pages of the TDM Calculator.
A reduction of at least 10% below the Citywide Parking Baseline (when "Parking Provided / Baseline" is
90% or less) results in points earned through this strategy.
</p><p>
</p>
<ol>
<li><span></span>2 pts - spaces reduced by 10%-24%</li>
<li><span></span>4 pts - spaces reduced by 25%-49%</li>
<li><span></span>8 pts - spaces reduced by 50%-89%</li>
<li><span></span>12 pts - spaces reduced by 90%-100%</li>
</ol>'
WHERE code = 'STRATEGY_PARKING_5'