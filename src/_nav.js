import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilEyedropper,
  cilUser,
  cilContact,
  cibWechat,
  cilSettings
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Trash Gobin(Artist)',
    to: '/',
    icon: <CIcon icon={cilEyedropper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'account',
        to: '/account',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Contacts',
    to: '/contacts',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Conversations',
    to: '/conversations',
    icon: <CIcon icon={cibWechat} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage',
    to: '/Manage',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav
