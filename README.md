# Graph-a-Pet — Back Office (Next.js)

Riscrittura del back office in Next.js (App Router) con la stessa gestione GraphQL di `graph-a-pet-app`: Apollo Client 3 + graphql-codegen con preset near-operation-file.

Styling: **styled-components** + **@lemaks/grid_system** come nell'app — mai px hardcodati per spaziature/dimensioni, sempre `$uw(n)` (1uw = 15px, griglia 32 colonne) e `$color(nome)` dal tema in `src/theme`. Convenzione font: `html { font-size: 10px }` → 1.4rem = 14px. Le variabili CSS del tema sono iniettate dal registry SSR (`src/lib/registry.tsx`).

## Requisiti

- **Node >= 20.19** (consigliato 22 LTS) — versioni precedenti falliscono l'install/codegen
- Yarn 1.x

## Setup

```bash
yarn install
cp .env.example .env.local   # opzionale, i default puntano a produzione
yarn dev
```

## Script

| Script | Descrizione |
|---|---|
| `yarn dev` | dev server |
| `yarn build` / `yarn start` | build e serve di produzione |
| `yarn fetch:graphql` | introspection dello schema da produzione via rover → `graphql-schema.graphql` |
| `yarn fetch:graphql:local` | come sopra ma da `localhost:5001` |
| `yarn generate` | graphql-codegen: rigenera `src/types.ts` e `src/graphql/__generated__/` |

## Flusso GraphQL (come graph-a-pet-app)

1. Le operations vivono in `src/graphql/<modulo>/*.graphql`
2. `yarn fetch:graphql` aggiorna lo schema
3. `yarn generate` produce hook tipizzati (`useXxxQuery`, `useXxxMutation`) in `src/graphql/__generated__/`
4. I file generati **non si modificano a mano**

## Struttura

- `src/app/login` — login (mutation `Login`, JWT in cookie)
- `src/app/(admin)/` — area protetta (guard in `src/proxy.ts`): dashboard, pets, users, statistics, translations, me
- `src/lib/apollo.tsx` — Apollo provider con auth link + logout automatico su 401/403
- `src/components/DataTable.tsx` — tabella generica sul contratto `CommonSearch` (paginazione, ricerca, ordinamento)
- `src/components/charts` — wrapper chart.js (line/bar/donut)

## Note

- Il modulo traduzioni usa le API REST `/translations` e `/translations/update` (non GraphQL), come il vecchio back office.
- Lo schema attuale non ha più `Pet.body`/`PetBody`: `breed` e `coat_length` sono campi diretti di `Pet`; le vecchie operations sono state adattate.
