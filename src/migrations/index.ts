import * as migration_20260110_034155 from './20260110_034155';
import * as migration_20260111_230934 from './20260111_230934';
import * as migration_20260112_010500 from './20260112_010500';
import * as migration_20260112_074700 from './20260112_074700';
import * as migration_20260214_migrate_spacing_enums from './20260214_migrate_spacing_enums';
import * as migration_20260215_migrate_hero_types from './20260215_migrate_hero_types';
import * as migration_20260216_pages_nested_docs from './20260216_pages_nested_docs';
import * as migration_20260218_migrate_media_blocks from './20260218_migrate_media_blocks';

export const migrations = [
  {
    up: migration_20260110_034155.up,
    down: migration_20260110_034155.down,
    name: '20260110_034155'
  },
  {
    up: migration_20260111_230934.up,
    down: migration_20260111_230934.down,
    name: '20260111_230934'
  },
  {
    up: migration_20260112_010500.up,
    down: migration_20260112_010500.down,
    name: '20260112_010500'
  },
  {
    up: migration_20260112_074700.up,
    down: migration_20260112_074700.down,
    name: '20260112_074700'
  },
  {
    up: migration_20260214_migrate_spacing_enums.up,
    down: migration_20260214_migrate_spacing_enums.down,
    name: '20260214_migrate_spacing_enums'
  },
  {
    up: migration_20260215_migrate_hero_types.up,
    down: migration_20260215_migrate_hero_types.down,
    name: '20260215_migrate_hero_types'
  },
  {
    up: migration_20260216_pages_nested_docs.up,
    down: migration_20260216_pages_nested_docs.down,
    name: '20260216_pages_nested_docs'
  },
  {
    up: migration_20260218_migrate_media_blocks.up,
    down: migration_20260218_migrate_media_blocks.down,
    name: '20260218_migrate_media_blocks'
  },
];
