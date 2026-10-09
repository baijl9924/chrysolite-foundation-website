# How we know Chrysolite Foundation is a registered non-profit

This document reconstructs the **credential chain** — the exact path by which the claim
"Chrysolite Empowerment and Education Foundation is a registered non-profit" was verified.

It exists so that the claim can be re-checked by anyone, at any time, without trusting
whoever wrote the site.

---

## The short answer

The claim rests on **two independent things**, and only the first is a primary source:

| # | Evidence | Primary? |
|---|---|---|
| 1 | **The CAC certificate** — Incorporated Trustees, reg. no. `IT/7008093`, TIN `2620089007465` | **Yes** — issued by the Nigerian government |
| 2 | **Goodstack's organisation record** — `type: nonprofit`, `registrationActive: true`, anchored to registry `CAC` | No — a third-party database built *from* (1) |

Everything below documents (2). If you only ever keep one thing, keep the certificate.

---

## The chain, link by link

```
Corporate Affairs Commission (CAC)          ← Nigerian federal government registry
   │                                          Incorporated Trustees = the Nigerian
   │                                          non-profit legal form
   │  Goodstack ingests the registry
   ▼
Goodstack registry entity
   registry_000000CFNAYYGAEPw3240xUDhI65o     ← name "Corporate Affairs Commission / CAC", code "CAC"
   │
   │  attached to the organisation
   ▼
Goodstack organisation record
   organisation_000000CmCZg1necqCZ5hKYoGDXX96
   type: "nonprofit"                           ← the explicit field
   registryId: "7008093"                       ← matches IT/7008093 on the certificate
   registrationActive: true                    ← registration is in force
   claimedAt: null                             ← nobody has claimed it
   │
   │  read over the public API
   ▼
Local collection run  →  orgs.jsonl line 11196
```

The important structural point: **Goodstack does not guess the word "nonprofit".** It only
ingests organisations *from government registries that register non-profits*. The `CAC`
registry is what makes the `type: "nonprofit"` field true. The registry link is the evidence;
the type label is the conclusion.

---

## Evidence 1 — the raw Goodstack record

Full response from `GET /v1/organisations/{id}`, trimmed only of empty arrays:

```json
{
  "id": "organisation_000000CmCZg1necqCZ5hKYoGDXX96",
  "name": "Chrysolite Empowerment and Education Foundation",
  "description": "",
  "countryCode": "NGA",
  "milestones": [],
  "categories": [],
  "type": "nonprofit",
  "types": ["nonprofit"],
  "logo": null,
  "images": [],
  "registry": "registry_000000CFNAYYGAEPw3240xUDhI65o",
  "registryId": "7008093",
  "registryDetails": {
    "id": "registry_000000CFNAYYGAEPw3240xUDhI65o",
    "name": "Corporate Affairs Commission / CAC",
    "englishName": "Corporate Affairs Commission / CAC",
    "code": "CAC"
  },
  "website": null,
  "websites": [],
  "address": "NO 1, ODUDUWA ROAD, UNIVERSITY OF IBADAN, IBADAN, NIGERIA, Ibadan, Oyo",
  "addressLine1": "NO 1, ODUDUWA ROAD, UNIVERSITY OF IBADAN, IBADAN, NIGERIA",
  "addressLine2": null,
  "city": "Ibadan",
  "state": "Oyo",
  "postcode": null,
  "registrationDate": null,
  "registrationActive": true,
  "currencyCode": null,
  "trustees": null,
  "createdAt": "2024-01-21T16:50:13.704Z",
  "claimedAt": null,
  "countrySpecificProperties": {},
  "isBranchParent": false,
  "location": null
}
```

### The four fields that carry the claim

| Field | Value | What it proves |
|---|---|---|
| `type` / `types` | `"nonprofit"` | Goodstack classifies it as a non-profit — not an inference of ours |
| `registry` | resolves to **Corporate Affairs Commission / CAC** | The classification is anchored to a government registry, not to a self-declaration |
| `registryId` | `7008093` | Ties the record to CAC reg. no. 7008093 — the same number as `IT/7008093` on the site |
| `registrationActive` | `true` | The registration is currently in force |

Two caveats on this record:

- `registrationDate` is `null`. Goodstack did not ingest the CAC incorporation date
  (8 June 2023). That date on the site comes from the certificate, not from here.
- `registrationActive` appears **only on the single-organisation endpoint**, not on the list
  endpoint. If you only ever call the list endpoint you will never see it.

---

## Evidence 2 — the registry entity

`GET /v1/registries/registry_000000CFNAYYGAEPw3240xUDhI65o`:

```json
{
  "data": {
    "id": "registry_000000CFNAYYGAEPw3240xUDhI65o",
    "name": "Corporate Affairs Commission / CAC",
    "code": "CAC",
    "englishName": "Corporate Affairs Commission / CAC"
  },
  "object": "registry"
}
```

`GET /v1/registries/?countryCode=NGA` returns **exactly two** registries for Nigeria:

| code | name |
|---|---|
| `CAC` | Corporate Affairs Commission / CAC |
| `SMEDAN` | Small And Medium Enterprises Development Agency of Nigeria |

