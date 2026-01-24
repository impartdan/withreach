# Figma Screenshot Workflow

## Quick Reference for Fetching Figma Design Screenshots

When the user asks to get a screenshot of a Figma component or wants to implement a design from Figma, use this workflow:

## Step-by-Step Process

### 1. Extract File Key and Node ID from URL

Given a Figma URL like:

```
https://www.figma.com/design/9A4ygFs0ji3BcELPeX9FhB/Reach-Website-Design?node-id=11482-10385&t=VHlI5KAhL8MYety7-4
```

Extract:

- **File Key**: `9A4ygFs0ji3BcELPeX9FhB` (part after `/design/` and before next `/`)
- **Node ID**: `11482:10385` (from `node-id=11482-10385`, replace `-` with `:`)

### 2. Get Figma Access Token

Read the token from `.env` file:

```bash
Look for FIGMA_ACCESS_TOKEN in .env
```

### 3. Fetch Image URL from Figma API

Use the Figma REST API to get the image URL:

```bash
curl -H "X-Figma-Token: {FIGMA_ACCESS_TOKEN}" \
  "https://api.figma.com/v1/images/{FILE_KEY}?ids={NODE_ID}&format=png&scale=2"
```

**Example:**

```bash
curl -H "X-Figma-Token: {FIGMA_ACCESS_TOKEN}" \
  "https://api.figma.com/v1/images/9A4ygFs0ji3BcELPeX9FhB?ids=11482:10385&format=png&scale=2"
```

**Response:**

```json
{
  "err": null,
  "images": {
    "11482:10385": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2d96adf5-159c-49e1-8433-0f5d6c795234"
  }
}
```

### 4. Download the Image

Download the image from the S3 URL returned by the API:

```bash
curl -o /Users/furlz/Sites/withreach/public/block-thumbnails/{component-name}.png \
  "{IMAGE_URL_FROM_RESPONSE}"
```

**Example:**

```bash
curl -o /Users/furlz/Sites/withreach/public/block-thumbnails/stats-block.png \
  "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2d96adf5-159c-49e1-8433-0f5d6c795234"
```

### 5. Use as Block Thumbnail

Add to the block config:

```typescript
export const MyBlock: Block = {
  slug: 'myBlock',
  interfaceName: 'MyBlock',
  imageURL: '/block-thumbnails/component-name.png',
  imageAltText: 'Description of the component design',
  // ... rest of config
}
```

## Important Notes

### Rate Limits

- If MCP Figma tools hit rate limits, use the direct REST API approach
- The REST API has separate rate limits from MCP tools

### File Naming

- Use kebab-case for thumbnail filenames
- Store in `/public/block-thumbnails/` directory
- Use `.png` format with `scale=2` for retina displays

### Node ID Format

- Figma URLs use hyphens: `node-id=11482-10385`
- Figma API uses colons: `11482:10385`
- Always convert hyphens to colons when calling the API

### Security

- Never commit the actual FIGMA_ACCESS_TOKEN to git
- Always read from `.env` file
- The token is stored in `.env` (gitignored), not `.env.example`

## Alternative: MCP Figma Tools

If MCP rate limits are not an issue, you can also use:

```typescript
// This may hit rate limits more quickly
CallMcpTool({
  server: 'user-Figma',
  toolName: 'get_screenshot',
  arguments: {
    fileKey: '9A4ygFs0ji3BcELPeX9FhB',
    nodeId: '11482:10385',
    clientLanguages: 'typescript,javascript',
    clientFrameworks: 'react,nextjs',
  },
})
```

**However**, direct API approach is more reliable when rate limits are hit.

## Troubleshooting

### Rate Limit Errors

If you see: `You've hit your rate limit`

- Switch to direct REST API approach (steps 2-4 above)
- This bypasses MCP server rate limits

### Authentication Errors

- Verify token in `.env` file exists
- Check token hasn't expired
- Ensure `X-Figma-Token` header is set correctly

### Invalid Node ID

- Ensure hyphen-to-colon conversion
- Verify node ID exists in the Figma file
- Try viewing the URL in a browser first

## Example Complete Workflow

```bash
# 1. Read token from .env
# FIGMA_ACCESS_TOKEN=figd_...

# 2. Get image URL
curl -H "X-Figma-Token: figd_..." \
  "https://api.figma.com/v1/images/9A4ygFs0ji3BcELPeX9FhB?ids=11482:10385&format=png&scale=2"

# 3. Extract URL from response and download
curl -o /Users/furlz/Sites/withreach/public/block-thumbnails/component.png \
  "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/..."

# 4. Read the image to view it
# Read tool on: /Users/furlz/Sites/withreach/public/block-thumbnails/component.png

# 5. Implement the design in code
# 6. Add imageURL to block config
```

## Summary

**Key Takeaway**: When Figma MCP tools hit rate limits, use the direct REST API with the token from `.env` to fetch design screenshots. This is the most reliable method for getting Figma designs into the project.
