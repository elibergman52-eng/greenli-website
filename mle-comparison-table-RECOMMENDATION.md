# M.L.E. Page — Comparison Section Table Rebuild (for Claude Code)

**File to edit:** `mle.html` (only)

**Target:** the "Competitive Comparison" section — comment marker `DLE COMPARISON TABLE` (~line 391), eyebrow `Competitive Comparison`, heading `M.L.E. vs. other D.L.E. methods.` Replace the check/X `<table class="compare-table" ...>` inside it.

---

## 1. What changes and why

The current table uses binary check/X icons, marking Ion Exchange with a red X on almost every row. That implies the conventional method has no capability, which is false and reads as disingenuous.

**Fix:** Replace the icon cells with **text value cells**. The Ion Exchange / D.L.E. column now shows its real performance ("60–85% recovery", "batch cycles") instead of an X. M.L.E. still wins on every row, but the comparison is fair because the competing method is shown as legitimate, just less efficient.

Capped at **8 rows**, synthesized from the source comparison document (DLE column).

---

## 2. Design spec

- **Left column (criterion):** unchanged — left-aligned, `var(--muted)`.
- **Ion Exchange column:** `var(--dim)`, weight 400. Neutral, factual.
- **M.L.E. column:** `var(--green)`, weight 600. Keep the existing highlight classes `compare-col-mle`, `compare-col-mle-top`, `compare-col-mle-bot`.
- Short cell text (under ~6 words) so it wraps cleanly on mobile. Keep the `overflow-x:auto` wrapper.

Add to the `/* COMPARISON TABLE */` CSS block (~line 73):

```css
.compare-table td.val { font-size: 0.85rem; line-height: 1.35; white-space: normal; }
.compare-table td.val-con { color: var(--dim); font-weight: 400; }
.compare-table td.val-hi  { color: var(--green); font-weight: 600; }
```

---

## 3. Proposed content

Header: relabel column widths to 34% / 33% / 33% (value text needs more room than icons). Conventional column label stays "Ion Exchange" with the existing subtitle. M.L.E. column unchanged.

| Criterion | Ion Exchange (conventional D.L.E.) | M.L.E. (greenLi) |
|---|---|---|
| Lithium recovery rate | 60–85% (varies by method) | >80% demonstrated; cascadable to >90% |
| Processing mode & speed | Batch cycles; days to weeks | Continuous; hours to first product |
| Minimum feed concentration | >100–200 ppm | Demonstrated at 3.5 mg/L (<10 ppm) |
| Li selectivity vs Na / K / Ca / Mg | Moderate; pretreatment often needed | 18–28× in a single pass |
| Chemical regenerants | Acidic eluents required for regeneration | None; ~95% lower reagent use |
| Water consumption | High (regeneration flush water) | Low (RO-style permeate/concentrate split) |
| Operating cost per m³ feed | +10–30% (complex regeneration) | −39% vs conventional (demonstrated) |
| Scale-up path | Custom columns; 6–18 months | COTS RO skids; modular, 2–6 months |

---

## 4. Drop-in HTML

Replace the existing `<table class="compare-table" style="min-width:480px;">...</table>` (inside the `raised` card, leave that card wrapper and the `overflow-x:auto` div in place) with:

```html
<table class="compare-table" style="min-width:520px;">
  <thead>
    <tr style="background:var(--surface-3); border-bottom:1px solid var(--border-hi);">
      <th style="text-align:left; color:var(--dim); padding:1.25rem 1.5rem; width:34%;">Criterion</th>
      <th style="color:var(--dim); padding:1.25rem 1rem; width:33%;">Ion Exchange<br><span style="font-weight:400; text-transform:none; letter-spacing:0; font-size:0.75rem; color:var(--muted);">(conventional D.L.E.)</span></th>
      <th class="compare-col-mle compare-col-mle-top" style="color:var(--green); padding:1.25rem 1rem; width:33%;">M.L.E.<br><span style="font-weight:400; text-transform:none; letter-spacing:0; font-size:0.75rem; color:var(--green); opacity:0.8;">(greenLi)</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lithium recovery rate</td>
      <td class="val val-con">60–85% (varies by method)</td>
      <td class="val val-hi compare-col-mle">&gt;80% demonstrated; cascadable to &gt;90%</td>
    </tr>
    <tr>
      <td>Processing mode &amp; speed</td>
      <td class="val val-con">Batch cycles; days to weeks</td>
      <td class="val val-hi compare-col-mle">Continuous; hours to first product</td>
    </tr>
    <tr>
      <td>Minimum feed concentration</td>
      <td class="val val-con">&gt;100–200 ppm</td>
      <td class="val val-hi compare-col-mle">Demonstrated at 3.5 mg/L (&lt;10 ppm)</td>
    </tr>
    <tr>
      <td>Li selectivity vs Na / K / Ca / Mg</td>
      <td class="val val-con">Moderate; pretreatment often needed</td>
      <td class="val val-hi compare-col-mle">18–28× in a single pass</td>
    </tr>
    <tr>
      <td>Chemical regenerants</td>
      <td class="val val-con">Acidic eluents required for regeneration</td>
      <td class="val val-hi compare-col-mle">None; ~95% lower reagent use</td>
    </tr>
    <tr>
      <td>Water consumption</td>
      <td class="val val-con">High (regeneration flush water)</td>
      <td class="val val-hi compare-col-mle">Low (RO-style permeate/concentrate split)</td>
    </tr>
    <tr>
      <td>Operating cost per m³ feed</td>
      <td class="val val-con">+10–30% (complex regeneration)</td>
      <td class="val val-hi compare-col-mle">−39% vs conventional (demonstrated)</td>
    </tr>
    <tr>
      <td>Scale-up path</td>
      <td class="val val-con">Custom columns; 6–18 months</td>
      <td class="val val-hi compare-col-mle compare-col-mle-bot">COTS RO skids; modular, 2–6 months</td>
    </tr>
  </tbody>
</table>
```

The `COTS = Commercial-Off-The-Shelf.` footnote `<p>` below the card stays as-is.

---

## 5. Notes / honesty guardrails

- Source hedging kept intact: "demonstrated", "varies by method", "cascadable to >90%". Do not strip — keeps claims defensible.
- Values are the D.L.E. column from the source doc, since this page's table compares M.L.E. against D.L.E. / ion-exchange specifically (not evaporation).
- No row concedes an outright win to Ion Exchange; fairness comes from showing its real numbers, not a checkmark.
- Verify mobile (<768px): font drops to 0.8rem and cells wrap — confirm no row breaks the `min-width:520px` container.
