# PA1 — Plataforma de Gestión de Solicitudes Académicas

**Curso:** Programación Web II · **Código:** 30690 · **Institución:** ISIL · **Periodo:** 202620
**Evaluación:** PA1 — Proceso de Aprendizaje 1 (sesiones 1 a 4)

## Integrantes

| Nombre completo | Rol | Participación |
|---|---|---|
| Ayrton Mihail Palomino Loli | Arquitecto / Tipado | Actividad 1: tipado, JavaScript moderno y organización modular |
| Joseph Mathios Labra Espinal  | Desarrollador de Componentes/UI | Actividad 2: Creación de componentes, servicio inyectado |
| Roy Giovanni Quiroz Morales | Desarrollo Frontend | Implementación del formulario reactivo, validaciones y navegación |
| Angel Jesús Vargas Manrique | Integrador de API / Servicios | Actividad 4: Consumo de una API REST desde Angular |

## Descripción

Frontend Angular tipado para una plataforma de gestión de solicitudes académicas. En esta primera etapa permite registrar, navegar y visualizar información de solicitudes, sin implementar todavía el backend de Node.js (sesiones 5 a 7).

## Objetivo

Demostrar dominio de JavaScript moderno y TypeScript, componentes en Angular 16, formularios reactivos con navegación, y consumo de una API REST con HttpClient, manteniendo una solución modular y justificando las decisiones técnicas.

## Desarrollo

[COMPLETAR POR EL EQUIPO: breve descripción del procedimiento seguido, actividad por actividad.]

## Solución propuesta

### Actividad 1: Base tipada y modular

**Responsable:** Ayrton Mihail Palomino Loli

**Cómo lo trabajé**

1. **Preparé el entorno.** Angular 16 solo funciona con Node 16.14+ o 18.10+ y yo tenía Node 24, así que instalé NVM para Windows, Node 18.20.4 y Angular CLI 16.2.16. Tuve que desinstalar el Node 24 que estaba instalado aparte, porque tapaba la versión de NVM.
2. **Empecé en un proyecto TypeScript independiente.** Cuando empecé, el repositorio del equipo estaba vacío. Para no esperar, creé un proyecto aparte con TypeScript 5.1 (compatible con Angular 16) y una demo (`main.ts`) para ejecutar y probar la lógica con datos de ejemplo.
3. **Integré mi código al proyecto Angular.** Cuando mi compañero subió la base a `main`, hice el merge de mi rama, resolví el conflicto del `.gitignore` y moví `models` y `utils` a `src/app/`. La demo y los archivos de configuración de mi proyecto aparte los eliminé, para no pisar los del proyecto.
4. **Verifiqué la compilación con TypeScript estricto** sobre `src/app/utils`, con la evidencia en la sección de Evidencias.

**Estructura**

```
src/app/
├── models/
│   └── solicitud.model.ts
└── utils/
    ├── helpers.ts
    └── validaciones.ts
```

**Qué hice y por qué**

- **Empecé por los tipos** (`solicitud.model.ts`). Definí `Estudiante` y `Solicitud` como interfaces porque son las entidades del caso, y los estados y tipos de solicitud como *union types* (`'pendiente' | 'aprobada' | ...`) en lugar de `string`, para que el compilador rechace valores inválidos antes de ejecutar.
- **Separé `models` de `utils`.** Los tipos van aparte para que los formularios, servicios y componentes de las otras actividades los importen sin duplicarlos.
- **Usé funciones puras.** `cambiarEstado` y `contarPorEstado` devuelven objetos nuevos con spread en vez de modificar los originales, así una función no cambia datos sin que se note.
- **Dejé las validaciones en `validaciones.ts`**, para que el formulario reactivo de la Actividad 3 pueda reutilizarlas.
- **Recursos de ES6+ que usé:** arrow functions, destructuring, spread, template literals, parámetros por defecto, `filter`, `find`, `reduce` y módulos `import`/`export`, además de `Omit` y `Record` de TypeScript.

**Problemas que encontré y cómo los resolví**

