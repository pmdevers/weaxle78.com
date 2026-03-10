-- ─── Blog Posts ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id         SERIAL PRIMARY KEY,
  slug       TEXT        UNIQUE NOT NULL,
  title      TEXT        NOT NULL,
  summary    TEXT        NOT NULL,
  category   TEXT        NOT NULL,
  date       DATE        NOT NULL,
  read_time  TEXT        NOT NULL,
  image      TEXT        NOT NULL DEFAULT '',
  content    TEXT        NOT NULL DEFAULT ''
);

-- ─── PC Specs ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pc_specs (
  id         SERIAL PRIMARY KEY,
  label      TEXT        NOT NULL,
  value      TEXT        NOT NULL,
  icon       TEXT        NOT NULL DEFAULT '',
  sort_order INT         NOT NULL DEFAULT 0
);

-- ─── Games ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS games (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  rank       TEXT        NOT NULL,
  image      TEXT        NOT NULL DEFAULT '',
  sort_order INT         NOT NULL DEFAULT 0
);

-- ─── Partners ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  sort_order INT         NOT NULL DEFAULT 0
);

-- ─── Hero Slides ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero_slides (
  id         SERIAL PRIMARY KEY,
  image      TEXT        NOT NULL,
  title      TEXT        NOT NULL,
  highlight  TEXT        NOT NULL,
  sort_order INT         NOT NULL DEFAULT 0
);
