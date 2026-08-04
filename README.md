# @pipeworx/ticketmaster

[Ticketmaster Discovery v2](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) MCP — events, venues, attractions, classifications. Free Discovery key (5000 calls/day).

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Ticketmaster data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
