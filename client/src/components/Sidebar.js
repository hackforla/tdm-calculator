import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

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
  links: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    width: '100%',
    height: 'auto',
    position: 'absolute',
    bottom: '20px',
  },
  link: {
    color: 'white',
    margin: '0 10px',
  }
})

export function Sidebar(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        {props.children}
        <div className={classes.links}>
          <Link className={classes.link}> Terms and Conditions</Link>
          <div>|</div>
          <Link className={classes.link}> Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;