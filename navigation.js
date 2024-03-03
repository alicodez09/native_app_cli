import React from 'react';
import ScreenMenu from './components/Menus/ScreenMenu';
import {AuthProvider} from './context/auth';
import {TodoProvider} from './context/todo';

const RootNavigation = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <ScreenMenu />
      </TodoProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
