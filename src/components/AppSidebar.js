import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,CImage } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { ctrlSidebar } from 'src/store/actions/app.actions'

import logoNegative from '../assets/images/logoNegative.png'
import sygnet from '../assets/images/sygnet.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sapp.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sapp.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch( ctrlSidebar(visible) )
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage className="sidebar-brand-full" fluid src={logoNegative} width={320} height={35} />
        <CImage className="sidebar-brand-narrow" fluid src={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch( ctrlSidebar({sidebarUnfoldable: !unfoldable}, 1))}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
