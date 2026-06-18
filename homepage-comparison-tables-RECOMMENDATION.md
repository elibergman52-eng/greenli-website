# Homepage Comparison Tables — Rebuild Spec for Claude Code

**File to edit:** `index.html` (homepage only — the Spanish `es/index.html` does **not** contain these tables, so no mirror edit is needed)

**Two tables affected:**
1. MLE table — comment marker `<!-- Comparison table: Conventional DLE vs M.L.E. -->` (~line 599)
2. DCM table — comment marker `<!-- DCM comparison table -->` (~line 721)

---

## 1. What changes and why

The current tables use binary check/X icons. Every row is a red X for conventional and a green check for greenLi, because the rows were chosen to be greenLi-only capabilities. That reads as disingenuous: it implies conventional technology has zero capability, which is false.

**Fix:** Replace the icon cells with **text value cells**. The conventional column now shows its real performance (e.g. "60–85% recovery", "5–8 steps") instead of a red X. greenLi still wins on every row, but conventional is shown as a legitimate, capable technology rather than worthless. This is the fair comparison.

Each table is capped at **8 rows**, synthesized from the source document.

---

## 2. Design spec for the value cells

- **Left column (criterion):** unchanged styling — left-aligned, `var(--muted)`.
- **Conventional column:** `var(--dim)` text, normal weight (400). Reads as factual, neutral.
- **greenLi column (MLE):** `var(--green)`, weight 600. Keep the existing highlighted-column border classes (`compare-col-hi`, `compare-col-hi-top`, `compare-col-hi-bot`).
- **greenLi column (DCM):** `var(--amber)`, weight 600. Keep `compare-col-amber*` classes.
- Cell text is short (target under ~6 words) so it stays readable on mobile. The existing `overflow-x:auto` wrapper and `min-width:520px` stay as-is.

Add this to the `/* ── Comparison Table ── */` CSS block so value cells render cleanly and wrap gracefully:

```css
.compare-table td.val { font-size: 0.85rem; line-height: 1.35; white-space: normal; }
.compare-table td.val-con { color: var(--dim); font-weight: 400; }
.compare-table td.val-hi  { color: var(--green); font-weight: 600; }
.compare-table td.val-amber { color: var(--amber); font-weight: 600; }
```

---

## 3. Proposed content — MLE table

**Header:** Capability → keep "Capability". Conventional column: relabel from "Conventional DLE" to **"Conventional Extraction"** (the values blend evaporation + DLE benchmarks, so the broader label is more accurate). greenLi column stays "M.L.E.".

| Criterion | Conventional Extraction | M.L.E. (greenLi) |
|---|---|---|
| Lithium recovery rate | 60–85% (varies by method) | >80% demonstrated; cascadable to >90% |
| Processing mode & speed | Batch cycles; days to weeks | Continuous; hours to first product |
| Minimum feed concentration | >100–200 ppm | Demonstrated at 3.5 mg/L (<10 ppm) |
| Li selectivity vs Na / K / Ca / Mg | Moderate; pretreatment often needed | 18–28× in a single pass |
| Chemical reagent use | High (acids, eluents for regeneration) | ~95% lower; no acids or precipitants |
| Water consumption | High (regeneration flush water) | Low (RO-style permeate/concentrate split) |
| Operating cost per m³ feed | +10–30% vs evaporation baseline | −39% vs conventional (demonstrated) |
| Scaling & deployment | Custom columns/modules; 6–18 months | COTS RO skids; modular, 2–6 months |

---

## 4. Proposed content — DCM table

**Header:** Conventional column stays "Traditional Battery Manufacture". greenLi column stays "D.C.M.".

| Criterion | Traditional Battery Manufacture | D.C.M. (greenLi) |
|---|---|---|
| Steps from aqueous Li to cathode | 5–8 distinct steps | 3 steps |
| High-temperature sintering | Required: 700–850°C for 12+ hrs | Short, low-temperature calcination only |
| Intermediate lithium salts | Required (Li₂CO₃ / LiOH produced & shipped) | None; Li transferred directly |
| Energy consumption | 3,000–5,000 kWh per tonne LFP | Substantially lower (electrochemical + short calcination) |
| Supply-chain handoffs | 4–6 handoffs | 1 handoff (cathode → cell maker) |
| Time from extraction to cathode | 6–18 months | Days to weeks |
| Production location | Centralized refinery (typically China) | On-site, containerized bolt-on |
| Cathode chemistry switching | Separate production line per chemistry | Tunable by applied charge (LFP, NMC, LNMO) |

---

## 5. Drop-in HTML — MLE table

Replace the existing `<table class="compare-table" ...>...</table>` inside the `<!-- Comparison table: Conventional DLE vs M.L.E. -->` block with:

