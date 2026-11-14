# Adventure Escape SA – Mobile App

React Native (Expo SDK 58) with TypeScript. This is the mobile app for the Adventure Escape SA website, built for WIL Task 3 (XHAW5112). It has the same activities, discount rules and form validation as the website.

**Client:** Liam Daniels, Adventure Escape SA, Cape Town, Western Cape
**Student:** Itumeleng Joan Ndlovu 
**Group:** Escape Crew – Rayan Bvulani (team leader), Itumeleng Ndlovu (team secretary), Asukia Ebuta (designer and researcher)
**Repository:** https://github.com/Tumi87/ADVENTUREESCAPECREWPOE

## Requirements
- Node.js 22.13 or newer
- The SDK 58 version of Expo Go on your phone (or a development build)
- The phone and the computer on the same Wi-Fi network

## Run it
1. Unzip the project and open a terminal in the `AdventureEscapeTS` folder.
2. If you are upgrading from an older zip, delete `node_modules` and any lock file first.
3. `npm install`
4. `npx expo install --fix` (sets every package to the version SDK 58 expects)
5. `npm run typecheck` (checks the TypeScript; it should finish with no errors)
6. `npx expo start`, then scan the QR code with Expo Go.

## Screens (13)
| Screen | What it does |
|---|---|
| Splash | Logo, Cape Town photo and tagline. "Explore adventures" goes to Home as a guest; "Already have an account? Log in" goes to Login. It does not move on by itself. |
| Login | Email and password with validation, "Remember me" checkbox, or continue as guest. |
| Home | Hero image, four adventure packages, three individual activities, a table of the discount tiers and a "Why choose us?" section. |
| About Us | History, vision, mission, goals and values. |
| Overview | Search box, All / Packages / Individual Activities filter and a Sort by drop-down over the seven products. |
| Adventure detail | Photo, what is included, a booking date field with validation, Book now, Add to quote, Save and Share. |
| Fees | Checkbox selection stored in an array, subtotal, discount, 15% VAT and total, plus name, phone and email validation and Request Quote. |
| Get a Quote | The saved selection in tables, discount rules and remove buttons. |
| Payment | Order summary and a card form with validation. This is a demo and takes no money. |
| Reviews | List of reviews (sample text at the moment). |
| Map and directions | Venue drop-down with Get directions and Open in Maps (opens Google Maps). |
| Contact | Form with a package drop-down, business information table and meeting points table. |
| Account | Login status, saved adventures and shortcuts. |

Navigation: the bottom bar has Home, About, Overview, Fees and Contact. The header has quick buttons to call, WhatsApp and open the account. A strip of six photos shows on every screen except the splash (`src/components/PhotoStrip.tsx`). The Android back button returns to the previous screen.

## Discount rules
| Bookings | Discount |
|---|---|
| One | None |
| Two | 5% |
| Three | 10% |
| More than three | 15% |

Total = (subtotal − discount) + 15% VAT. Every fee is a quoted fee only, not a formal invoice.

## Products
Packages (R1500): Ultimate Adventure Day, Family Explorer Package, Mountain Adventure Package, Corporate Team Challenge.
Individual activities (R750): Ziplining Adventure, Kayaking Experience, Rock Climbing Session.

## Validation and error handling
- Name: letters, spaces, hyphens and apostrophes only
- Email: must be a valid address
- Phone: South African number starting with +27 or 0
- Password: at least 6 characters
- Booking date: a real date, written YYYY-MM-DD, today or later
- Contact message: at least 5 characters, and a package must be chosen
- Card number: 16 digits; expiry MM/YY and not in the past; CVV 3 or 4 digits
- Fees: at least one activity must be selected

Errors show in red under the field, and the form is not sent until every field is correct.

## Project structure
```
AdventureEscapeTS/
  App.tsx                 navigation, header, bottom bar
  index.ts                entry point
  app.json                Expo settings
  assets/                 photos, logo.jpg, cape_town.jpg
  src/
    data.ts               the seven adventures, business details, discount table
    utils.ts              validation, discount and fee calculation
    types.ts              TypeScript types
    theme.ts              colours (forest green, burnt orange, sand beige)
    context/QuoteContext.tsx   quote, saved items, reviews and login state
    components/           Button, Field, Dropdown, SimpleTable, AdventureCard, Header, BottomNav, PhotoStrip
    screens/              the 13 screens
```

## Brand
Colours: forest green #2D5A3D, burnt orange #B9531F, sand beige #F5E6DA. Logo: the group's chosen design (mountain, orange sun and dotted ring). Tagline: Explore. Discover. Thrive.


## Notes and limits
- Login is a demo. Any valid email and a password of six or more characters is accepted, and "Remember me" is not stored.
- - Quote, saved adventures and login are kept in memory only, so they reset when the app closes.
- Reviews are sample text and should be replaced with real ones.
- Payment is a demo and no card details are sent or stored.
- The map screen opens Google Maps in another app; it is not an embedded map.
- The Cape Town photo on the splash was cropped from the design screenshot. Replace `assets/cape_town.jpg` with the original photo (same file name) for a sharper image.

