//importing libraries, functional components for using them in a table which will show data from server
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

//creation of the parent functional component which will be pased to app.jsx
function Table() {
  //using use state, use ref for state variables and ref to track if fetch has already been attempted
  const [users, setUsers] = useState([]);
  const hasFetchedUsers = useRef(false);

  //async await useEffect function for fetching data from server
  useEffect(() => {

    if (!import.meta.env.VITE_API_URL) {
      console.error("Missing VITE_API_URL in environment variables");
      toast.error("Server configuration error");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        //setting the empty array as a json object of users got from the server
        setUsers(response.data);

        //using the useRef current which is the same as initialized untill changes
        if (!hasFetchedUsers.current) {
          toast.success("Data Fetched");
          hasFetchedUsers.current = true; // set the ref to true after first fetch
        }
      } catch (error) {
        console.log("There was an error fetching the users!", error);

        //if we haven't fetched it stay as it is
        if (!hasFetchedUsers.current) {
          toast.error("Error Fetching Data");
          hasFetchedUsers.current = true; // set the ref to true after first fetch attempt
        }
      }
    };

    //calling the function here
    fetchUsers();
  }, []);

  //after adding or creating a new user we normally would have to manually reload the page but with this function we just add the created user at the last of the fetched json object which we saved as an array
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  //using bootstrap pre built components and modal components
  return (
    <>
      <Toaster richColors closeButton />
      <div className="container mt-5">
        <h1 className="mb-4" id="h1">
          Chaynika's Table 
        </h1>
        <CreateUserModal addUser={addUser} />
        <EditUserModal />
        <DeleteUserModal />

        {users.length === 0 ? (
          <h3 id="h3">No Users in Database</h3>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}


//exporting the component to be using it in the app.jsx
export default Table;
