import type { BytemdPlugin } from 'bytemd'

export default function themes(): BytemdPlugin {
  return {
    actions: [{
      title: '导入 markdown',
      icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4">
      <path d="M27.9289 33.0721L18.8579 24.0011L27.9289 14.93M43 24H19M31 41H7L7 7L31 7" stroke-linecap="butt"></path>
      </svg>`,
      position: 'right',
      handler: {
        type: 'action',
        click: async ({ editor }) => {
          const options = {
            multiple: false,
            types: [
              {
                description: 'markdown',
                accept: {
                  'text/markdown': ['.md', '.MD']
                }
              }
            ]
          }
          const fileList = await window.showOpenFilePicker(options)

          if (fileList && fileList.length > 0) {
            const file = await fileList[0].getFile()
            const fileReader = new FileReader()
            const result = await fileReader.readAsText(file)

            fileReader.addEventListener('load', () => {
              editor.setValue(fileReader.result)
            })
          }
          return
        }
      }
    }]
  }
}