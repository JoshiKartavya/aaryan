export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'coverPhoto',
      title: 'Cover Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'moreImages',
      title: 'More Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web App', value: 'web-app'},
          {title: 'Mobile App', value: 'mobile-app'},
          {title: 'Design', value: 'design'},
          {title: 'Branding', value: 'branding'},
        ],
        layout: 'radio',
      },
    },
  ],
} 