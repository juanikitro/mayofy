# Pedido al agente de assets: islas recortadas con transparencia

**Fecha:** 17 de noviembre de 2026
**Decisión de Juani:** "Si" a entregar, además de cada placa completa, la isla recortada con alpha para parallax real (ver `2026-11-17-integracion-mayo-assets.md`, §6 punto 5 y §9 punto 2).
**Uso:** el 17 de noviembre Juani pidió que el agente de la landing se comunicara directamente con el de assets. Como el chat de Codex anterior no era alcanzable por la CLI de Orca, se lanzó un worker de Codex supervisado por orquestación de Orca en el worktree `mayo-world-assets` (run `run_b9b05ab40726`, dispatch `ctx_cb8b2108a8e5`) con este pedido, más la isla 7 completa, el lote C de nubes y el recorte y optimización de todos los lotes. El bloque siguiente queda como referencia del pedido original.

```text
New delivery requirement, approved by Juani on 2026-11-17 (see docs/plans/2026-11-17-integracion-mayo-assets.md §6.5 in branch juanikitro/landing-redesign): for every island plate, deliver two derived layers so the landing can move sky and island at different speeds and let text overlap the sky without touching the island.

For each plate (01, 02, 10, 30 desktop/celular, 40 desktop/celular, 45 desktop/celular, 50 desktop/celular, 55 and the missing island 7 celular):
1. `<name>-isla.png`: the floating island (ground, roots, trees, rocks that sit on it) cut out with alpha, on a canvas of exactly the same pixel size as the plate and in exactly the same position, so it overlays the plate 1:1. Keep soft edges on grass and roots (feathered alpha, no halo of sky colour). Do not include far islands or clouds.
2. `<name>-fondo.png`: the same plate with the island removed and the sky/clouds filled in (inpainted) so no trace of the island remains. Same size as the plate.
Far islands and clouds stay in `-fondo.png`. Where a separate sky layer already exists (03, 31, 41, 46, 51) keep delivering it as well; the `-fondo.png` is the plate-accurate version used directly behind the island.

Quality bar: when `-fondo.png` and `-isla.png` are stacked they must reproduce the original plate pixel for pixel within the island's silhouette and show no seam or colour step around it. Attach a quick composite check per plate in the manifest.

Naming and manifest: list each new file in docs/plans/mundo-mayo-assets.md with island, role (`island-cutout` / `background`), pixel size, alpha yes/no and, for `-isla.png`, the island's bounding box in percent of the canvas (left, top, right, bottom). Optimised formats as for the rest of the batch (AVIF/WebP, plates ≤ 2048 px). Originals untouched. No `src/` edits, no new dependencies, no push.
```

## Qué hace la landing con estas capas

- `-fondo.png` reemplaza el degradé de cielo de cada isla y se mueve a 0,3× del scroll.
- `-isla.png` es la capa `scene__island` y se mueve a 1×; los objetos (rocas, invernadero, piedras, fogón) y Mayo se posicionan en porcentaje de su caja (la que el manifiesto declara), no de la placa.
- Si una isla llega sin `-isla.png`, se monta la placa completa como hoy, sin parallax.
