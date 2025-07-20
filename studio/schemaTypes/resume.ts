export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'file',
      title: 'Resume PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    },
  ],
}
