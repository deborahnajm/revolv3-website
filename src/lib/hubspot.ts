/* ============================================================
   HubSpot Forms integration
   Posts the contact form to the HubSpot Forms Submission API v3:
   https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}

   This is the browser-native path (CORS-enabled, no backend, no secret
   token). The Portal ID is public. The Form GUID comes from the HubSpot
   form you create — set it via VITE_HUBSPOT_FORM_GUID at build time.
   ============================================================ */

// Revolv3 HubSpot account (Hub ID). Public value; safe to ship.
const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID ?? '22077173'
const FORM_GUID = import.meta.env.VITE_HUBSPOT_FORM_GUID ?? ''

export type ContactFields = {
  name: string
  email: string
  company: string
  volume?: string
  message?: string
}

/** True once a Form GUID is configured, so we submit for real. */
export function isHubSpotConfigured(): boolean {
  return Boolean(PORTAL_ID && FORM_GUID)
}

/** Read the HubSpot tracking cookie so submissions attribute to the visitor. */
function getHubSpotCookie(): string | undefined {
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)
  return match?.[1]
}

/**
 * Submit the contact form to HubSpot. Splits the single name field into
 * first/last, and folds the (custom) volume into the standard `message`
 * contact property so no custom property setup is required.
 */
export async function submitToHubSpot(fields: ContactFields): Promise<void> {
  if (!isHubSpotConfigured()) {
    throw new Error('HubSpot form is not configured (missing VITE_HUBSPOT_FORM_GUID).')
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`

  const trimmed = fields.name.trim()
  const firstSpace = trimmed.indexOf(' ')
  const firstname = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace)
  const lastname = firstSpace === -1 ? '' : trimmed.slice(firstSpace + 1)

  const messageParts: string[] = []
  if (fields.volume) messageParts.push(`Annual card-not-present volume: ${fields.volume}`)
  if (fields.message) messageParts.push(fields.message)

  const formFields = [
    { name: 'firstname', value: firstname },
    { name: 'lastname', value: lastname },
    { name: 'email', value: fields.email },
    { name: 'company', value: fields.company },
    { name: 'message', value: messageParts.join('\n\n') },
  ].filter((f) => f.value)

  const hutk = getHubSpotCookie()

  const body = {
    fields: formFields,
    context: {
      pageUri: window.location.href,
      pageName: document.title,
      ...(hutk ? { hutk } : {}),
    },
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let detail = ''
    try {
      const data = await res.json()
      detail = data?.message || data?.errors?.[0]?.message || ''
    } catch {
      /* ignore parse errors */
    }
    throw new Error(detail || `HubSpot submission failed (HTTP ${res.status}).`)
  }
}
