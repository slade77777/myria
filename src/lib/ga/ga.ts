type EventParams = {
  event_category: string;
  event_label: string;
  value: string;
};
type Action = string;
const pageview = (url: string) => {
  (window as any).gtag('config', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`, {
    page_path: url
  });
};

const event = (action: Action, params: EventParams) => {
  (window as any).gtag('event', action, params);
};

export default {
  pageview,
  event
};
