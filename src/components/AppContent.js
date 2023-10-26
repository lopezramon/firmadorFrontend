import React, { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }) => {
  const token = localStorage.getItem('token')
  if (!isAllowed && !token) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <ProtectedRoute isAllowed={route.public}>
                      <route.element />
                    </ProtectedRoute>
                  }
                />
              )
              /*
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
              */
            )
          })}
          <Route path="/" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
