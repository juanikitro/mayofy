# Orden del repositorio (23 de noviembre de 2026)

Pedidos de Juani: "cerra las sesiones, ramas y worktrees que ya terminaron" y "desplega un agente que arregle todo lo relacionado al orden de repositorio". Rama `juanikitro/landing-orden-repo`, creada desde `juanikitro/landing-redesign` (`dacd92c`). No cambia código de la app: solo `.gitignore` y este documento.

## Resultado

| Medida | Antes | Después |
| --- | ---: | ---: |
| `git fetch` | falla (`bad object refs/codex/...`) | funciona |
| `git fsck` | 1 error (ref rota) + 126 objetos colgantes | 0 errores (solo objetos colgantes, que son normales) |
| Worktrees registradas | 33 | 22 (21 después de cerrar `landing-seo-rendimiento`, ver Pendientes) |
| Ramas locales `juanikitro/*` | 32 | 21 |
| `.git` en disco | 745 MB (6.045 objetos sueltos, 0 packs) | 720 MB (2 packs) |

- `git gc` ganó poco (25 MB) porque casi todo el peso son imágenes PNG/AVIF que ya vienen comprimidas, sobre todo los fotogramas de las ramas de assets. Achicar más exigiría reescribir historia o borrar esas ramas; no se hizo.
- No se borró ninguna rama remota. `origin/juanikitro/landing-iteration` sigue en GitHub (su rama local se borró porque está mergeada).

## 1. La ref rota de Codex

- Causa observada: `.git/refs/codex/turn-diffs/checkpoints/<hash>/<hash>/<n>/<uuid>`, un checkpoint que dejó Codex. Su ruta supera el límite de 260 caracteres de Windows (`fsck`: "Filename too long"), git la leía como `0000000…` y además apuntaba a un árbol, no a un commit. Por eso `git fetch` cortaba con "bad object". El resto de `refs/codex/` eran carpetas vacías.
- Respaldo antes de borrar, fuera del repo, en `C:/Users/Juanito/Desktop/Repositorios/MAYOFY/backup-refs-codex-2026-11-23/`:
  - `refs-codex-list.txt`: ruta de la ref, SHA (`e79cdae`) y tipo.
  - `refs-codex-tree/`: copia de la carpeta `refs/codex` tal como estaba.
  - `codex-checkpoint-e79cdae.zip`: el contenido de ese checkpoint (10 MB), por si alguien lo necesita.
- Se borró solo `.git/refs/codex/`. Después: `git fetch --prune` trajo `origin/migration/railway` sin errores y `git fsck` no reporta errores.
- Si Codex vuelve a dejar refs así, se repite lo mismo. Ya no hace falta `git -c gc.auto=0`, pero no molesta.

## 2. Worktrees y ramas cerradas

Cada una se comprobó antes de tocarla: 0 commits fuera de `juanikitro/landing-redesign` y de `master` (`git rev-list --count`), ningún agente vivo ni en curso en Orca (`orca orchestration worker-list`, revisado justo antes de borrar) y sus archivos sin versionar revisados. Se borraron con `orca worktree rm --force` (para que Orca quede consistente) y después la rama con `git branch -d`, que se niega a borrar algo no mergeado.

| Worktree / rama `juanikitro/...` | Último commit | Sin versionar (qué se hizo) |
| --- | --- | --- |
| `landing-avatar-juani` | `33e3c01` | `.atl/` y 3 imágenes de referencia del avatar: copiadas al respaldo |
| `landing-contacto-cal` | `272353c` | solo `.atl/` |
| `landing-hallazgos-menores` | `b888cb8` | solo `.atl/` |
| `landing-iteration` | `0b845b5` | solo `.atl/` (la rama remota queda) |
| `landing-limpieza` | `a23146d` | solo `.atl/` |
| `landing-packs` | `8946ac7` | solo `.atl/` |
| `landing-perfil-google` | `288fcc7` | solo `.atl/` |
| `landing-propuestas` | `5d9585b` | solo `.atl/` |
| `landing-prueba-usuario` | `d03a311` | solo `.atl/` |
| `landing-ui-review` | `46d9d6e` | `.atl/` y `.taste-skill/` (4,5 MB de salida de la herramienta): copiada al respaldo |
| `mayo-3d-character` | `3176219` | solo `.atl/` |
| `landing-seo-rendimiento` | `00a2858` | contenido borrado; la carpeta vacía y su rama siguen (ver Pendientes) |

