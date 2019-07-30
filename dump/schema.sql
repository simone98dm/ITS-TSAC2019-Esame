create table conveyors
(
	id serial not null
		constraint conveyors_pk
			primary key,
	description varchar(20)
);

create table measurements
(
	id serial not null
		constraint measurements_pk
			primary key,
	speed varchar(5) not null,
	consume varchar(5) not null,
	create_date timestamp default current_timestamp not null,
	fk_id_conveyor int not null
		constraint measurements_conveyors_id_fk
			references conveyors
);


insert into conveyors (id, description) values (1,'Nastro plastica'),(2,'Nastro secco'),(3,'Nastro vetro');