import { useEffect, useState } from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";
import SortButton from "./SortButton";
import { useDataProvider } from "react-admin";

const UserList = () => {
  const dataProvider = useDataProvider();
  const [users, setUsers] = useState<any[]>([]);
  const [sort, setSort] = useState<{ field: string; order: string }>({
    field: "id",
    order: "ASC",
  });

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      const { data } = await dataProvider.getList("users", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      });
      setUsers(data);
    };
    fetchData();
  }, [dataProvider]);

  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "ASC" ? "DESC" : "ASC";
    setSort({ field, order });
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) => {
        if (a[field] < b[field]) return order === "ASC" ? -1 : 1;
        if (a[field] > b[field]) return order === "ASC" ? 1 : -1;
        return 0;
      })
    );
  };

  return (
    <List
      actions={
        <SortButton
          fields={[
            "id",
            "name",
            "username",
            "email",
            "address.street",
            "phone",
            "website",
            "company.name",
          ]}
          onSortChange={handleSortChange}
          sort={sort}
        />
      }
      pagination={false} // Disable default pagination
    >
      <Datagrid data={users}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="address.street" />
        <TextField source="phone" />
        <TextField source="website" />
        <TextField source="company.name" />
      </Datagrid>
    </List>
  );
};

export default UserList; // Export as default