También se borró la carpeta vacía `landing-scroll-premium-worktrees/` y se movieron 10 logs y diffs sueltos de agentes terminados (`ui-*`, `ui-review-*`, `propuestas-dev.log`) de `C:/Users/Juanito/orca/workspaces/mayofy-landing/` al respaldo.

Respaldo de archivos sin versionar: `C:/Users/Juanito/Desktop/Repositorios/MAYOFY/backup-orden-2026-11-23/`.

## 3. Sesiones de Orca cerradas

Se liberaron con `orca orchestration worker-release` las terminales de los 15 workers terminados (succeeded, failed o stopped, y con el proceso ya salido) del proyecto: `ctx_b76f857d554d` (seo-rendimiento), `ctx_29dca448232d` (avatar), `ctx_f99b8caeb4cc` (perfil Google), `ctx_1b1291bd2ed7` (packs), `ctx_0e83be8a7d50` (contacto), `ctx_d51d1bb0b49e` (limpieza), `ctx_e2ef19531165` (hallazgos), `ctx_825d53a7f6a0` (prueba de usuario), `ctx_ca46d19e081f` (propuestas), `ctx_71734bd21792` (islas ilustradas), `ctx_3a7d2d824b46` (islas ilustradas B), `ctx_1f088ee0e317` (UI review), `ctx_6ded4f32fa31` (repo `mayo-3d`), `ctx_c6ade0f7700d` (paint B) y `ctx_cb8b2108a8e5` (world assets). Orca guardó la transcripción de cada uno antes de cerrar.

No se tocaron los workers de otros proyectos (ShineApp, SistemaDeSalud, ai-job-search). Orca no tiene un comando para cerrar pestañas de chat; las de las worktrees borradas desaparecen con ellas.

## 4. Lo que quedó y por qué

| Worktree | Motivo |
| --- | --- |
| checkout principal (`master`) | producción |
| `landing-redesign` | rama de integración |
| `landing-casos`, `landing-guia-juani` | activas por pedido |
| `landing-orden-repo` (esta), `landing-comercial`, `landing-email`, `landing-analytics`, `landing-legales`, `landing-isla4-1024`, `landing-integracion-mayo`, `landing-scroll-premium` | agente vivo de esta ronda |
| `landing-navegacion`, `landing-rendimiento-celular` | ya mergeadas, pero su agente figura vivo; Orca libera la terminal solo y después se pueden borrar |
| `mayo-islas-ilustradas`, `mayo-islas-ilustradas-b`, `mayo-paint-b`, `mayo-world-assets` | **no mergeadas** (ver abajo) |

El repo `MAYOFY/mayo-3d` es otro repositorio y no se tocó; solo se cerró la terminal de su worker terminado.

### Ramas sin mergear (decide Juani)

Son las fábricas de fotogramas de Mayo. Entre el 80 y el 90 % de sus archivos no está en `landing-redesign`: la landing usa solo las tiras finales que se copiaron. Borrarlas pierde los fotogramas intermedios y los originales en `raw/` (están versionados en estas ramas). Ninguna tiene copia remota.

| Rama `juanikitro/...` | Commits sin mergear | Último commit | Archivos ausentes en `landing-redesign` |
| --- | ---: | --- | --- |
| `mayo-islas-ilustradas` | 49 | `b683cc4` 20/11 "paint island two case picker illustrations" | 750 de 904 |
| `mayo-islas-ilustradas-b` | 43 | `c5b0ab0` 20/11 "paint seated Mayo admiring packs with blink" | 623 de 758 |
| `mayo-paint-b` | 20 | `6f90461` 17/11 "repaint works as double-suspension gallop" | 462 de 527 |
| `mayo-world-assets` | 36 | `b9a2804` 17/11 "complete format coverage and final inventory" | 571 de 670 |

`mayo-world-assets` además tiene cambios sin commitear (un doc modificado, dos docs y `odd/tasks/` nuevos) y no está registrada en Orca. Lista completa de commits: `git log --oneline juanikitro/landing-redesign..juanikitro/<rama>`.

Recomendación: si Juani no piensa volver a pintar con esas ramas, archivarlas con `git bundle create mayo-assets.bundle juanikitro/mayo-*` fuera del repo y después borrarlas. Así `.git` bajaría bastante.

## 5. Higiene

