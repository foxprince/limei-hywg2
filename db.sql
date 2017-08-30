/*交易客户，每次交易生成一个客户id，即使是同一个客户，不同的交易也会生成多条纪录*/
create table customer(
	id bigint not null primary key auto_increment,
	name varchar(30)	null,
	passport varchar(50) null,
	street	varchar(50) null,
	city	varchar(30) null,
	postcode varchar(20) null,
	country varchar(20) null,
	ctime datetime not null
);

create table receipt(
	id bigint not null primary key auto_increment,
	customer_id	bigint not null,
	report_no varchar(20) not null,
	shape	varchar(20) null,
	color	varchar(20) null,
	fancy	varchar(20) null,
	grading_lab varchar(3) null,
	carat float  NULL,
	clarity varchar(10)  NULL,
  	cut_grade varchar(10)  NULL,
  	polish varchar(10)  NULL,
  	symmetry varchar(10)  NULL,
  	price	float null,
  	jewerly	varchar(20) null,
  	material varchar(10) null,
  	jewerly_price float null,
  	vat_price float null,
  	total_price float null,
  	ctime datetime not null
);

