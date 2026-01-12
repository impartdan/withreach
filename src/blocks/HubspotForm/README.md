# HubSpot Form Block

This block allows you to embed HubSpot forms into your Payload CMS pages and posts.

## Setup

### 1. Environment Variables

Add the following environment variable to your `.env` file:

```bash
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id-here
```

**Finding your Portal ID:**
- Log in to your HubSpot account
- Click the settings icon in the top right
- In the left sidebar, navigate to **Account Setup** > **Account Defaults**
- Your Portal ID (also called Hub ID) will be displayed there

**Note:** The `NEXT_PUBLIC_` prefix is required because this variable needs to be accessible in the browser to load the HubSpot form script.

### 2. Finding Your Form ID

To embed a form, you'll need the Form ID:

1. In HubSpot, navigate to **Marketing** > **Forms**
2. Find the form you want to embed
3. Click on the form name to edit it
4. The Form ID is in the URL: `forms.hubspot.com/forms/{portal-id}/{form-id}`
5. Or click on **Share** > **Embed** and look for the `formId` parameter in the embed code

## Usage

### Adding a HubSpot Form to a Page

1. Edit a page in Payload CMS
2. In the **Content** tab, click **+ Add Block**
3. Select **HubSpot Form Block**
4. Enter the following information:
   - **HubSpot Form ID** (required): The ID of the form you want to embed
   - **HubSpot Portal ID** (optional): Override the default portal ID if needed
   - **Form Title** (optional): Display a title above the form

### Adding a HubSpot Form to a Post

HubSpot forms can also be embedded within blog post content:

1. Edit a post in Payload CMS
2. In the rich text editor, click the **+** button to add a block
3. Select **HubSpot Form Block**
4. Configure the form as described above

## Features

- **Automatic Script Loading**: The HubSpot forms script loads automatically when the component mounts
- **Error Handling**: Displays helpful error messages if the portal ID is missing or the form fails to load
- **Loading States**: Shows a loading indicator while the form is being fetched
- **Responsive Design**: Forms are styled to match your site's design system
- **Multiple Forms**: You can add multiple HubSpot forms to the same page
- **Custom Styling**: Includes custom CSS that matches your theme's design tokens

## Styling

HubSpot forms come with default styles, but this implementation includes custom CSS that integrates with your site's design system.

### Styling Options

1. **Use Default Custom Styles** (Recommended)
   - The block includes `hubspot-form.css` that matches your site's theme
   - Uses CSS variables for colors (`--primary`, `--border`, etc.)
   - Automatically applied to all HubSpot forms

2. **Disable HubSpot Default Styles**
   - In the block settings, check "Disable HubSpot Default Styles"
   - This gives you complete control over form styling
   - Useful if you want to write custom CSS from scratch

3. **Customize in HubSpot**
   - Edit the form in HubSpot → Style & Preview tab
   - Set colors, fonts, spacing in the form builder
   - These styles will override the default HubSpot styles

4. **Override with Custom CSS**
   - Edit `/src/blocks/HubspotForm/hubspot-form.css`
   - Target specific HubSpot classes:
     - `.hs-form` - Main form container
     - `.hs-input` - Input fields
     - `.hs-button` - Submit button
     - `.hs-error-msg` - Error messages
     - `.submitted-message` - Success message

### CSS Classes Reference

```css
.hs-form                    /* Form container */
.hs-form-field              /* Field wrapper */
.hs-input                   /* Input, textarea, select */
.hs-button                  /* Submit button */
.hs-error-msg               /* Error messages */
.hs-form-required           /* Required field indicator */
.submitted-message          /* Success message */
.hs-field-desc              /* Field descriptions */
```

## Troubleshooting

### Form Not Displaying

1. **Check Portal ID**: Make sure `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is set in your `.env` file
2. **Verify Form ID**: Double-check that you've entered the correct Form ID
3. **Form Status**: Ensure the form is published in HubSpot (not in draft mode)
4. **Browser Console**: Check the browser console for any error messages

### Styling Issues

The form inherits styles from your site's theme. You can customize the appearance by:
- Editing the form's style settings in HubSpot
- Adding custom CSS in your theme
- Modifying the component's wrapper classes in `Component.client.tsx`

## Security Notes

- The Portal ID is public and exposed in the client-side code
- Form submissions are handled securely by HubSpot
- No sensitive API keys are required for public forms
- If you need to restrict form access, configure permissions in HubSpot's form settings

## Additional Resources

- [HubSpot Forms API Documentation](https://developers.hubspot.com/docs/api/marketing/forms)
- [HubSpot Form Embed Code](https://knowledge.hubspot.com/forms/embed-a-form-on-an-external-page)
