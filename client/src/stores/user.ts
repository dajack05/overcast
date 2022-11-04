import {UserService} from '@/services/UserService';
import {User, UserPermission} from '@ovc/common';
import jwtDecode from 'jwt-decode';
import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useCookies} from 'vue3-cookies';

export const useUserStore = defineStore('user', () => {
  const token = ref('');
  const user = ref<User>(new User());

  const cookies = useCookies();

  async function Login(
      email: string, password: string): Promise<string|undefined> {
    {
      const result = await UserService.Login(email, password);
      if (result.error) {
        return result.error;
      }

      // We got a token!
      token.value = result.payload as string;
      cookies.cookies.set('token', token.value, '1m');
      user.value.email = email;
    }

    // Now get the user
    const result = await fetchUser();
    if (typeof result === 'string') {
      console.error(result);
    }

    return;
  }

  function Logout() {
    token.value = '';
    user.value = new User();
    cookies.cookies.remove('token');
  }

  /**
   * Returns the user or error strings if not logged in
   */
  async function fetchUser(): Promise<User|string> {
    if (!isLoggedIn()) {
      return 'User Not Logged In';
    }

    if (!isUserPopulated()) {
      const result = await UserService.GetById(user.value.id);
      if (typeof result == 'string') {
        return result;
      }

      user.value = result;
    }

    return user.value as User;
  }

  const isUserPopulated = () =>
      user.value.first_name.length > 0 && user.value.last_name.length > 0;

  function isLoggedIn(): boolean {
    if (token.value.length > 0) {
      return true;
    }

    // Do we have a token cookie?
    if (cookies.cookies.isKey('token')) {
      const cookie_token = cookies.cookies.get('token');

      // Is it semi-valid?
      if (cookie_token.length > 0) {
        // Can we get the email from within it?
        const decoded = jwtDecode<{id: number; iat: number}>(cookie_token);
        if (!decoded || !decoded.id) {
          return false;
        }

        token.value = cookie_token;
        user.value.id = decoded.id;

        fetchUser().then((v) => {
          if (typeof v === 'string') {
            console.error(v);
          }
        });
        return true;
      }
    }

    return false;
  }

  function isAdmin() {
    return isLoggedIn() && user.value.permission_level === UserPermission.ADMIN;
  }

  return {
    Login,
    Logout,

    isLoggedIn,
    isAdmin,
    fetchUser,

    token,
    user,
  };
});
