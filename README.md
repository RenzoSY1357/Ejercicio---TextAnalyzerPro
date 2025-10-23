## 🚀 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)

## 📦 Instalación

1. **Clona o descarga el proyecto**

```bash
git clone <url-del-repositorio>
cd TextAnalyzerPro
```

2. **Instala las dependencias**

```bash
npm install
```

## 🏃 Cómo Ejecutar el Proyecto

### Compilar TypeScript a JavaScript

1. **Compila el código TypeScript:**

```bash
npx tsc
```

Esto generará los archivos JavaScript en la carpeta `dist/`.

2. **Abre el archivo HTML en tu navegador:**

```bash
# En Linux/Mac
open src/UI/index.html

# En Windows
start src/UI/index.html
```

O simplemente instala Live Server (si no lo tienes).

## 🧪 Ejecutar Tests

El proyecto incluye tests unitarios con Jest:

```bash
npm test
```

Para ejecutar tests en modo watch:

```bash
npm test -- --watch
```

## 📖 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecuta los tests con Jest |
| `npx tsc` | Compila TypeScript a JavaScript |
| `npx tsc --watch` | Compila en modo observador (detecta cambios) |

## 🔧 Configuración

### TypeScript

La configuración de TypeScript está en `tsconfig.json`:
- **Entrada**: `src/`
- **Salida**: `dist/`
- **Módulos**: ES2020
- **Target**: ESNext
- **Source Maps**: Habilitados

### Jest

La configuración de Jest está en `jest.config.js`:
- Preset: `ts-jest`
- Entorno: `node`
- Cobertura: Habilitada para `src/modules/`



