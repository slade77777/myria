const pageview = (url: string) => {
  (window as any).gtag('config', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`, {
    page_path: url
  });
};

const eventGA4 = (eventName: string, params: any) => {
  (window as any).gtag('event', eventName, params);
};

export default {
  pageview,
  eventGA4
};