So for Nigeria the non-profit register is unambiguously the CAC. (SMEDAN registers
*enterprises*, not non-profits — a Chrysolite record under `SMEDAN` would have been a red flag.)

`GET /v1/countries/` returns 245 countries, of which **226 have `hasRegistry: true`**.
Nigeria is one:

```json
{ "code": "NGA", "name": "Nigeria", "hasRegistry": true,
  "endonyms": { "en": "Nigeria", "ha": "Nijeriya", "ig": "Naìjíríyà", "yo": "Nàìjíríà" } }
```

`hasRegistry: true` is what made Nigeria a country worth querying in the first place.

---

## Evidence 3 — the second, independent copy

A snapshot of Goodstack's public claim page (`causes.goodstack.io/claim`) was also saved.
That page embeds its whole listing as a JSON array, one row per organisation:

```
[name, countryCode, registryCode, registryName, registryId, claimed]
```

Chrysolite's row, verbatim from the snapshot:

```json
["Chrysolite Empowerment and Education Foundation", "NGA", "CAC",
 "Corporate Affairs Commission / CAC", "7008093", 0]
```

- Last field `0` = **not claimed** — agreeing with `claimedAt: null` from the API.
- For contrast, the neighbouring Nigerian row `Christ's Champion International Ministry`
  carries `8554464, 1` — claimed. So the flag does discriminate; `0` is meaningful.
- That snapshot holds **3,683 organisations, of which 59 are claimed (1.6%)**.
  Nigeria contributes **4** rows, **1** of them claimed.

Two independent surfaces — the authenticated API and the public page — return the same
identity and the same claimed status. That is the cross-check.

---

## How to re-verify (do this before relying on the above)

The record can change. Anything below may be stale. To re-check:

```bash
# 1. Find it again in the Nigerian list (page 1 of 10, 100 per page)
curl -s -H "Authorization: $GOODSTACK_PK_KEY" \
  "https://api.goodstack.io/v1/organisations/?countryCode=NGA&pageSize=100" \
  | python -c "import sys,json;[print(json.dumps(o,ensure_ascii=False,indent=2)) for o in json.load(sys.stdin)['data'] if 'chrysolite' in o['name'].lower()]"

# 2. Read the single record — this is where registrationActive lives
curl -s -H "Authorization: $GOODSTACK_PK_KEY" \
  "https://api.goodstack.io/v1/organisations/organisation_000000CmCZg1necqCZ5hKYoGDXX96"
```

The key is a Goodstack **publishable** key (`pk_…`). It is deliberately **not** written into
this repository — it lives outside the repo in the collection project's `collect.py`.
Do not commit it: this repository is public.

Then, to go one level better than any API: **read the CAC certificate itself.**
Registration number `IT/7008093`. That is the only evidence here that does not depend on
Goodstack.

---

## ⚠️ What this dataset does *not* prove

The local collection (`orgs.jsonl`) is a **partial snapshot, not the full register.**

`collect.py` calls `fetch_page(cc, 1)` — **page 1 only**, `pageSize=100`. The list endpoint
reports for Nigeria:

```json
{ "totalResults": 4963, "pageSize": 100, "pageNumber": 1,
  "_links": { "last": ".../organisations?pageSize=100&countryCode=NGA&page=10" } }
```

So **`orgs.jsonl` holds 100 of Nigeria's 4,963 registered non-profits — about 2%.**
The `goodstack.html` snapshot is a different, smaller slice again (3,683 rows globally).

Two consequences:

1. **"Not in our data" ≠ "not a registered non-profit."** The dataset can confirm a
   positive, but it cannot confirm a negative. Do not use it to rule an organisation out.
2. **`orgs.jsonl`'s `names` field is not a confidence score.** `collect.py` sets
   `"names": len(d.get("data", []))` — the number of rows on the page, i.e. always `100`.
   It is an artefact of the collector, not a property of the organisation.

To collect the full register, loop `page` 1..10 for NGA (and follow `_links.next` for every
other country). The `_links.last` field gives the final page number directly.

---

## What this means in practice

| Question | Answer |
|---|---|
| Is the foundation a registered non-profit? | **Yes** — CAC Incorporated Trustees, `IT/7008093` |
| Does Goodstack recognise it? | **Yes** — it is in the registry-backed database |
| Has anyone claimed the Goodstack record? | **No** — `claimedAt: null`, and `0` in the public listing |
| Can it currently unlock non-profit discounts (Zoom, Asana, Atlassian, …)? | **No** — those require a *claimed* record |
| What is needed to claim it? | The CAC number **7008093**, at https://causes.goodstack.io/claim |

Once claimed, adding `chrysolitefoundation.ng` to the profile is itself a benefit: the
record's `website` is currently `null`, and the discount providers use the website to
confirm the organisation is real and operating.

### One open discrepancy

The Goodstack record's registered address is:

> NO 1, ODUDUWA ROAD, UNIVERSITY OF IBADAN, IBADAN, NIGERIA

The site's footer and structured data say:

> Juli Alice Hall, Cilareta Filling Station, Oluyole Estate Road, Oluyole, Ibadan

Both are in Ibadan but they are not the same place. If one is the CAC **registered office**
and the other the **programme office**, `contact.html` should label them as such. If one is
simply wrong, fix it. See `README.md` §4.
