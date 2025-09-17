# Moon UI

Moon is a multy-layered, scalable, customizable, and adaptable Design System.

Moon UI represents the first two layers of the Moon Design System and is designed to be a standalone, cross-browser, and framework-agnostic solution.

The first layer consists of cross-referenced primitive, semantic, and component CSS variables. This layer is synchronized with Figma variables, allowing you to fetch the latest design tokens in just a few minutes.

The second layer provides a collection of component CSS classes. It fully describes all components in the Moon Design System, including all available sizes and variations.

## Usage

### Command Line Options

```bash
# Basic usage - generates core CSS only
npx @heathmont/moon-ui

# Generate both core and component CSS
npx @heathmont/moon-ui --add-components

# Use custom CSS class prefix
npx @heathmont/moon-ui --customPrefix your-prefix

# Customize project name (default: 'moon')
npx @heathmont/moon-ui --projectName your-project

# Specify output directory (default: 'dist')
npx @heathmont/moon-ui --outputFolder output-folder

# Use custom Figma file IDs
npx @heathmont/moon-ui --coreFileId CORE_FILE_ID --componentsFileId COMPONENTS_FILE_ID

# Generate vanilla CSS files instead of Tailwind CSS v4 (default: 'tailwindcss')
npx @heathmont/moon-ui --target css

# Generate vanilla CSS files with browser CSS reset. Not needed with tailwindcss target
npx @heathmont/moon-ui --target css --preflight
```

### Configuration File

If you need to customize default Moon core and components styling, add a `FIGMA_TOKEN` variable to your `.env` file and include this file in `.gitignore`:

```bash
FIGMA_TOKEN=YOUR_FIGMA_PERSONAL_ACCESS_TOKEN
```

The Moon UI library automatically creates a `moonconfig.json` file with default values if one doesn't exist. You can also create or modify this file manually:

```json
{
  "projectName": "PROJECT_NAME",
  "coreFileId": "CORE_FILE_ID",
  "componentsProjectId": "COMPONENTS_PROJECT_ID",
  "outputFolder": "OUTPUT_FOLDER",
  "customPrefix": "",
  "target": "tailwindcss",
  "preflight": false,
  "themes": {}
}
```

#### Multi-theme Support

For additional themes, add theme names and their corresponding Figma file IDs to the `themes` object:

```json
{
  "themes": {
    "theme1": "THEME_1_CORE_FILE_ID",
    "theme2": "THEME_2_CORE_FILE_ID"
  }
}
```

## CSS Output Targets

Moon UI supports two output formats:

### TailwindCSS v4 (Default)

Generates CSS compatible with TailwindCSS v4 using `@theme inline` directives:

### Vanilla CSS

Generates standard CSS using `:root` selectors for maximum compatibility:

```bash
npx @heathmont/moon-ui --target css
```

**Note**: With vanilla CSS output, you'll retain typography and shadow utility classes, but some Tailwind-specific utility classes will not be generated.

## Component Class Prefixes

By default, all component classes use the `moon-` prefix:

```css
.moon-button {
  /* styles */
}
.moon-tooltip {
  /* styles */
}
```

Enable custom prefixes using `--customPrefix` to use your own prefix:

```bash
npx @heathmont/moon-ui --add-components --customPrefix your-prefix
```

This generates:

```css
.your-prefix-button {
  /* styles */
}
.your-prefix-tooltip {
  /* styles */
}
```

## Generated Files

The following files are created in your specified output directory:

- **`{projectName}-core.css`** - Core CSS variables and utilities
- **`{projectName}-components.css`** - Component classes (when `--add-components` is used)
- **`{projectName}-preflight.css`** - CSS reset (when `--preflight` is used)
- **`{themeName}-core.css`** - Theme-specific CSS files (one per theme in config)

## License

MIT

## Versioning

Moon UI follows [Semantic Versioning](https://semver.org/). View available versions in the [repository tags](https://github.com/coingaming/moon-ui/tags).

- **MAJOR**: Incompatible API changes
- **MINOR**: New backward-compatible functionality
- **PATCH**: Backward-compatible bug fixes
