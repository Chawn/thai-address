// Validates data/source/*.csv. Runs in CI. Full rules are in PLAN.md ("Validation").
import { existsSync, readdirSync } from 'node:fs';

const dir = new URL('../data/source/', import.meta.url);
const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.csv')) : [];
if (files.length === 0) {
  console.log('validate-data: no source data yet (milestone M2) — OK');
  process.exit(0);
}
console.error('validate-data: data present but validator not implemented yet (M2)');
process.exit(1);