- **Node 24 tapaba a Node 18.** `node -v` seguía mostrando la versión 24 aunque NVM decía que usaba la 18. Con `where node` vi que había dos instalaciones y desinstalé la de `Program Files`.
- **Mi rama y `main` no compartían historial**, porque clonamos un repositorio vacío. Usé `git merge --allow-unrelated-histories` y resolví el conflicto del `.gitignore`.
- **`ng build` no comprobaba mi código**, porque Angular solo compila lo que se importa desde `main.ts` y todavía nadie usaba `models` ni `utils`. Por eso verifiqué con `tsc --strict` directamente sobre esos archivos.
- **Errores de `@types/node`.** `tsc` mostraba 88 errores en `node_modules`, ninguno en `src/app`: la versión instalada de `@types/node` es más nueva que TypeScript 5.1. Lo solucioné con `--skipLibCheck`.


### Actividad 2: Arquitectura de componentes Angular

**Responsable:** Joseph Mathios Labra Espinal

**Cómo lo trabajé**

1. **Revision de la base** Primero revisé las interfaces que armó mi compañero en la Actividad 1 (Solicitud, Estudiante) para saber exactamente qué estructura de datos iba a iterar.
2. **Creación del servicio** Para no meter datos quemados directamente en el HTML o en el TS del componente, armé un servicio (SolicitudService), con el comando `ng g s services/solicitud` que provee una lista inicial de pruebas.
3. **Generación del componente** Creé el ListaSolicitudesComponent y me aseguré de que estuviera correctamente declarado dentro de AppModule para seguir la arquitectura tradicional de módulos de Angular
4. **Diseño de la vista** Construí la tabla en el HTML iterando los datos del servicio y le di estilos usando CSS puro..

**Estructura**

```
src/app/
├── services/
│   └── solicitud.service.ts
├── lista-solicitudes/
│   ├── lista-solicitudes.component.ts
│   ├── lista-solicitudes.component.html
│   └── lista-solicitudes.component.css
└── app.module.ts
```

**Qué hice y por qué**

- **Inyección de dependencias** Usé el decorador `@Injectable({providedIn: 'root })` en el servicio para que esté disponible en toda la aplicación. Luego lo inyecté en el constructor del componente. Esto separa las responsabilidades: el servicio maneja la data y el componente solo se encarga de pintarla
- **Directivas estructurales** Para hacer la tabla dinámica, usé la directiva `*ngFor` en la etiqueta <tr>. Decidí usar la sintaxis tradicional `(*ngFor="let item of lista")` en lugar de las nuevas herramientas de control de flujo porque asegura 100% de compatibilidad con Angular 16.
- **Data binding** Usé interpolación `{{ item.estudiante.nombre }}` para mostrar la información en las celdas de la tabla y en una lista de resúmenes generados.
- **Estilos CSS** Escribí CSS desde cero en el archivo `.css` del componente para darle un estilo limpio.

**Problemas que encontré y cómo los resolví**

- **Error de sintaxis con @for** Al inicio intenté iterar la lista usando `@for` directamente en el HTML, pero me salio error porque esa sintaxis no esta soportada nativamente en Angular 16, así que lo reemplace por `*ngFor`, lo cual soliciono el problema rapidamente.
- **Error de componente standalone** Me salió el error `imports is only valid on a component that is standalone` porque dejé un arreglo de imports dentro de la configuración del `@Component`. Como nuestro proyecto usa módulos tradicionales, quité esa línea del decorador y el servidor levantó en verde.


### Actividad 3: Formulario reactivo, validaciones y navegación

**Responsable:** Roy Giovanni Quiroz Morales

**Cómo lo trabajé**

1. **Partí del proyecto Angular existente.** Trabajé sobre el proyecto proporcionado por el equipo, sin crear un proyecto nuevo. Primero revisé la estructura existente y mantuve los modelos, utilidades y componentes que ya formaban parte del desarrollo anterior.

2. **Preparé el formulario reactivo.** Creé el componente `SolicitudFormComponent` dentro de `src/app/components/solicitud-form/` y configuré `ReactiveFormsModule` en `app.module.ts` para poder trabajar con formularios reactivos de Angular.

3. **Implementé las validaciones.** Construí un formulario para registrar solicitudes académicas con los campos nombre completo, código de estudiante, correo electrónico, tipo de solicitud y descripción. Se utilizaron validadores de Angular para controlar campos obligatorios, formato de correo y longitud mínima de la descripción.

4. **Implementé la navegación.** Creé el componente `InicioComponent` y configuré las rutas mediante `AppRoutingModule`. Se estableció una ruta principal para la página de inicio y una ruta específica para registrar una nueva solicitud.

