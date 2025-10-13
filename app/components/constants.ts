const EMAIL_FROM = "hirahmat.dev@gmail.com";
const EMAIL_SUBJECT = encodeURIComponent("Hi Rahmat!");
const EMAIL_BODY = encodeURIComponent(
  "Halo Rahmat,\n\nSaya tertarik dengan portfoliomu di HiRahmat.Dev.\nBoleh ngobrol sebentar?"
);

export const EMAIL_HREF = `mailto:${EMAIL_FROM}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;
