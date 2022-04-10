import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: 'Exo',
  switch: 'Exo',
  tab: 'Exo',
}

const components = {
  Tab: {
    baseStyle: {
      _selected: {
        backgroundColor: '#1a2130',
      },
    },
  },
}

export default extendTheme({ fonts, components })