5. **Adapté el código a Angular 16.** Durante la implementación encontré que la sintaxis `@if` utilizada inicialmente generaba errores de compilación debido a la versión de Angular del proyecto. La reemplacé por la sintaxis tradicional `*ngIf`, compatible con Angular 16.

6. **Integré mi trabajo con el proyecto del equipo.** El proyecto ya contenía componentes desarrollados por mis compañeros, por lo que integré la Actividad 3 sin eliminar los componentes existentes. Durante el proceso de integración resolví conflictos en `app-routing.module.ts`, `app.component.html` y `app.module.ts`, conservando tanto la funcionalidad existente del equipo como la nueva funcionalidad de la Actividad 3.

7. **Verifiqué la integración.** Después de resolver los conflictos, ejecuté `ng build` y comprobé que la aplicación compilara correctamente. Finalmente, los cambios fueron registrados mediante Git y enviados al repositorio del equipo.

**Estructura**


```text
src/
└── app/
    ├── components/
    │   ├── inicio/
    │   │   ├── inicio.css
    │   │   ├── inicio.html
    │   │   ├── inicio.spec.ts
    │   │   └── inicio.ts
    │   │
    │   └── solicitud-form/
    │       ├── solicitud-form.css
    │       ├── solicitud-form.html
    │       ├── solicitud-form.spec.ts
    │       └── solicitud-form.ts
    │
    ├── app-routing.module.ts
    ├── app.component.html
    └── app.module.ts
```

**Pasos a seguir**

Creé SolicitudFormComponent para separar la funcionalidad del registro de solicitudes del componente principal y mantener una estructura modular.
Utilicé FormBuilder y Validators para construir el formulario reactivo y centralizar sus reglas de validación.
Validé los campos obligatorios mediante Validators.required, evitando que el usuario pueda enviar un formulario incompleto.
Validé el correo electrónico mediante Validators.email, mostrando un mensaje específico cuando el formato ingresado no es válido.
Validé la descripción mediante Validators.minLength(10), estableciendo un mínimo de 10 caracteres.
Utilicé markAllAsTouched() cuando el formulario es inválido para mostrar las validaciones pendientes después de intentar registrarlo.
Implementé InicioComponent como punto de entrada de la aplicación para orientar al usuario hacia el registro de una nueva solicitud.
Configuré RouterModule para permitir la navegación entre la página de inicio y el formulario.
Utilicé routerLink para realizar la navegación entre las vistas sin necesidad de recargar la aplicación.
Mantuve router-outlet en app.component.html para que Angular pueda renderizar los componentes correspondientes según la ruta seleccionada.
Conservé ListaSolicitudesComponent y SolicitudService, que ya formaban parte del trabajo del equipo, al resolver los conflictos de integración.

**Problemas que encontré y cómo los resolví**

Error con la sintaxis @if. El proyecto utiliza Angular 16 y la plantilla con @if generaba errores de compilación. Reemplacé esta sintaxis por *ngIf, compatible con la versión utilizada.
El componente principal mostraba contenido del proyecto inicial. Reemplacé el contenido de app.component.html por <router-outlet></router-outlet> y posteriormente integré nuevamente el componente ListaSolicitudesComponent existente del equipo.


### Actividad 4: Consumo de una API REST con HttpClient

**Responsable:** Angel Vargas

**Cómo lo trabajé**

1. **Habilité HttpClient.** Importé `HttpClientModule` en `app.module.ts`, que es lo que permite hacer peticiones HTTP en toda la aplicación.
2. **Creé un servicio dedicado.** Generé `SolicitudApiService` para que toda la lógica de acceso a datos viviera ahí y no dentro del componente, manteniendo la vista desacoplada de la fuente de datos.
3. **Elegí una API pública de práctica.** Usé JSONPlaceholder (`/users`), que es gratuita y no requiere registro ni credenciales, cumpliendo la indicación de no publicar tokens ni accesos.
4. **Adapté la respuesta a nuestro modelo.** La API devuelve datos genéricos, así que con el operador `map` de RxJS transformé cada registro en una `Solicitud` de nuestro modelo, para que la tabla fuera coherente con el resto de la app (ID, Estudiante, Tipo, Estado).
5. **Creé el componente y la vista.** `SolicitudesRemotasComponent` se suscribe al servicio y muestra los datos en una tabla, con estados de "cargando" y "error" y un botón **Recargar**. Agregué la ruta `/externas` y un enlace desde el Inicio.
6. **Verifiqué la compilación** con `tsc --noEmit`, sin errores.

