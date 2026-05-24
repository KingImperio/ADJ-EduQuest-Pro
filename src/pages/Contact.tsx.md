# Contact.tsx - Archived

## Original File Analysis

### Structure
1. **Imports**: React, Router, Framer Motion, Icon, MarketingHeader/Footer, AnimatedGradientBackground
2. **Interface**: ContactInfo with icon, title, details[]
3. **Data**: contactInfo array (Email, Phone, Office)
4. **State**: formData (name, email, subject, message), isSubmitting, isSubmitted
5. **Sections**:
   - Hero: "Get in Touch" with gradient text
   - Contact Info: 3 cards + Business Hours + Social Links
   - Contact Form: 2-column layout with inputs
   - FAQ Link: CTA to FAQ page

### Styling Issues Found
- `text-secondary` used 8 times → should be `text-text-secondary`
- `text-primary` used for headings/text 6 times → should be `text-text-primary`
- Missing `relative z-10` on main content sections causing layering issues

### Color Scheme
- Background: `bg-deep` (#0F1117)
- Surface cards: `bg-surface` (#141827)
- Borders: `border-border` (#2A3354)
- Primary accent: `from-primary via-gold to-coral` gradients
- Text: `text-text-primary` (#F0F2FF), `text-text-secondary` (#9AA3C4)

### Archive Date: April 24, 2026
### Reason: Replacing with fixed version using correct Tailwind classes
