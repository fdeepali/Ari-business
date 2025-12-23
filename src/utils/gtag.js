export const pageview = (url) => {
  if (window.gtag) {
    window.gtag("config", "G-VTYHZV7CH2", {
      page_path: url,
    });
  }
};