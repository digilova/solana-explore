# solana-explore

Prototype exploration of a SpaceX asset page on Solana — inspired by [tokens.xyz](https://www.tokens.xyz/spacex).

## App

The Next.js app lives in [`code/`](code/).

```bash
cd code
npm install
npm run dev
```

Open [http://localhost:3000/variation-a](http://localhost:3000/variation-a) for Variation A (evolved tokens.xyz flow) or `/variation-b` for the issuer-first layout.

## Routes

| Path | Description |
|------|-------------|
| `/variation-a` | Chart, variants & markets, buy module, market health |
| `/variation-b` | Issuer-first product sheets and ecosystem summary |
| `/rationale` | Design decisions and comparison notes |
