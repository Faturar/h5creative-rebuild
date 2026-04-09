# Studio Image Feature

## Overview

This feature adds image support for studios, allowing administrators to upload and manage studio images that will be displayed during the booking selection process.

## Features

### 1. Image Upload

- **Location**: `/admin/studios`
- **Supported formats**: JPEG, JPG, PNG, WebP
- **File size limit**: 5MB
- **Recommended size**: 800x600px
- **Storage**: `/public/uploads/studios/`

### 2. Admin Dashboard

- Navigate to `/admin/studios` to manage studios
- Click "Add Studio" to create a new studio with an image
- Click the edit button to modify existing studios and their images
- Images can be uploaded via drag-and-drop or file selection
- Preview images before saving
- Remove images with one click

### 3. Booking Flow

- Studio images are automatically displayed in the booking flow
- Located at `/booking` step 1: Studio Selection
- Images appear as cards showing the studio appearance
- Users can visually compare studios before making a selection

## Technical Implementation

### Database Schema

The `Studio` model already includes a `photoUrl` field (String?, nullable) to store the image path.

### API Routes

#### Image Upload

- **Route**: `POST /api/upload`
- **Purpose**: Handles file uploads and saves them to the public directory
- **Validation**: File type and size validation
- **Response**: Returns the public URL of the uploaded image

#### Studio Management

- **GET /api/studios**: Fetch all active studios
- **POST /api/studios**: Create a new studio
- \*\*PUT /api/studios/[id]`: Update an existing studio
- \*\*DELETE /api/studios/[id]`: Delete a studio

### Components

#### Admin Studios Page

- **Location**: `app/app/admin/studios/page.tsx`
- **Features**:
  - Studio list with image thumbnails
  - Create/Edit modal with image upload
  - Image preview functionality
  - Form validation
  - Responsive design

#### Studio Selection Component

- **Location**: `app/app/components/booking/StudioSelection.tsx`
- **Features**:
  - Displays studio images in card format
  - Responsive grid layout
  - Selection highlighting
  - Equipment and amenities display

## File Structure

```
app/
├── app/
│   ├── admin/
│   │   └── studios/
│   │       └── page.tsx          # Admin studios management page
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts         # Image upload API
│   │   └── studios/
│   │       ├── route.ts          # Studio CRUD operations
│   │       └── [id]/
│   │           └── route.ts      # Individual studio operations
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminLayout.tsx  # Updated with Studios navigation
│   │   └── booking/
│   │       └── StudioSelection.tsx  # Displays studio images
│   └── public/
│       └── uploads/
│           └── studios/          # Uploaded studio images
└── .gitignore                   # Updated to ignore uploaded files
```

## Usage Guide

### Adding a Studio Image (Admin)

1. Navigate to `/admin/studios`
2. Click "Add Studio" button
3. In the modal, click the upload area or drag and drop an image
4. Preview the uploaded image
5. Fill in studio details (name, location, description, etc.)
6. Click "Create Studio"

### Editing a Studio Image (Admin)

1. Navigate to `/admin/studios`
2. Find the studio you want to edit
3. Click the edit (pencil) icon
4. In the modal, you can:
   - Upload a new image (replaces the old one)
   - Remove the current image
   - Modify other studio details
5. Click "Update Studio"

### Viewing Studio Images (Booking Flow)

1. Navigate to `/booking`
2. In the "Pilih Studio" section, each studio card displays:
   - Studio image (if available)
   - Studio name and location
   - Description
   - Capacity
   - Equipment and amenities
3. Click on a studio card to select it

## Security Considerations

- File type validation prevents upload of executable files
- File size limit prevents server overload
- Images are stored in public directory with unique filenames
- No sensitive data is exposed through image URLs

## Performance Considerations

- Images are served statically from the public directory
- Recommended image size ensures fast loading
- Lazy loading can be implemented for large image lists
- Consider implementing image optimization in production

## Future Enhancements

- Image compression on upload
- Multiple images per studio (gallery)
- Image cropping tool
- CDN integration for image delivery
- Alt text management for accessibility
- Image analytics (views, clicks)

## Troubleshooting

### Image not displaying

- Check that the file exists in `/public/uploads/studios/`
- Verify the URL path in the database
- Ensure the file has correct permissions

### Upload fails

- Check file size (must be under 5MB)
- Verify file type (JPEG, PNG, WebP only)
- Check server logs for detailed error messages

### Images not appearing in booking flow

- Ensure studio is marked as active
- Verify `photoUrl` field is not null in database
- Check browser console for JavaScript errors
