## Getting Started

First, run the development server:

```bash
yarn
yarn dev
```

# Workflow for i18n

## For developers

### Implement a new feature

- Implement the feature
- Add `<Trans></Trans>` or `t` for new texts
- Finish the feature, create PR to `staging` branch

For usages, find out more here: https://lingui.js.org/tutorials/react-patterns.html

- That's all

**Note**: Use `Trans, t` from `@lingui/macro`, not `@lingui/react`

### Update content for an existing feature

- Only change the text
- Create PR to `staging` branch

## For staging maintainers

- Merge `staging` to `i18n` branch
- Run `yarn sync` to sync all new translation keys
- Request translators to translate new messages
- Once translation are done, run `yarn sync` again to sync new translation messages
- Create PR to `staging`

--

- After a period, run `yarn sync-and-purge` to remove unused keys on staging (translation.io)

## For translator

- Access translation.io after receiving request from devs
- Filter all untranslated messages
- Translate all those messages
- Inform devs after done

## To add new locales

- Add a new locale on translation.io
- Copy settings to the file config (lingui) in code
- Run `yarn sync`

# Convention

## Structure

- Put all components in `src/components` with PascalCase name, e.g. `src/components/Button.tsx`
- If a component belongs to a specific page, put it in the respective page folder `src/components/[page]/[ComponentName]`, e.g. `src/components/home/Hero.tsx`
- If a component has many small separate components/utils, put them in a folder `src/components/[ComponentName]/[ComponentName]`, e.g. `src/components/Header/Header.tsx` and export it in `src/components/Header/index.tsx`

## Images

- Put images in its respective page folder with kebab-case name `public/images/[page]/[image-name]`, e.g. `src/images/home/header-bg.png`
- If an image need an optimized format, optimize it and name it into `[image-name]_op.[ext]`, e.g. `src/images/home/header-bg_op.png`

## Styling

- Use tailwindcss for all cases, except some edge case
- Refer to tailwindcss documentation for more information, checkout tailwind.config.js for some advanced usage

## Common components

- If we need a special common component, like Modal, rewrite it using `radix-ui`, refer to `src/components/Collapse.tsx` component as an example

- Define the className of those components in `tailwind.config.js`, if that component using animation, remember whitelist all those animation classes

## Icons

- Export svg from the design, and create a React component for it, put it in `src/components/icons/[Name]Icon.tsx`

- Remember remove `width`, `height` and fill color with `currentColor`, refer to `src/components/icons/ArrowDownIcon.tsx` and its usage as an example, then the parent container must define `width`, `height` and `color` to use it

## Node test accounts

- User wallet:
  public key: `0x4adBbf279113e52A0368eeF6B3B00432125Cf8b0`
  private key: `af6a44d6e29c3aaedae688d4a4f8c8ae7564b5750203684c42199098a2a2ad9c`

myria wallet:
public key: `0xC0C0403307D2a89ed4aae3Fa4bD32F518398C6C5`
private key: `7e1e49781b9fb7e52c861adbd156323b948ebfc71c705222fc06ed4b6f2bc73d`

# setup wallet and import test accounts:

- import test accounts into your wallet
- change wallet network to ropsten

# test steps:

- select user wallet in metamask
- in node page, connect to user wallet
- purchase node
- check myria wallet balance
