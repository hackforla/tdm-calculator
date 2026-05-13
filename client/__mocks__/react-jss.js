import React from "react";

export const createUseStyles = () => () => ({});
export const useTheme = () => ({});
/* eslint-disable react/prop-types */
export const ThemeProvider = ({ children }) => <>{children}</>;
export const JssProvider = ({ children }) => <>{children}</>;

export default {
  createUseStyles,
  useTheme,
  ThemeProvider,
  JssProvider
};
