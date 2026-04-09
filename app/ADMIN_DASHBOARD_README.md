# Admin Dashboard Documentation

## Overview

The Admin Dashboard is a complete, modern SaaS-style admin interface for managing all system data including packages, orders, customers, and settings. It follows a clean, responsive design with reusable components.

## Structure

```
app/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── packages/
│   │   │   └── page.tsx         # Package management
│   │   ├── orders/
│   │   │   └── page.tsx         # Order management
│   │   ├── customers/
│   │   │   └── page.tsx         # Customer management
│   │   └── settings/
│   │       └── page.tsx         # System settings
│   └── components/
│       └── admin/
│           ├── AdminLayout.tsx   # Main layout component
│           ├── DataTable.tsx     # Reusable data table
│           ├── Modal.tsx         # Modal component
│           ├── Button.tsx        # Button component
│           ├── Card.tsx          # Card component
│           ├── StatusBadge.tsx   # Status badge component
│           └── index.ts         # Component exports
```

## Pages

### 1. Dashboard (`/admin`)

- Overview of booking statistics
- Recent bookings table
- Quick access to key metrics
- Total bookings, revenue, paid/pending counts

### 2. Packages (`/admin/packages`)

- View all packages in a table format
- Add new packages
- Edit existing packages
- Delete packages with confirmation
- Package details: name, description, price, duration, platform, inclusions

### 3. Orders (`/admin/orders`)

- View all booking orders
- Order details modal
- Filter and search functionality
- Order status tracking
- Payment information display

### 4. Customers (`/admin/customers`)

- Customer list with aggregated data
- Customer details modal
- Total bookings and spending per customer
- Contact information

### 5. Settings (`/admin/settings`)

- General settings (site name, URL, contact info)
- Notification preferences
- Security settings
- Appearance customization
- Database backup settings

## Components

### AdminLayout

Main layout component used by all admin pages. Includes:

- Responsive sidebar navigation
- Top navbar with search
- User profile section
- Mobile-friendly hamburger menu

**Usage:**

```tsx
import { AdminLayout } from "@/components/admin"

export default function MyAdminPage() {
  return <AdminLayout>{/* Your page content */}</AdminLayout>
}
```

### DataTable

Reusable data table component with:

- Search functionality
- Pagination
- Custom column rendering
- Loading state
- Empty state handling

**Usage:**

```tsx
const columns = [
  {
    key: "name",
    header: "Name",
    render: (value: string) => <span>{value}</span>
  },
  {
    key: "status",
    header: "Status",
    render: (value: string) => <StatusBadge status={value} type="success" />
  }
]

<DataTable
  data={items}
  columns={columns}
  loading={loading}
  emptyMessage="No items found"
/>
```

### Modal

Reusable modal component with:

- Multiple size options (sm, md, lg, xl)
- Animated transitions
- Backdrop click to close
- Custom header and content

**Usage:**

```tsx
const [isOpen, setIsOpen] = useState(false)

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="lg"
>
  {/* Modal content */}
</Modal>
```

### Button

Reusable button component with:

- Multiple variants (primary, secondary, danger, ghost)
- Multiple sizes (sm, md, lg)
- Loading state
- Icon support

**Usage:**

```tsx
<Button
  variant="primary"
  size="md"
  loading={isLoading}
  icon={<Plus className="w-5 h-5" />}
  onClick={handleClick}
>
  Click Me
</Button>
```

### Card

Reusable card component with:

- Optional title and subtitle
- Header action slot
- Clean, modern design

**Usage:**

```tsx
<Card
  title="Card Title"
  subtitle="Card subtitle"
  headerAction={<Button>Action</Button>}
>
  {/* Card content */}
</Card>
```

### StatusBadge

Status badge component with:

- Multiple types (success, error, warning, info)
- Multiple sizes (sm, md)
- Icon support
- Color-coded styling

**Usage:**

```tsx
<StatusBadge status="Active" type="success" size="md" />
```

## Navigation

The admin dashboard includes a sidebar with the following navigation links:

- **Dashboard** → `/admin`
- **Packages** → `/admin/packages`
- **Orders** → `/admin/orders`
- **Customers** → `/admin/customers`
- **Settings** → `/admin/settings`

## Features

### Responsive Design

- Mobile-friendly layout with collapsible sidebar
- Responsive tables with horizontal scrolling
- Adaptive card layouts
- Touch-friendly interactions

### Data Management

- CRUD operations for all entities
- Search and filter functionality
- Pagination for large datasets
- Modal forms for create/edit operations

### UI/UX

- Consistent design system
- Smooth animations and transitions
- Loading states
- Empty states
- Error handling
- Confirmation dialogs for destructive actions

### Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- High contrast colors
- Screen reader friendly

## Styling

The admin dashboard uses:

- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Framer Motion** for animations
- Custom color scheme with purple/pink gradients
- Modern card-based design

## API Integration

The admin dashboard integrates with the following API endpoints:

- `/api/bookings` - Fetch bookings data
- `/api/packages` - CRUD operations for packages
- `/api/packages/[id]` - Individual package operations

## Customization

### Adding New Pages

1. Create a new page in `app/admin/[page-name]/page.tsx`
2. Import and use `AdminLayout` component
3. Add navigation link to `AdminLayout.tsx` navigation array
4. Implement your page logic

### Adding New Components

1. Create component in `app/components/admin/`
2. Export from `index.ts`
3. Use in any admin page

### Modifying Navigation

Edit the `navigation` array in `AdminLayout.tsx`:

```tsx
const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  // Add your new navigation item
  { name: "New Page", href: "/admin/new-page", icon: YourIcon },
]
```

## Best Practices

1. **Use Reusable Components**: Always use the provided components for consistency
2. **Handle Loading States**: Show loading indicators during data fetching
3. **Error Handling**: Implement proper error handling and user feedback
4. **Responsive Design**: Test on different screen sizes
5. **Accessibility**: Ensure all interactive elements are accessible
6. **Code Organization**: Keep components modular and focused

## Future Enhancements

Potential improvements:

- Advanced filtering and sorting
- Bulk operations
- Export to CSV/Excel
- Real-time updates with WebSockets
- Advanced analytics and charts
- Role-based access control
- Activity logs
- Email notifications
- Dark mode toggle
- Multi-language support

## Support

For issues or questions about the admin dashboard, please refer to the project documentation or contact the development team.
