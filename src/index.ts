interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Ticketmaster Discovery v2 MCP.
 */


const BASE = 'https://app.ticketmaster.com/discovery/v2';
const UA = 'pipeworx-mcp-ticketmaster/1.0 (+https://pipeworx.io)';

const passthrough = { type: 'object' as const, properties: {}, additionalProperties: true };

const tools: McpToolExport['tools'] = [
  { name: 'event_search', description: 'Find events.', inputSchema: passthrough },
  { name: 'event', description: 'Single event.', inputSchema: { type: 'object', properties: { id: { type: 'string' }, locale: { type: 'string' } }, required: ['id'] } },
  { name: 'event_images', description: 'Images for an event.', inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] } },
  { name: 'attraction_search', description: 'Attraction search.', inputSchema: passthrough },
  { name: 'attraction', description: 'Single attraction.', inputSchema: { type: 'object', properties: { id: { type: 'string' }, locale: { type: 'string' } }, required: ['id'] } },
  { name: 'venue_search', description: 'Venue search.', inputSchema: passthrough },
  { name: 'venue', description: 'Single venue.', inputSchema: { type: 'object', properties: { id: { type: 'string' }, locale: { type: 'string' } }, required: ['id'] } },
  { name: 'classifications', description: 'Classifications.', inputSchema: passthrough },
  { name: 'classification', description: 'Single classification.', inputSchema: { type: 'object', properties: { id: { type: 'string' }, locale: { type: 'string' } }, required: ['id'] } },
  { name: 'suggest', description: 'Autocomplete.', inputSchema: { type: 'object', properties: { keyword: { type: 'string' } }, required: ['keyword'], additionalProperties: true } },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const apiKey = (args._apiKey as string | undefined)?.trim();
  if (!apiKey) throw new Error('Ticketmaster requires an API key. Set PLATFORM_TICKETMASTER_KEY or pass ?_apiKey=… (free at https://developer.ticketmaster.com/user/me/apps).');
  const reqStr = (k: string, ex: string) => {
    const v = args[k];
    if (typeof v !== 'string' || !v.trim()) throw new Error(`Required argument "${k}" is missing. Pass a string like ${ex}.`);
    return v;
  };
  const get = async (path: string, params?: Record<string, unknown>) => {
    const p = new URLSearchParams({ apikey: apiKey });
    if (params) for (const [k, v] of Object.entries(params)) if (k !== '_apiKey' && v != null) p.set(k, String(v));
    const res = await fetch(`${BASE}${path}?${p}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (res.status === 401 || res.status === 403) throw new Error('Ticketmaster: invalid API key.');
    if (res.status === 429) throw new Error('Ticketmaster: 429 rate limit (free tier 5k/day, 5/sec).');
    if (!res.ok) throw new Error(`Ticketmaster: ${res.status}`);
    return res.json();
  };
  switch (name) {
    case 'event_search':
      return get('/events.json', args);
    case 'event':
      return get(`/events/${encodeURIComponent(reqStr('id', '"<id>"'))}.json`, { locale: args.locale });
    case 'event_images':
      return get(`/events/${encodeURIComponent(reqStr('id', '"<id>"'))}/images.json`);
    case 'attraction_search':
      return get('/attractions.json', args);
    case 'attraction':
      return get(`/attractions/${encodeURIComponent(reqStr('id', '"<id>"'))}.json`, { locale: args.locale });
    case 'venue_search':
      return get('/venues.json', args);
    case 'venue':
      return get(`/venues/${encodeURIComponent(reqStr('id', '"<id>"'))}.json`, { locale: args.locale });
    case 'classifications':
      return get('/classifications.json', args);
    case 'classification':
      return get(`/classifications/${encodeURIComponent(reqStr('id', '"<id>"'))}.json`, { locale: args.locale });
    case 'suggest':
      return get('/suggest.json', args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
