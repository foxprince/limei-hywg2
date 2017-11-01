/*交易客户，每次交易生成一个客户id，即使是同一个客户，不同的交易也会生成多条纪录*/
drop table invoice;
create table transaction(
	id bigint not null primary key auto_increment,
	name varchar(30)	null,
	passport varchar(50) null,
	street	varchar(50) null,
	city	varchar(30) null,
	postcode varchar(20) null,
	country varchar(20) null,
	type	varchar(7)	null,/*receipt,invoice*/
	tranc_date varchar(8) null,
	invoice_no varchar(10) null,
	currency varchar(6) null,
	vat_price float null,
  	total_price float null,/*不含税价格*/
	ctime datetime not null
);
drop table receipt;
create table tranc_detail(
	id bigint not null primary key auto_increment,
	type varchar(6) default 'diajew' not null,
	tranc_id bigint not null,
	report_no varchar(20) null,
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
  	ctime datetime not null
);

--库存表
drop table inventory;
create table inventory (
	id bigint not null primary key auto_increment,
	ivt_type varchar(6) null,/*类型分为戒托，项链，耳钉，成品*/
	ivt_no varchar(30)	null,/*--编号*/
	title varchar(50) null,/*--名称*/
	logo  varchar(100) null,/*--款式图*/
	price03 float null,
	price09 float null,
	price2 float null,
	price3 float null,
	note  varchar(255) null,
	ctime datetime not null
);
--库存规格表
create table inventory_spec (
	id bigint not null primary key auto_increment,
	inventory_id bigint not null,
	item varchar(20) null,/*主钻规格*/
	stock int(6) null,/*库存*/
	amount int(6) null,/*--订单数*/
	sale_time datetime  null,/*--出货日期*/
	cost float null,/*--成本*/
	ctime datetime not null
);
--客户订单
create table customer_order (
	id bigint not null primary key auto_increment,
	cert_no varchar(20) null,/*--钻石证书号*/
	amount int(4) null,/*--钻石数量*/
	main_stone varchar(20) null,/*--主石*/
	side_stone varchar(20) null,/*--副石*/
	diamond_pic varchar(50) null,
	ring_no varchar(20) null,/*--戒托号*/
	ring_pic1 varchar(50) null,
	ring_pic2 varchar(50) null,
	ring_pic3 varchar(50) null,
	model varchar(50) null,/*--版况*/
	detail varchar(20) null,/*(--成色)*/
	inscription varchar(20) null,/*(--字印)*/
	diamond_price float null,/*--钻石金额*/
	order_time datetime not null,/*--下单日期*/
	ring_price float null,/*--戒托金额*/
	ready_time datetime not null,/*--出货日期*/
	fetch_place varchar(50) null,/*--取货地点*/
	package varchar(30) null,/*--配包装*/
	customer_name varchar(30) null,/*--客户姓名*/
	wechat varchar(32) null,/*--客户微信*/
	phone varchar(20) null,/*--联系电话*/
	address varchar(100) null, /*--联系地址*/
	ctime datetime not null
);
