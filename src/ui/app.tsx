import { Switch, Route } from 'react-router-dom'
import {
  FavoritesPage,
  HomePage,
  LoginPage,
  PasswordResetPage,
  PrivacyPolicyPage,
  ProfilePage,
  ProgramDetailsPage,
  SearchPage,
  SignupPage
} from './pages'
import { link } from '../utils'
import { Modals } from './modals'

export function App() {
  return (
    <>
      <div>
        <Switch>
          <Route exact path={link('/')}>
            <HomePage />
          </Route>
          <Route path={link('/search/:id')}>
            <ProgramDetailsPage />
          </Route>
          <Route path={link('/search')}>
            <SearchPage />
          </Route>
          <Route path={link('/signup')}>
            <SignupPage />
          </Route>
          <Route path={link('/login')}>
            <LoginPage />
          </Route>
          <Route path={link('/profile/favorites')}>
            <FavoritesPage />
          </Route>
          <Route path={link('/profile')}>
            <ProfilePage />
          </Route>
          <Route path={link('/password-reset')}>
            <PasswordResetPage />
          </Route>
          <Route path={link('/privacy-policy')}>
            <PrivacyPolicyPage />
          </Route>
        </Switch>
      </div>
      <Modals />
    </>
  )
}
