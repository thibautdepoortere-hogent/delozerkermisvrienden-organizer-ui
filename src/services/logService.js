import * as Sentry from "@sentry/browser";

// Sentry.init({
//   dsn:
//     "https://73ef6f5909ce49e5bf703799d1587317@o387121.ingest.sentry.io/5255822",
// });

export function LogFoutmelding(foutmelding) {
  Sentry.captureMessage(foutmelding);
}

export function LogFout(error) {
  Sentry.captureException(error);
}

export function LogFoutUitComponentDidCatch(error, errorInfo) {
  Sentry.withScope((scope) => {
    scope.setExtras(errorInfo);
    const eventId = Sentry.captureException(error);
    this.setState({ eventId });
  });
}
