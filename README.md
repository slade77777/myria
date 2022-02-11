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
