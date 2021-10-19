\d 

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer NOT NULL,
);

/* One liner of same sql command */
CREATE TABLE blogs ( id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer NOT NULL, );

insert into blogs (author, url, title, likes) values ('Cavendish','https://cavendish.fi/', 'Junior software engineers first blog', 1);
insert into blogs (url, title, likes) values ('www.fakeurl', 'The snoop dogg', 0);
