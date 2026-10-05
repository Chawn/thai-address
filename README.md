# thai-address

> **Status: pre-alpha — under active development. APIs will change until v0.1.0.**
> See [PLAN.md](PLAN.md) for the roadmap.

Open, versioned dataset of Thai provinces, districts, subdistricts and postcodes — with JS/TS, Go and Dart packages for lookup and autocomplete.

ฐานข้อมูลจังหวัด อำเภอ ตำบล รหัสไปรษณีย์ที่เปิดเผยแหล่งที่มา อัปเดตสม่ำเสมอ พร้อมแพ็กเกจ JS/TS, Go และ Dart สำหรับค้นหาและ autocomplete

## Install
```sh
npm i thai-address   # name TBD — see PLAN.md
```

## Usage (target API)
```ts
import { search } from 'thai-address'
search('บ้านผือ') // → [{ subdistrict, district, province, postcode }, ...]
```

## Development
```sh
node scripts/validate-data.mjs
# plus each package's own commands under packages/<lang>/
```

## Contributing
Issues and PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). Thai or English.

## License
MIT © Chawn and contributors
