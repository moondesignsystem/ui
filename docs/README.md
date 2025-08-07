# Moon UI Components - Storybook
Welcome to the Moon UI Components Storybook! This project showcases all the UI components of the Moon design system. Here, you'll find all the details you need to explore, use, and contribute to the components in the Moon UI library.

## Table of Contents
- [Introduction](#introduction)

- [Installation](#installation)

- [Running Storybook Locally](#running-storybook-locally)

- [Usage](#usage)

- [Deployment](#deployment)

- [Contributing](#contributing)

- [License](LICENSE.md)

## Introduction
Moon UI Components is a component library that provides a set of customizable, reusable UI components built to create beautiful, consistent user interfaces. The components are designed to integrate seamlessly with your React project and come with built-in support for accessibility.

This Storybook is the documentation for all components and features in the Moon UI library. You can interact with the components here and see how they behave in different scenarios.

## Installation
### Prerequisites
Ensure you have the following installed:

Node.js (v16 or higher)

npm or yarn

### Install Dependencies
Clone the repository:

```bash
git clone <repository-url>
cd moon-ui-components
```

### Install dependencies:

```bash
npm install
```

## Running Storybook Locally
To view the UI components and interact with them in a local Storybook instance:

### Start Storybook locally:

```bash
npm run storybook
```

This command will start the Storybook development server and open the Storybook UI in your default browser at http://localhost:6006.

### Build Storybook (optional):

If you'd like to generate a static build of Storybook (for deployment or static hosting):

```bash
npm run build-storybook
```
The build files will be generated in the storybook-static folder.

## Usage
### Available Components
In this Storybook, you'll find the following components documented:

| Component        | Description                                  |
| :--------------- | :------------------------------------------- |
| Accordion        | Expandable sections for content organization |
| Alert            | Notification messages                        |
| Authenticator    | Input field for authentication codes         |
| Avatar           | User profile image display                   |
| Badge            | Small status indicator                       |
| BottomSheet      | Slide-up modal panel                         |
| Breadcrumb       | Navigation path display                      |
| Button           | Clickable action button                      |
| Carousel         | Image/content slider                         |
| Checkbox         | Toggle option selection                      |
| Chip             | Small tag-like UI elements                   |
| CircularProgress | Loading indicator                            |
| Dialog           | Popup dialog box                             |
| Drawer           | Sidebar navigation or content panel          |
| Dropdown         | Menu-based selection component               |
| IconButton       | Button with an icon                          |
| Input            | Text input field                             |
| List             | List component                               |
| Loader           | General loading indicator                    |
| Menu             | Menu component                               |
| Pagination       | Page navigation controls                     |
| Placeholder      | Skeleton for holding place                   |
| Radio            | Radio button selection                       |
| Segmented Control| Tab-like component                           |
| Select           | Dropdown selection                           |
| Snackbar         | Temporary notification                       |
| Switch           | Toggle switch                                |
| TabList          | Tab-based navigation                         |
| Tag              | Label-style element                          |
| Textarea         | Multi-line text input                        |
| Tooltip          | Hover-triggered information display          |


Each component includes:

* Code examples.

* Live demos.

* Customization options and themes.

To view and test components, simply browse through the sections in the Storybook sidebar.

## Deployment  
The deployment process starts when a new tag is pushed.  

### Steps to start the process:  
- Ensure you are on the `main` branch.  
- Create a new tag. If you're unfamiliar with the process, refer to this [article](https://git-scm.com/book/en/v2/Git-Basics-Tagging).  
- Run the following command:  
  ```sh
  git push --tags
```
This will trigger the release job.

## Contributing
We welcome contributions! Here's how you can contribute to the Moon UI Components:

Fork the repository.

Create a branch for your feature (git checkout -b feature-name).

Commit your changes (git commit -am 'Add new feature').

Push to your branch (git push origin feature-name).

Create a pull request.

Please refer to the contributing guidelines for more information on how to make contributions.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

