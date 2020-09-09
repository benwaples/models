DROP TABLE IF EXISTS vegetables;
DROP TABLE IF EXISTS fruits;
DROP TABLE IF EXISTS nuts;
DROP TABLE IF EXISTS essential_oils;
DROP TABLE IF EXISTS beers;

CREATE TABLE vegetables (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  size TEXT
);

CREATE TABLE fruits (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  size TEXT
);

CREATE TABLE nuts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  size TEXT CHECK ( size = ANY('{small, medium, large}')),
  is_good BOOLEAN
);

CREATE TABLE essential_oils ( 
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT CHECK ( color = ANY('{red,green,blue,yellow,red,purple}')),
  recommend BOOLEAN
);

CREATE TABLE beers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK ( type = ANY('{ale,ipa,pilsner,kolsh,sour}')),
  turnt_scale INT 
)