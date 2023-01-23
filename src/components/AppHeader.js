import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CAvatar,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilMenu } from '@coreui/icons'

import { ctrlSidebar } from 'src/store/actions/app.actions'

import logoNegative from 'src/assets/images/logoNegative.png'
import avatar_defualt from 'src/assets/images/avatars/avatar_defualt.png'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sapp.sidebarShow)

  return (
    <CHeader position="sticky" className="">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch( ctrlSidebar(!sidebarShow) )}
        >
          <CIcon icon={cilMenu} className="text-white d-sm-none" size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CImage className="sidebar-brand-full" fluid src={logoNegative} width={180} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>
        <CHeaderNav>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <NavLink to="/account">
            <CAvatar src={avatar_defualt} size="md" />
          </NavLink>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
