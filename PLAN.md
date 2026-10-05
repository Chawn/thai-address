# PLAN — thai-address

Status: **M0 scaffolded** · Owner: @Chawn · Last updated: 2026-10-06

## Goal
One **canonical, versioned, openly licensed dataset** of Thai administrative areas
(จังหวัด → อำเภอ/เขต → ตำบล/แขวง → รหัสไปรษณีย์), with TH/EN names and official codes,
plus thin packages for JS/TS, Go and Dart that do lookup and autocomplete
("พิมพ์ตำบล → เติมอำเภอ จังหวัด รหัสไปรษณีย์ ให้"). Existing projects are often stale,
single-language, or have unclear licensing — the differentiator here is **provenance,
update cadence and multi-language packages from one source of truth**.

## Non-goals
- Street-level geocoding, house numbers, maps/polygons (maybe later as a separate dataset).
- Address parsing of free text (later milestone, optional).

## ⚠️ Step 1 is licensing, not code
Before importing any data, the agent must produce `docs/DATA-SOURCES.md` listing every
candidate source, its license, and whether redistribution is allowed:
- Department of Provincial Administration (DOPA / กรมการปกครอง) administrative codes.
- Thailand Post postal codes.
- data.go.th open datasets (check the license on each dataset page).
- Existing OSS datasets (only as cross-checks unless their license permits reuse and
  attribution is recorded).
**Ask Ben to approve the source list before M2.** If nothing is clearly redistributable,
pivot to shipping the *pipeline* (users fetch data themselves) instead of the data.

## Repo layout (monorepo, one source of truth)
```
data/
  raw/            # git-ignored downloads
  source/         # normalized CSV committed (provinces.csv, districts.csv, subdistricts.csv)
  dist/           # generated: thai-address.json, .min.json, sqlite — attached to GitHub Releases
scripts/          # build + validate pipeline (Node, no deps beyond stdlib)
packages/
  js/             # npm: TS, tree-shakable, ESM+CJS, lazy-loads data
  go/             # Go module with //go:embed of the compact dataset
  dart/           # pub.dev package with the dataset as a Dart const / asset
docs/
```

## Data model (v1)
```jsonc
{ "version": "2026.10.0", "source": [...],
  "provinces":    [{ "code": "10", "nameTh": "กรุงเทพมหานคร", "nameEn": "Bangkok" }],
  "districts":    [{ "code": "1001", "provinceCode": "10", "nameTh": "เขตพระนคร", "nameEn": "Phra Nakhon" }],
  "subdistricts": [{ "code": "100101", "districtCode": "1001", "nameTh": "พระบรมมหาราชวัง", "nameEn": "Phra Borom Maha Ratchawang", "postcodes": ["10200"] }] }
```
Note: one ตำบล can map to several postcodes and vice versa — model it as a list.
Version scheme: `YYYY.MM.patch` for data; packages follow semver and pin a data version.

## Package APIs (all three mirror each other)
```ts
search(query: string, opts?: { limit?: number; field?: 'subdistrict'|'district'|'province'|'postcode' }): Match[]
byPostcode(code: string): Match[]
getProvince(code) / getDistrict(code) / getSubdistrict(code)
// Match = { subdistrict, district, province, postcode } with TH/EN names + codes
```
Search must be prefix + Thai-aware (ignore leading "ต." "อ." "จ." "เขต" "แขวง", tone-mark-insensitive option).

## Validation (`scripts/validate-data.mjs`, runs in CI)
- Referential integrity (every child points to an existing parent).
- Codes are well-formed and unique; 77 provinces; no empty names; no duplicate (name, parent).
- Postcodes are 5 digits; every subdistrict has ≥ 1 postcode.
- Diff report vs previous release (added/removed/renamed) → used as release notes.

## Milestones
- [x] **M0 — Scaffold** (validator stub passes on empty data).
- [ ] **M1 — DATA-SOURCES.md** with license analysis → **Ben approves**.
- [ ] **M2 — Pipeline**: fetch → normalize → `data/source/*.csv` → `dist/*`; validator fully implemented.
- [ ] **M3 — JS/TS package** + React autocomplete example (Next.js app in `examples/`).
- [ ] **M4 — Go package** (embed) + HTTP handler example.
- [ ] **M5 — Dart package** + Flutter autocomplete example.
- [ ] **M6 — Release** data 2026.x + packages v0.1.0; scheduled GitHub Action checks sources monthly and opens a PR on change.

## Definition of done
Validator passes; each package has tests using a small fixture + one smoke test on the full
dataset; README shows install + 5-line example per language; PLAN ticked.
