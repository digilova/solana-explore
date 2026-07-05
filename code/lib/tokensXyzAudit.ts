export const TOKENS_XYZ_AUDIT_IMAGE = "/audit/tokens-xyz-spacex.png";
export const TOKENS_XYZ_AUDIT_IMAGE_WIDTH = 2454;
export const TOKENS_XYZ_AUDIT_IMAGE_HEIGHT = 6866;
export const TOKENS_XYZ_AUDIT_2047_CROP_HEIGHT = 3888;
export const TOKENS_XYZ_AUDIT_CROPPED_VARIANTS_HEIGHT = 4897;
export const TOKENS_XYZ_AUDIT_PREVIOUS_HEIGHT = 6168;
export const TOKENS_XYZ_AUDIT_EXTENDED_HEIGHT = 5924;
export const TOKENS_XYZ_AUDIT_LEGACY_HEIGHT = 4308;

export type AuditAnnotation = {
  id: string;
  xPct: number;
  yPct: number;
  author: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export const AUDIT_STORAGE_KEY = "spacex-prototype-audit-annotations";
export const AUDIT_STORAGE_VERSION_KEY = "spacex-prototype-audit-annotations-version";
export const AUDIT_EXTENDED_STORAGE_VERSION = "extended-canvas-v2";
export const AUDIT_PREVIOUS_STORAGE_VERSION = "live-fullpage-v3";
export const AUDIT_CROPPED_VARIANTS_STORAGE_VERSION = "live-cropped-variants-v4";
export const AUDIT_2047_CROP_STORAGE_VERSION = "live-2047-crop-v5";
export const AUDIT_PROVIDED_FULLPAGE_STORAGE_VERSION = "provided-fullpage-v6";
export const AUDIT_STORAGE_VERSION = "provided-fullpage-seeded-v7";
export const AUDIT_READ_ONLY = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_AUDIT_READ_ONLY === "true";

export const SEED_AUDIT_ANNOTATIONS: AuditAnnotation[] = [
  {
    "id": "audit-promoted-1",
    "xPct": 11.793,
    "yPct": 5.743,
    "author": "Diana",
    "text": "SpaceX is a aggregate page, but we only surface one variant.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-2",
    "xPct": 42.07,
    "yPct": 13.601,
    "author": "Diana",
    "text": "Need to confirm how critical this chart for institutional users. The chart dominates the first screen. Useful for traders, but it pushes issuer, access, backing, and market-structure clarity below the fold.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-3",
    "xPct": 4.114,
    "yPct": 36.363,
    "author": "Diana",
    "text": "Variants appear in multiple places without one canonical comparison surface. Users have to reconstruct which ticker maps to which issuer and access model.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-4",
    "xPct": 2.615,
    "yPct": 39.273,
    "author": "Diana",
    "text": "Market rows are action-oriented, but the page needs more pre-trade context before sending users out to venues: issuer, liquidity concentration, and restrictions.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-5",
    "xPct": 18.482,
    "yPct": 6.11,
    "author": "Diana",
    "text": "Variants are shown three times on this page. On click we can see all 5 variants. Below shown in the markets, and in the unique section below. Feels repetitive and not intentional",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-6",
    "xPct": 16.203,
    "yPct": 4.682,
    "author": "Diana",
    "text": "The verification here is missleading because it is specific to SPCX.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-7",
    "xPct": 88.136,
    "yPct": 12.631,
    "author": "Diana",
    "text": "This module is specific to only spcx, again, misleading.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-8",
    "xPct": 64.669,
    "yPct": 5.618,
    "author": "Diana",
    "text": "this search icon contains links to explorer and orb, which is not clear and not intuitive",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-9",
    "xPct": 62.344,
    "yPct": 36.552,
    "author": "Diana",
    "text": "\"View 9 more\" link takes you to a separate tokens page, with a list of all markets and more details in the table. Besides that there is really no additional details. What is we explore sharing details in the table.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-10",
    "xPct": 14.097,
    "yPct": 36.014,
    "author": "Diana",
    "text": "Ticker is not helpful in this case, issuer name and full title is more helpful, but not vissible",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-11",
    "xPct": 6.725,
    "yPct": 31.307,
    "author": "Diana",
    "text": "Price is a repetitive data here, and also does not match the price in the line chart above. Most likely either calculates aggregation differently or pulling form a different data source.",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-12",
    "xPct": 24.222,
    "yPct": 30.728,
    "author": "Diana",
    "text": "Same as the price, the price change is repetitive and does not match the top number",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T21:29:06.657Z"
  },
  {
    "id": "audit-promoted-13",
    "xPct": 20.739,
    "yPct": 77.7,
    "author": "Diana",
    "text": "this is repetitive and not useful, you cannot read the variant name",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T22:08:00.000Z"
  },
  {
    "id": "audit-promoted-14",
    "xPct": 7.79,
    "yPct": 62.624,
    "author": "Diana",
    "text": "displaying tickers and venue image together is confusing",
    "createdAt": "2026-07-05T12:00:00.000Z",
    "updatedAt": "2026-07-05T22:08:00.000Z"
  }
];

export function cloneSeedAuditAnnotations() {
  return SEED_AUDIT_ANNOTATIONS.map((annotation) => ({ ...annotation }));
}
