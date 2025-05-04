import { useContext, useState, useEffect, useRef, createContext } from "react";
import { MdExpandMore } from "react-icons/md";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "fit-content"
  },

  dropdown_button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: "0.25rem",
    border: "1px solid #828FA340",
    cursor: "pointer",
    position: "relative"
  },

  list_container: {
    position: "absolute",
    bottom: "100%",
    left: "100%",
    transform: "translateX(2.25rem) translateY(100%)",
    border: "1px solid black",
    width: "max-content",

    "& > div": {
      display: "flex",
      flexDirection: "column",
      padding: "0 0.5rem"
    },

    "& > div > li:first-child": {
      borderTop: "0"
    }
  },

  list_item: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem",
    borderTop: "1px solid black",
    transition: "all 200ms ease",

    margin: "0 -.5rem 0 -3rem",

    "&:hover": {
      background: "#B2C0D3",
      cursor: "pointer"
    }
  },

  userNames: {
    textDecoration: "none",
    color: "black"
  },

  spanner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const useClickOutside = (ref, handler) => {
  // console.log(handler, ref);
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const Item = ({ user }) => {
    const { selectedUsersList, setSelectedUsersList, isDropdownOpen, setIsDropdownOpen, multiSelection } = useContext(UserAssignContext);
    const classes = useStyles();
    function handleAssign(user) {
        setSelectedUsersList((prevList) => {
            if (!multiSelection) {
                return [user]
            }
            // Check if the user already exists in the list
            else if (prevList.includes(user)) {
                // If user exists, remove it from the list
                const updatedList = prevList.filter((item) => item !== user);
                return updatedList;
            } else {
                // If user doesn't exist, add it to the list
                return [...prevList, user];
            }
      });

    }

    return (
        <li
            key={user.id}
            className={`${classes.list_item}`}
            onClick={() => handleAssign(user)}
        >
        {selectedUsersList.includes(user) && '+'}

        <a href="#" className={`${classes.userNames}`}>{user.name}</a>
        </li>
    );
};

const ListContainer = () => {
    const { users, isDropdownOpen, setIsDropdownOpen, multiSelection } = useContext(UserAssignContext);
    const classes = useStyles();
    return (
        isDropdownOpen && (
            <ul 
                className={`${classes.list_container}`}
                onClick={(e) => { if (!multiSelection) {
                    e.stopPropagation();
                    setIsDropdownOpen(false);
                }}}
          >
              <div>
                {users && users.map((user, index) => (
                    <Item key={index} user={user} />
                ))}
              </div>
          </ul>
        )
    );
};

const Button = () => {
    const { setIsDropdownOpen, selectedUsersList, setSelectedUsersList } = useContext(UserAssignContext);
    const classes = useStyles();
    return (
        <button
          className={`${classes.dropdown_button}`}
          onClick={() => {
              setIsDropdownOpen(true);
          }}
        >
        <span>{ selectedUsersList.length > 0 ? selectedUsersList.map((user) => user.name).join(", ") : "Select Users" }</span>
        <MdExpandMore />

        <ListContainer />
        </button>
    );
};

const UserAssignContext = createContext();
const UserAssignDropdown = ({
    selectedUsersList,
    setSelectedUsersList,
    users,
    multiSelection,
}) => {
    const UserAssignDropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useClickOutside(UserAssignDropdownRef, () => {
        setIsDropdownOpen(false);
    });

    return (
        <UserAssignContext.Provider
        value={{
            selectedUsersList,
            users,
            multiSelection,
            UserAssignDropdownRef,
            isDropdownOpen,
            setIsDropdownOpen,
            setSelectedUsersList,
        }}>
        <div ref={UserAssignDropdownRef}>
            <Button />
        </div>
    </UserAssignContext.Provider>
  );
};

export default function DropdownCombo({users, selectedUsersList, setSelectedUsersList, multiSelection}) {

    const classes = useStyles();

    return (
        <div className={`${classes.container}`}>
            <UserAssignDropdown
                selectedUsersList={selectedUsersList}
                setSelectedUsersList={setSelectedUsersList}
                users={users}
                multiSelection={multiSelection}
            />
        </div>
    );
}
