UPDATE CalculationRule SET 
description='<p>Operate a neighborhood serving transit service</p>

<p>High-quality Transit Areas (HQTA''s) are within one-half mile from major transit stops and high-quality transit corridors and developed based on the language in Senate Bill (SB) 375. The definitions of major transit stops and high-quality transit corridors are as follows:</p>
<ol style="margin-left:0;margin-bottom:0">
<li>A. Major Transit Stop: A site containing an existing rail transit station, a ferry terminal served by either a bus or rail transit service, or the intersection of two or more major bus routes with a frequency of service interval of 15 minutes or less during the morning and afternoon peak commute periods (CA Public Resource Code Section 21064.3). It also includes major transit stops that are included in the applicable regional transportation.</li>
<li style="margin-top:0.5em">B. High-Quality Transit Corridor (HQTC): A corridor with fixed-route bus service with service intervals no longer than 15 minutes during peak commute hours.</li>
</ol>'

WHERE calculationId=1 AND code='STRATEGY_TRANSIT_ACCESS_1'