- `.gitignore` ahora ignora la salida local de agentes y herramientas: `.atl/`, `.codegraph/`, `.taste-skill/`, `.playwright-cli/`, `.playwright-mcp/`, `playwright-report/`, `test-results/`, `*.log`, `scratch/`, `tmp/` y `public/images/mundo-mayo/raw/` (los originales en alta; se versionan solo los optimizados). Se quitaron tres reglas duplicadas (`.vercel`, `.env*`, `!.env.example`). Comprobado: ningún archivo versionado queda ignorado y `.env.example` sigue versionado.
- Secretos: búsqueda de patrones de claves (Stripe, OpenAI, AWS, GitHub, Resend, Slack, claves privadas) en todo lo versionado: sin resultados. El único `.env*` versionado es `.env.example`.
- Archivos grandes: el mayor versionado es `public/images/hero-umbral-desktop.png` (2,4 MB). Nada pasa de 3 MB; los 1.104 archivos versionados suman 71 MB.

## Cómo nombrar y cerrar worktrees desde ahora

- **Nombre:** `C:/Users/Juanito/orca/workspaces/mayofy-landing/landing-<tema>` con rama `juanikitro/landing-<tema>`, creada desde `juanikitro/landing-redesign`. Tema corto, en castellano y sin tildes (`landing-legales`, `landing-isla4-1024`). Las de assets de Mayo: `mayo-<tema>`. Nada de carpetas `*-worktrees` dentro de `workspaces/`.
- **Salida de herramientas:** logs, capturas y diffs van dentro de la worktree (ya están ignorados) o en el scratchpad del agente, no sueltos en `workspaces/mayofy-landing/`.
- **Cerrar** cuando el trabajo está mergeado:
  1. `orca orchestration worker-list --json`: el worker tiene que estar `succeeded`/`failed`/`stopped` con `liveness` `exited`.
  2. `git rev-list --count juanikitro/landing-redesign..juanikitro/landing-<tema>` tiene que dar `0`.
  3. `git -C <worktree> status --porcelain`: copiar afuera lo que no sea salida de herramientas.
  4. `orca orchestration worker-release --dispatch <id> --json` (si la terminal sigue retenida).
  5. `orca worktree rm --worktree "id:<repoId>::<ruta>" --force --json` (por Orca, no con `git worktree remove`).
  6. `git branch -d juanikitro/landing-<tema>` (con `-d`, nunca `-D`).
- Las ramas remotas no se borran sin pedido explícito de Juani.

## Segunda pasada (mismo día)

El coordinador confirmó que `landing-microinteracciones`, `landing-isla3-rocas` y `landing-design-review-2` habían terminado (trabajo mergeado, workers detenidos). Se comprobó de nuevo que tenían 0 commits sin mergear y que no había archivos sin versionar fuera de `.atl/` y `.taste-skill/` (copiada al respaldo). Después se liberaron sus terminales, se borraron las worktrees con Orca y las ramas con `git branch -d` (`e105ee4`, `25f600c`, `78c95d6`). Quedan 19 worktrees registradas.

## Pendientes

- `landing-seo-rendimiento`: Orca borró todo su contenido, pero Windows no deja borrar la carpeta vacía ("está siendo utilizado en otro proceso"). No es un servidor de desarrollo: ningún `node` de esa worktree escucha en los puertos 3010 a 3019. Leyendo el directorio actual de cada proceso, la carpeta la tiene tomada el servidor de memoria Engram (`engram serve`, puerto 7437), que arrancó el hook de inicio de sesión del agente de SEO a las 12:10 y quedó con esa carpeta como directorio de trabajo. Ese servidor es compartido por todos los agentes, así que no se cerró. Se libera solo cuando Engram se reinicia (por ejemplo al reiniciar la PC o cerrar todas las sesiones). Para terminar, después correr `orca worktree rm --worktree "id:4eec20e9-86b5-4684-9ece-7092b01c57c0::C:/Users/Juanito/orca/workspaces/mayofy-landing/landing-seo-rendimiento" --force --json` y después `git branch -d juanikitro/landing-seo-rendimiento` (está mergeada).
- Las 4 ramas de assets sin mergear esperan decisión de Juani.

## Verificación

- `git fetch --prune`, `git fsck` y `git gc` en el checkout principal: sin errores.
- `orca worktree ps` ya no lista las 11 worktrees borradas.
- En `landing-redesign` (`1e75cda`, solo lectura): `npm run lint`, `npm run typecheck` y `npm run build` terminan sin errores. El servidor de desarrollo que corre ahí (puerto 3010) siguió respondiendo 200 después del build.
- No se hizo prueba en el navegador: esta tarea no cambia la app.
