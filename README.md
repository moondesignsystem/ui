# Moon UI

A Moon UI library for generating core and component CSS files from Figma design tokens.

## Usage

### Command Line

Run the tool directly using npx:

```bash
# Basic usage - generates core CSS
npx moon-ui

# Generate both core and component CSS
npx moon-ui --with-components

# Customize project name
npx moon-ui --project custom-name

# Specify output directory
npx moon-ui --output build

# Use custom Figma file IDs
npx moon-ui --core YOUR_CORE_FIGMA_ID --components YOUR_COMPONENTS_FIGMA_ID
```

### Configuration

Create a `moon.config.json` file in your project root:

```json
{
  "project": "PROJECT_NAME",
  "core": "FIGMA_CORE_FILE_ID",
  "components": "FIGMA_COMPONENTS_FILE_ID",
  "themes": {
    "theme1": "FIGMA_THEME_1_CORE_FILE_ID",
    "theme2": "FIGMA_THEME_2_CORE_FILE_ID"
  },
  "output": "CSS_OUTPUT_FOLDER"
}
```

You can also generate a config file automatically using command-line arguments:

```bash
npx moon-ui --init --project custom-name --output build
```

The tool will create a `moon.config.json` file with default values if one doesn't exist already.

## Output

The following files will be generated in your output directory:

- `{project}-core.css` - The main CSS file with variables and utilities
- `{theme}-core.css` - One file for each theme defined in your config
- `{project}-components.css` - Component classes (if `--with-components` is used)

## License

MIT

## Versioning

Moon UI follows [Semantic Versioning](https://semver.org/). For the versions available, see the [tags on this repository](https://github.com/coingaming/moon-ui/tags).

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backward compatible manner
- **PATCH** version for backward compatible bug fixes
