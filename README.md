# Moon UI

A UI library for generating core and component CSS files from Figma design tokens.

## Usage

### Command Line

Run the tool directly using npx:

```bash
# Basic usage - generates core CSS
npx @heathmont/moon-ui

# Generate both core and components CSS
npx @heathmont/moon-ui --add-components

# Customize project name
npx @heathmont/moon-ui --projectName project-name

# Specify output directory
npx @heathmont/moon-ui --outputFolder output-folder

# Use custom Figma file IDs
npx @heathmont/moon-ui --coreFileId CORE_FILE_ID --componentsFileId COMPONENTS_FILE_ID
```

### Configuration

The tool will create a `moon.config.json` file with default values if one doesn't exist already. You also can create or modify a `moon.config.json` file in your project root if needed:

```json
{
  "projectName": "PROJECT_NAME",
  "coreFileId": "CORE_FILE_ID",
  "componentsFileId": "COMPONENTS_FILE_ID",
  "themes": {
    "theme1": "THEME_1_CORE_FILE_ID",
    "theme2": "THEME_2_CORE_FILE_ID"
  },
  "outputFolder": "OUTPUT_FOLDER"
}
```

If you don't have additional themes, leave "theme" an empty object:

```json
{
  "projectName": "PROJECT_NAME",
  "coreFileId": "CORE_FILE_ID",
  "componentsFileId": "COMPONENTS_FILE_ID",
  "themes": {},
  "outputFolder": "OUTPUT_FOLDER"
}
```

## Output

The following files will be generated in your outputFolder directory:

- `{projectName}-core.css` - The main CSS file with variables and utilities
- `{projectName}-components.css` - Component classes (if `--add-components` is used)
- `{theme}-core.css` - One file for each theme defined in your config

## License

MIT

## Versioning

Moon UI follows [Semantic Versioning](https://semver.org/). For the versions available, see the [tags on this repository](https://github.com/coingaming/moon-ui/tags).

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backward compatible manner
- **PATCH** version for backward compatible bug fixes

### Contributing

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Create a new changeset
npm run changeset

# Update versions based on changesets
npm run version

# Publish new version
npm run release
```