## Images

<img width="561" height="1280" alt="2" src="https://github.com/user-attachments/assets/97d26e6a-ea67-4ddd-84ca-a168a5f5392f" />

<img width="561" height="1280" alt="FC" src="https://github.com/user-attachments/assets/a3a27856-9692-49ba-b453-a62b85881ee8" />
<img width="561" height="1280" alt="NJK" src="https://github.com/user-attachments/assets/fbaf4f23-673e-4847-b5a3-01957187422c" />
<img width="561" height="1280" alt="WhatsApp Image 2026-11-14 at 15 13 01 (1)" src="https://github.com/user-attachments/assets/109abb63-40d0-4405-9c60-2c53e3819837" />
<img width="561" height="1280" alt="CF" src="https://github.com/user-attachments/assets/d3962af6-b3b7-4f26-bb07-b147fed24a3a" />
<img width="561" height="1280" alt="6666" src="https://github.com/user-attachments/assets/69237fd2-224c-4938-a838-ee5769fc08e9" />
<img width="561" height="1280" alt="789" src="https://github.com/user-attachments/assets/ebe06fc2-34d4-45d6-afc8-e56e311f7725" />
<img width="561" height="1280" alt="333" src="https://github.com/user-attachments/assets/3bd51f7b-6706-4894-9a78-a05aba1e5970" />
<img width="561" height="1280" alt="97" src="https://github.com/user-attachments/assets/1af28af4-ff0f-4a65-992c-64f2ba281f77" />
<img width="561" height="1280" alt="66" src="https://github.com/user-attachments/assets/5c526fd8-7dc2-4a36-8270-44447ab831e5" />
<img width="561" height="1280" alt="33" src="https://github.com/user-attachments/assets/cfe2c2a6-c7c6-469a-a1d8-2bdbb86a1b95" />
<img width="561" height="1280" alt="32" src="https://github.com/user-attachments/assets/3fe12940-37fa-4eae-ba64-43284ad8d675" />
<img width="561" height="1280" alt="5" src="https://github.com/user-attachments/assets/5e6d995c-347c-470a-8a2e-df69f01607d6" />
<img width="561" height="1280" alt="4" src="https://github.com/user-attachments/assets/bf27b47e-fd59-48af-a4e4-1fc024fdfcf5" />

<img width="561" height="1280" alt="2" src="https://github.com/user-attachments/assets/758a02e8-18f6-4241-9c34-cc44235f246f" />


YouTube video mobile app :https://youtu.be/fzv_KS8eESc?si=HjTtNBWkeKlSPie2 
https://youtu.be/fzv_KS8eESc?si=HjTtNBWkeKlSPie2 

## Reference
Wande Cape Town, n.d. Cape Town Adventures, activities & attractions. Available at: https://wandercapetown.com/adventures/ [Accessed 1 September 2026]
Hawaii Adventure Centre, n.d. Discover Hawai’i’s best activities and adventures. Available at:https://www.hawaiiadventurecenter.com/?gad_source=1&gad_campaignid=23883170 858&gbraid=0AAAAAqbkpvcQX8_dZuhH36jpab6rpj6tq&gclid=Cj0KCQjwteTUBhD4ARIsAE Yjs3oYTgGRaDEDEHX5QoCF7BTG_Dg972x7XKDhv71RymbzcfEMu5qKTCIaAq7uEALw_wc B [Accessed 1 September 2026]
Lamaj,D., 2025. Low fidelity wireframes: what is it and how to create it. UX Pilot. Available at: https://uxpilot.ai/blogs/low-fidelity-wireframe [Accessed 1 September 2026]
Pinterest,nd. NorthStart mountains logo design. Available at: https://za.pinterest.com/pin/80572280836400033/ [ Accessed 4 September 2026]
Lovable,2026. Website navigation best practices for better UX. Available at: https://lovable.dev/guides/website-navigation-best-practices-that-convert [Accessed 4 September 2026]
Mapletree Studio, 2026. Responsive Design. Available at: https://mapletree.studio/glossary/responsive-design [ Accessed 4 September 2026]
ProfileTree,nd.ProfileTree digital marketing agency [Online]. Available at: https://profiletree.com/ [Accessed 3 September 2026].
Ochwani, J.,2025. Basic Principles of responsive web design.Octect Design Studio. Available at: https://octet.design/basic-principles-of-responsive-web-design [ Accessed 4 September 2026]
Laubheimer, P.,2024. Menu design checklist: 17 UX guidelines. Nielsen Norman Group. Available at: https://www.nngroup.com/articles/menu-design/ [Accessed 4 September 2026]
Jonremus,2019.Startup_tools.md: Curated directory of the best startup tools [GitHub Gist]. Available at: https://gist.github.com/Jonremus/9f267de65d1afec77af9a515322e8b3a [ Accessed 4 September 2026]

