# PA1 — Plataforma de Gestión de Solicitudes Académicas

**Curso:** Programación Web II · **Código:** 30690 · **Institución:** ISIL · **Periodo:** 202620
**Evaluación:** PA1 — Proceso de Aprendizaje 1 (sesiones 1 a 4)

## Integrantes

| Nombre completo | Rol | Participación |
|---|---|---|
| Ayrton Mihail Palomino Loli | [ROL] | Actividad 1: tipado, JavaScript moderno y organización modular |
| [NOMBRE COMPLETO] | [ROL] | [ACTIVIDAD / TAREAS] |
| [NOMBRE COMPLETO] | [ROL] | [ACTIVIDAD / TAREAS] |
| [NOMBRE COMPLETO] | [ROL] | [ACTIVIDAD / TAREAS] |

## Descripción

Frontend Angular tipado para una plataforma de gestión de solicitudes académicas. En esta primera etapa permite registrar, navegar y visualizar información de solicitudes, sin implementar todavía el backend de Node.js (sesiones 5 a 7).

## Objetivo

Demostrar dominio de JavaScript moderno y TypeScript, componentes en Angular 16, formularios reactivos con navegación, y consumo de una API REST con HttpClient, manteniendo una solución modular y justificando las decisiones técnicas.

## Desarrollo

[COMPLETAR POR EL EQUIPO: breve descripción del procedimiento seguido, actividad por actividad.]

## Solución propuesta

### Actividad 1: Base tipada y modular

**Responsable:** Ayrton Mihail Palomino Loli

**Estructura**

```
src/app/
├── models/
│   └── solicitud.model.ts
└── utils/
    ├── helpers.ts
    └── validaciones.ts
```

**Tipos e interfaces definidos** (`models/solicitud.model.ts`)

| Elemento | Descripción |
|---|---|
| `EstadoSolicitud` | Union type: `'pendiente' \| 'en_proceso' \| 'aprobada' \| 'rechazada'` |
| `TipoSolicitud` | Union type: `'constancia' \| 'retiro_curso' \| 'reincorporacion' \| 'convalidacion'` |
| `Estudiante` | Interfaz con `id`, `nombre`, `codigo` y `correo` |
| `Solicitud` | Interfaz con `id`, `estudiante`, `tipo`, `descripcion`, `estado` y `fecha` |

**Funciones** (`utils/`)

- `helpers.ts`: `filtrarPorEstado`, `buscarPorId`, `resumen`, `contarPorEstado`, `cambiarEstado` y `crearSolicitud`.
- `validaciones.ts`: `esCorreoValido` y `validarEstudiante`.

**Decisiones de estructura**

- **Modelos separados de la lógica:** los tipos viven en `models/` para que componentes, servicios y formularios de las demás actividades los reutilicen sin duplicarlos.
- **Union types en lugar de `string`:** estados y tipos de solicitud solo aceptan valores válidos, y el compilador detecta errores antes de ejecutar.
- **Modo estricto:** el código se verifica con `strict` de TypeScript.
- **Funciones puras e inmutabilidad:** `cambiarEstado` y `contarPorEstado` devuelven objetos nuevos con spread en vez de modificar los originales, lo que evita efectos secundarios.
- **Validaciones aparte en `validaciones.ts`:** quedan listas para reutilizarse en el formulario reactivo (Actividad 3).
- **Módulos:** cada archivo exporta lo que ofrece y la lógica se importa con `import`/`export`.

**Recursos de ES6+ y TypeScript utilizados**

| Recurso | Dónde se usa |
|---|---|
| Arrow functions | Todas las funciones de `helpers.ts` y `validaciones.ts` |
| Destructuring | Parámetros de `resumen` y callback de `reduce` en `contarPorEstado` |
| Spread operator | `cambiarEstado`, `contarPorEstado` y `crearSolicitud` |
| Template literals | `resumen` |
| Parámetros por defecto | `crearSolicitud` (estado `'pendiente'`) |
| `filter`, `find`, `reduce` | `filtrarPorEstado`, `buscarPorId`, `contarPorEstado` |
| Módulos `import`/`export` | Todos los archivos |
| `Omit` y `Record` (TypeScript) | `crearSolicitud` y `contarPorEstado` |

### Actividad 2: Arquitectura de componentes Angular

[COMPLETAR POR EL EQUIPO]

### Actividad 3: Formulario reactivo, validaciones y navegación

[COMPLETAR POR EL EQUIPO]

### Actividad 4: Consumo de una API REST con HttpClient

[COMPLETAR POR EL EQUIPO]

## Cómo ejecutar o revisar

**Requisitos:** Node.js 18.x y Angular CLI 16.

```bash
node -v                         # debe mostrar v18.x
npm install -g @angular/cli@16
npm install
ng serve                        # abre http://localhost:4200
ng build                        # compila el proyecto
```

**Verificar el tipado de la Actividad 1:**

```bash
npx tsc --noEmit --strict --target ES2020 --moduleResolution node --skipLibCheck src/app/utils/helpers.ts src/app/utils/validaciones.ts
```

Si no imprime nada, compila sin errores. Se usa `--skipLibCheck` porque el tipado de `@types/node` instalado en el proyecto es más nuevo que TypeScript 5.1.

## Evidencias

### Actividad 1

| Evidencia | Imagen |
|---|---|
| Ejecución del código TypeScript (Node 18) | ![Ejecución](evidencias/actividad-1/evidencia-1-ejecucion.png) |
| Compilación dentro del proyecto Angular | ![Compilación](evidencias/actividad-1/evidencia-2-compilacion.png) |
| Error de tipado detectado por TypeScript | ![Error de tipado](evidencias/actividad-1/evidencia-3-error-tipado.png) |
| Estructura modular | ![Estructura](evidencias/actividad-1/evidencia-4-estructura.png) |
| Tipos e interfaces | ![Tipos](evidencias/actividad-1/evidencia-5-tipos.png) |
| Recursos de ES6+ | ![ES6+](evidencias/actividad-1/evidencia-6-es6.png) |
| Repositorio en GitHub | ![GitHub](evidencias/actividad-1/evidencia-7-github.png) |

La ejecución con datos de ejemplo (listado, filtros, cambio de estado, conteo y validaciones) se realizó en un proyecto TypeScript independiente con Node 18, antes de integrar `models` y `utils` a `src/app`.

### Actividades 2, 3 y 4

[COMPLETAR POR EL EQUIPO]

## Conclusiones

**Actividad 1:** definir los tipos antes de construir los componentes evita errores de datos y hace que el código sea más fácil de mantener. Los union types y el modo estricto permiten detectar valores inválidos en compilación, y la separación en `models` y `utils` deja lógica reutilizable para el formulario y el consumo de la API.

[AGREGAR CONCLUSIONES GENERALES DEL EQUIPO Y LA RELACIÓN CON LOS CONTENIDOS DE LAS SESIONES 1 A 4]

## Video de exposición

**Video público de YouTube:** [PEGAR AQUÍ EL ENLACE]
