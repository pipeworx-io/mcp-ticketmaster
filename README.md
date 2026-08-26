# @pipeworx/ticketmaster

[Ticketmaster Discovery v2](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) MCP — events, venues, attractions, classifications. Free Discovery key (5000 calls/day).

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1476+ live data sources.

## Auth

- Platform: `PLATFORM_TICKETMASTER_KEY`. BYO: `?_apiKey=…`.

## Tools

- `event_search(keyword?, attractionId?, venueId?, postalCode?, latlong?, radius?, unit?, source?, locale?, marketId?, startDateTime?, endDateTime?, includeTBA?, includeTBD?, includeTest?, size?, page?, sort?, onsaleStartDateTime?, onsaleEndDateTime?, city?, countryCode?, stateCode?, classificationName?, classificationId?, dmaId?, localStartDateTime?, localStartEndDateTime?, segmentId?, segmentName?, includeFamily?)` — find events
- `event(id, locale?)` — single event
- `event_images(id)` — images for an event
- `attraction_search(keyword?, classificationName?, classificationId?, size?, page?, sort?, locale?, includeTest?)` — attractions
- `attraction(id, locale?)` — single attraction
- `venue_search(keyword?, latlong?, radius?, unit?, source?, locale?, marketId?, postalCode?, city?, countryCode?, stateCode?, size?, page?, sort?, includeTest?)` — venues
- `venue(id, locale?)` — single venue
- `classifications(keyword?, classificationName?, classificationId?, locale?, size?, page?, sort?, includeTest?)` — classifications
- `classification(id, locale?)` — single classification
- `suggest(keyword, size?, locale?, latlong?, radius?, unit?, source?, includeTBA?, includeTBD?, includeTest?, segmentId?, classificationId?)` — autocomplete

## Data source

`https://app.ticketmaster.com/discovery/v2`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "ticketmaster": {
      "url": "https://gateway.pipeworx.io/ticketmaster/mcp"
    }
  }
}
```

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/ticketmaster/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1476+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Ticketmaster data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
