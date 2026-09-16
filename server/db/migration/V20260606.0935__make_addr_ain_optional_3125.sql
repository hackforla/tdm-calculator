alter table Project 
alter column address nvarchar(200) null;

update CalculationRule set
required = 0
where code = 'PROJECT_ADDRESS'

update CalculationRule set
required = 0
where code = 'APN'