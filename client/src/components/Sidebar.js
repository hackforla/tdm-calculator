import React from 'react';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    margin: '0',
    height: 'calc(100vh - 103px)',
    flexBasis: '387px',
    flexGrow: '0',
    flexShrink: '0',
    backgroundImage: 'url("../assets/hard-hats-silvia-brazzoduro.png")',
    backgroundPosition: '15%center',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative'
  },
  overlay: {

  },
  content: {

  }
})

export function Sidebar(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  )
}

export default Sidebar;