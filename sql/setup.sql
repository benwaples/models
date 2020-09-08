DROP TABLE IF EXISTS vegetables;
DROP TABLE IF EXISTS fruits;

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
)