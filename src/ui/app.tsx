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

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/search/:id">
          <ProgramDetailsPage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/profile/favorites">
          <FavoritesPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/password-reset">
          <PasswordResetPage />
        </Route>
        <Route path="/privacy-policy">
          <PrivacyPolicyPage />
        </Route>
      </Switch>
    </div>
  )
}
