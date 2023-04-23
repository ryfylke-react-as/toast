// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lightCodeTheme = require("prism-react-renderer/themes/github");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Toast",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://toast.ryfylke.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ryfylke-react-as", // Usually your GitHub org/user name.
  projectName: "toast", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/ryfylke-react-as/toast/tree/master/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  noIndex: true,
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "@ryfylke-react/toast",
        logo: {
          alt: "Ryfylke React AS Logo",
          src: "img/logo.png",
        },
        items: [
          {
            href: "https://github.com/imp-dance/toast",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Intro",
                to: "/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/ryfylke-react-as/toast",
              },
            ],
          },
        ],
        copyright: `MIT License`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
