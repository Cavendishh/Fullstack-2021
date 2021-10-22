\d 

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer NOT NULL,
);

/* One liner of same sql command */
CREATE TABLE blogs ( id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer NOT NULL );

INSERT INTO blogs (author, url, title, likes) VALUES ('Cavendish','https://cavendish.fi/', 'Junior software engineers first blog', 1);
INSERT INTO blogs (url, title, likes) VALUES ('www.fakeurl', 'The snoop dogg', 0);
