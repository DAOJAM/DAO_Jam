import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

if (process.env.NODE === 'production') {
  Sentry.init({
    dsn: 'https://7029dd70a8c4479894f4eab180ddf976@o327345.ingest.sentry.io/5202355',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}
