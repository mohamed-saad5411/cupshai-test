// ── Shai (Tip) Pricing System ─────────────────────────────────────
//
// Each creator sets a Koshari price (40–80 EGP, multiples of 10).
// The system auto-generates two higher tiers:
//
//   Koshari (كشري)  → chosen by creator (default: 40)
//   Zardaa (زردة)   → round_to_10(2 × Koshari + 20)
//   Barad (براد)    → round_to_10(2 × Zardaa)
//   Custom          → supporter picks any amount
//
// Examples:
//   Koshari=40  → Zardaa=100, Barad=200
//   Koshari=50  → Zardaa=120, Barad=240
//   Koshari=60  → Zardaa=140, Barad=280
//   Koshari=70  → Zardaa=160, Barad=320
//   Koshari=80  → Zardaa=180, Barad=360

export const SHAI_MIN = 40;
export const SHAI_MAX = 80;
export const SHAI_STEP = 10;
export const SHAI_DEFAULT = 40;

export type ShaiTier = {
  name: "koshari" | "zardaa" | "barad" | "custom";
  amount: number; // EGP (0 for custom — supporter defines)
};

function roundTo10(n: number): number {
  return Math.round(n / 10) * 10;
}

export function validateBasicShai(amount: number): { valid: boolean; error?: string } {
  if (!Number.isInteger(amount)) {
    return { valid: false, error: "Shai price must be a whole number" };
  }
  if (amount < SHAI_MIN || amount > SHAI_MAX) {
    return { valid: false, error: `Shai price must be between ${SHAI_MIN} and ${SHAI_MAX} EGP` };
  }
  if (amount % SHAI_STEP !== 0) {
    return { valid: false, error: `Shai price must be a multiple of ${SHAI_STEP}` };
  }
  return { valid: true };
}

export function calculateShaiTiers(basicAmount: number): ShaiTier[] {
  const zardaa = roundTo10(2 * basicAmount + 20);
  const barad = roundTo10(2 * zardaa);

  return [
    { name: "koshari", amount: basicAmount },
    { name: "zardaa", amount: zardaa },
    { name: "barad", amount: barad },
    { name: "custom", amount: 0 },
  ];
}

// All valid basic prices and their generated tiers (for reference/display)
export const VALID_BASIC_PRICES = [40, 50, 60, 70, 80] as const;
