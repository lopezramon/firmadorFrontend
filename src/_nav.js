import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilSitemap, cilLayers, cilPenAlt, cilPeople } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Organizacion',
    to: '/organizations',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Documentos Firmados',
    to: '/firms',
    icon: <CIcon icon={cilPenAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Log Firmas',
  //   to: '/log-firms',
  //   icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
  // },
]

export default _nav
