export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // Project Meta
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      name: 'description',
      title: 'Short Description / Tagline',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'role',
      title: 'Role(s)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'team',
      title: 'Team',
      type: 'string',
    },
    {
      name: 'toolsUsed',
      title: 'Tools Used',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Set this to control the order of projects'
    },

    // Case Study Sections (now support multiple paragraphs with rich text)
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              // You can add more decorators if needed
            ],
            annotations: [
              {
                name: 'highlight',
                type: 'object',
                title: 'Highlight',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Color (CSS value, e.g. #ff0000 or red)',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Add one or more paragraphs for the Introduction section. You can highlight or style specific words.',
    },
    {
      name: 'designDecisions',
      title: 'Design Decisions',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'highlight',
                type: 'object',
                title: 'Highlight',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Color (CSS value, e.g. #ff0000 or red)',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Add one or more paragraphs for the Design Decisions section. You can highlight or style specific words.',
    },
    {
      name: 'researching',
      title: 'Researching',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'highlight',
                type: 'object',
                title: 'Highlight',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Color (CSS value, e.g. #ff0000 or red)',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Add one or more paragraphs for the Researching section. You can highlight or style specific words.',
    },
    {
      name: 'launchAndResults',
      title: 'Launch & Results',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'highlight',
                type: 'object',
                title: 'Highlight',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Color (CSS value, e.g. #ff0000 or red)',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Add one or more paragraphs for the Launch & Results section. You can highlight or style specific words.',
    },

    // Final Glimpse Images
    {
      name: 'finalDesignGlimpse',
      title: 'Final Design Glimpse',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}