```html
<table class="compare-table" style="min-width:520px;">
  <thead>
    <tr style="background:var(--surface-3); border-bottom:1px solid var(--border-hi);">
      <th style="text-align:left; color:var(--dim); padding:1.25rem 1.5rem; width:34%;">Criterion</th>
      <th style="color:var(--dim); padding:1.25rem 1rem; width:33%;">Conventional Extraction</th>
      <th class="compare-col-hi compare-col-hi-top" style="color:var(--green); padding:1.25rem 1rem; width:33%;">M.L.E.<br><span style="font-weight:400; text-transform:none; letter-spacing:0; font-size:0.6875rem; opacity:0.7;">(greenLi)</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lithium recovery rate</td>
      <td class="val val-con">60–85% (varies by method)</td>
      <td class="val val-hi compare-col-hi">&gt;80% demonstrated; cascadable to &gt;90%</td>
    </tr>
    <tr>
      <td>Processing mode &amp; speed</td>
      <td class="val val-con">Batch cycles; days to weeks</td>
      <td class="val val-hi compare-col-hi">Continuous; hours to first product</td>
    </tr>
    <tr>
      <td>Minimum feed concentration</td>
      <td class="val val-con">&gt;100–200 ppm</td>
      <td class="val val-hi compare-col-hi">Demonstrated at 3.5 mg/L (&lt;10 ppm)</td>
    </tr>
    <tr>
      <td>Li selectivity vs Na / K / Ca / Mg</td>
      <td class="val val-con">Moderate; pretreatment often needed</td>
      <td class="val val-hi compare-col-hi">18–28× in a single pass</td>
    </tr>
    <tr>
      <td>Chemical reagent use</td>
      <td class="val val-con">High (acids, eluents for regeneration)</td>
      <td class="val val-hi compare-col-hi">~95% lower; no acids or precipitants</td>
    </tr>
    <tr>
      <td>Water consumption</td>
      <td class="val val-con">High (regeneration flush water)</td>
      <td class="val val-hi compare-col-hi">Low (RO-style permeate/concentrate split)</td>
    </tr>
    <tr>
      <td>Operating cost per m³ feed</td>
      <td class="val val-con">+10–30% vs evaporation baseline</td>
      <td class="val val-hi compare-col-hi">−39% vs conventional (demonstrated)</td>
    </tr>
    <tr>
      <td>Scaling &amp; deployment</td>
      <td class="val val-con">Custom columns/modules; 6–18 months</td>
      <td class="val val-hi compare-col-hi compare-col-hi-bot">COTS RO skids; modular, 2–6 months</td>
    </tr>
  </tbody>
</table>
```

---

## 6. Drop-in HTML — DCM table

Replace the existing `<table class="compare-table" ...>...</table>` inside the `<!-- DCM comparison table -->` block with:

```html
<table class="compare-table" style="min-width:520px;">
  <thead>
    <tr style="background:var(--surface-3); border-bottom:1px solid var(--border-hi);">
      <th style="text-align:left; color:var(--dim); padding:1.25rem 1.5rem; width:34%;">Criterion</th>
      <th style="color:var(--dim); padding:1.25rem 1rem; width:33%;">Traditional Battery<br>Manufacture</th>
      <th class="compare-col-amber compare-col-amber-top" style="color:var(--amber); padding:1.25rem 1rem; width:33%;">D.C.M.<br><span style="font-weight:400; text-transform:none; letter-spacing:0; font-size:0.6875rem; opacity:0.7;">(greenLi)</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Steps from aqueous Li to cathode</td>
      <td class="val val-con">5–8 distinct steps</td>
      <td class="val val-amber compare-col-amber">3 steps</td>
    </tr>
    <tr>
      <td>High-temperature sintering</td>
      <td class="val val-con">Required: 700–850°C for 12+ hrs</td>
      <td class="val val-amber compare-col-amber">Short, low-temperature calcination only</td>
    </tr>
    <tr>
      <td>Intermediate lithium salts</td>
      <td class="val val-con">Required (Li₂CO₃ / LiOH produced &amp; shipped)</td>
      <td class="val val-amber compare-col-amber">None; Li transferred directly</td>
    </tr>
    <tr>
      <td>Energy consumption</td>
      <td class="val val-con">3,000–5,000 kWh per tonne LFP</td>
      <td class="val val-amber compare-col-amber">Substantially lower (electrochemical + short calcination)</td>
    </tr>
    <tr>
      <td>Supply-chain handoffs</td>
      <td class="val val-con">4–6 handoffs</td>
      <td class="val val-amber compare-col-amber">1 handoff (cathode → cell maker)</td>
    </tr>
    <tr>
      <td>Time from extraction to cathode</td>
      <td class="val val-con">6–18 months</td>
      <td class="val val-amber compare-col-amber">Days to weeks</td>
    </tr>
    <tr>
      <td>Production location</td>
      <td class="val val-con">Centralized refinery (typically China)</td>
      <td class="val val-amber compare-col-amber">On-site, containerized bolt-on</td>
    </tr>
    <tr>
      <td>Cathode chemistry switching</td>
      <td class="val val-con">Separate production line per chemistry</td>
      <td class="val val-amber compare-col-amber compare-col-amber-bot">Tunable by applied charge (LFP, NMC, LNMO)</td>
    </tr>
  </tbody>
</table>
```

---

## 7. Notes / honesty guardrails

- Kept the source document's hedging language intact: "demonstrated", "varies by method", "cascadable to >90%". Do not strip these — they keep the claims defensible.
- DCM energy row uses "Substantially lower" rather than a fabricated number; the source gives a hard figure only for the conventional side (3,000–5,000 kWh/tonne LFP).
- MLE conventional column was relabeled "Conventional Extraction" (not "Conventional DLE") because the values blend evaporation and DLE benchmarks from the source. If you prefer to keep it strictly DLE, swap the recovery value to "60–85%" (DLE-only) and the cost row to "+10–30% (complex regeneration)" — both already hold.
- No row concedes an outright conventional win; fairness here comes from showing conventional's real numbers, not from handing it a checkmark.
- Verify mobile rendering after the change: at <768px the table font drops to 0.8rem and cells wrap. Confirm no row blows out the `min-width:520px` container.
