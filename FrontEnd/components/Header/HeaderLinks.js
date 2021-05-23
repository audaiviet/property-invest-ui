/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import InputIcon from "@material-ui/icons/Input";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
import { signIn, signOut, useSession } from "next-auth/client";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [session, loading] = useSession();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/projects"
          color="transparent"
          className={classes.navLink}
        >
          <HomeWorkIcon /> Projects
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="UI Demo"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link href="/components">
              <a className={classes.dropdownLink}>All components</a>
            </Link>,
            <Link href="/landing">
              <a className={classes.dropdownLink}>Landing page</a>
            </Link>,
            <Link href="/profile">
              <a className={classes.dropdownLink}>Profile page</a>
            </Link>,
            <Link href="/login">
              <a className={classes.dropdownLink}>Login page</a>
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        {session && (
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={signOut}
          >
            <MotorcycleIcon className={classes.icons} /> Sign Out
          </Button>
        )}
        {!session && (
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={() => signIn("okta")}
          >
            <InputIcon className={classes.icons} /> Sign In
          </Button>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        {session && (
          <Button
            href="/user"
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <AccountCircleIcon className={classes.icons} /> Account
          </Button>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Admin"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={SupervisorAccountIcon}
          dropdownList={[
            <Link href="/projects/create">
              <a className={classes.dropdownLink}>Add a project</a>
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