**Estructura**

```
src/app/
├── models/
│   └── solicitud-api.model.ts            (forma "cruda" que devuelve la API)
├── services/
│   └── solicitud-api.service.ts          (HttpClient + mapeo al modelo Solicitud)
└── components/
    └── solicitudes-remotas/
        ├── solicitudes-remotas.component.ts
        ├── solicitudes-remotas.component.html
        └── solicitudes-remotas.component.css
```

**Qué hice y por qué**

- **Puse el `HttpClient` dentro de un servicio** que devuelve un `Observable<Solicitud[]>`. El componente solo se suscribe; la vista no sabe de dónde vienen los datos.
- **Mapée la respuesta al modelo del caso.** Con `map` de RxJS convierto cada usuario de la API en una `Solicitud` (con su estudiante, tipo y estado). Así reutilizo el mismo modelo tipado de la Actividad 1 y la información tiene sentido dentro del dominio del proyecto.
- **Manejé los estados de la petición.** Uso banderas `cargando` y `error` para dar retroalimentación en la vista mientras llega la respuesta o si algo falla.
- **No implementé backend.** Solo *consumo* una API que ya existe; no creo un servidor Node.js, porque ese contenido corresponde a las sesiones 5 a 7.

**Problemas que encontré y cómo los resolví**

- **La tabla mostraba datos genéricos** (id, userId, título) que no cuadraban con lo que veníamos trabajando (ID, estudiante, tipo, estado). Lo resolví mapeando la respuesta de la API a nuestro modelo `Solicitud`, así las columnas quedaron coherentes con el resto de la aplicación.

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

Las capturas de la Actividad 4 (integración y respuesta de la API) y del resto del proyecto están guardadas en la carpeta [`evidencias/`](evidencias); haz clic para verlas.

## Matriz de participación

| Integrante | Desarrollo | Pruebas | Documentación | Exposición | Evidencia de participación |
|---|---|---|---|---|---|
| [Ayrton Mihail Palomino Loli] | [Alta] | [Alta] | [Alta] | [Sí] | [Commits, información en el READ.md] |
| [Joseph Mathios Labra Espinal] | [Alta] | [Alta] | [Alta] | [Si] | [Commits, información en el READ.md] |
| [Roy Giovanni Quiroz Morales] | [Alta] | [Alta] | [Alta] | [Sí] | [Commits, informaciòn en el READ.md] |
| [Angel Jesús Vargas Manrique] | [Alta] | [Alta] | [Alta] | [Sí] | [Creación del proyecto, commits, informacion en el READ.md] |

## Conclusiones

**Actividad 1:** definir los tipos antes de construir los componentes evita errores de datos y hace que el código sea más fácil de mantener. Los union types y el modo estricto permiten detectar valores inválidos en compilación, y la separación en `models` y `utils` deja lógica reutilizable para el formulario y el consumo de la API.

**Actividad 2:** Separar la provisión de datos usando un servicio con inyección de dependencias (`@Injectable`) mantuvo nuestro componente visual limpio y fácil de leer. Además, aplicar directivas estructurales tradicionales como `*ngFor` y el `data binding` nos permitió generar una interfaz dinámica y escalable de forma muy rápida, aplicando directamente las buenas prácticas de arquitectura de componentes vistas en clase.

**La Actividad 3:** permitió implementar un formulario reactivo en Angular con validaciones para controlar el ingreso de datos y configurar la navegación entre las vistas de la plataforma de gestión de solicitudes académicas, verificando además mediante `ng build` que la aplicación compilara correctamente.

**Actividad 4:** consumir una API REST desde un servicio con `HttpClient` mantiene la vista desacoplada del origen de los datos, y transformar la respuesta al modelo `Solicitud` demuestra cómo adaptar datos externos al dominio del proyecto sin necesidad de un backend propio.

[AGREGAR CONCLUSIONES GENERALES DEL EQUIPO Y LA RELACIÓN CON LOS CONTENIDOS DE LAS SESIONES 1 A 4]

## Video de exposición

**Video público de YouTube:** https://www.youtube.com/watch?v=ujwH_prod1A
