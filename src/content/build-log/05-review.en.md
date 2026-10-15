---
title: Revised after an external review
stage: Review
order: 5
---

Once the site was live, I asked another AI to review it. I checked each of its five findings against the code before fixing anything, and recorded the fixes as a new OpenSpec change (`refine-content-after-review`):

- **The canonical address** still pointed at the old Vercel URL after the domain moved to `yantogio.vercel.app`. The fix was one line of configuration.
- **The CV download button** had never appeared. There is now a public CV generated from an HTML source in the repository, without my phone number or personal details. The automated privacy check now reads the PDF's text as well.
- **My internship** at PT Denso is now stated in the first sentence, instead of only becoming clear further down.
- **Technical terms on the homepage** were replaced with plainer language. Figures such as the assertion count stay on the case-study pages for technical readers.
- **The skill categories** were regrouped into five areas that follow my CV, so ORMs are no longer mixed in with testing tools.

One suggestion I did not take: splitting skills into "daily use" and "used before". Self-assessed proficiency labels easily backfire in interviews. Each area still points to one project as proof.
