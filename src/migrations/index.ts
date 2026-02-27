import * as migration_20260110_034155 from './20260110_034155';
import * as migration_20260111_230934 from './20260111_230934';
import * as migration_20260112_010500 from './20260112_010500';
import * as migration_20260112_074700 from './20260112_074700';
import * as migration_20260214_migrate_spacing_enums from './20260214_migrate_spacing_enums';
import * as migration_20260215_migrate_hero_types from './20260215_migrate_hero_types';
import * as migration_20260216_pages_nested_docs from './20260216_pages_nested_docs';
import * as migration_20260218_migrate_media_blocks from './20260218_migrate_media_blocks';
import * as migration_20260224_update_bg_color_enum from './20260224_update_bg_color_enum';
import * as migration_20260227_set_show_grid_lines_false from './20260227_set_show_grid_lines_false';
import * as migration_20260227_cta_small_add_logo from './20260227_cta_small_add_logo';
import * as migration_20260227_cta_small_move_logo_to_cards from './20260227_cta_small_move_logo_to_cards';

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
  {
    up: migration_20260224_update_bg_color_enum.up,
    down: migration_20260224_update_bg_color_enum.down,
    name: '20260224_update_bg_color_enum'
  },
  {
    up: migration_20260227_set_show_grid_lines_false.up,
    down: migration_20260227_set_show_grid_lines_false.down,
    name: '20260227_set_show_grid_lines_false'
  },
  {
    up: migration_20260227_cta_small_add_logo.up,
    down: migration_20260227_cta_small_add_logo.down,
    name: '20260227_cta_small_add_logo'
  },
  {
    up: migration_20260227_cta_small_move_logo_to_cards.up,
    down: migration_20260227_cta_small_move_logo_to_cards.down,
    name: '20260227_cta_small_move_logo_to_cards'
  },
];
