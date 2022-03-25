type Action = 'Click';
type EventCategory = 'Link' | 'Button' | 'Banner';
type EventParams = {
  event_category: EventCategory;
  event_label: string;
  value: string;
};

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
