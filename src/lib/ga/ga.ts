type Action = 'Click';
type EventCategory = 'Link' | 'Button' | 'Banner';
type EventParams = {
  event_category: EventCategory;
  event_label: string;
  value: string;
};

const gtag = typeof window === 'object' && typeof (window as any).gtag === 'function' ? (window as any).gtag : () => null

const pageview = (url: string) => {
  gtag('config', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`, {
    page_path: url
  });
};

const event = (action: Action, params: EventParams) => {
  gtag('event', action, params);
};

const eventGA4 = (eventName: string, params: any) => {
  gtag('event', eventName, params);
};

export default {
  pageview,
  eventGA4,
  event
};
