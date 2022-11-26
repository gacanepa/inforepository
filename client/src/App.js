import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Error,
  Landing,
  Register,
  ProtectedRoute,
} from './pages';
import { AddPost, AllPosts, Profile, Stats, SharedLayout } from './pages/dashboard';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={(
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        )}
      >
        <Route path="stats" element={<Stats />} />
        {/* Make All Posts an index route in order to redirect after login or registration */}
        <Route index element={<AllPosts />} />
        <Route path="add-post" element={<AddPost />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default App;
