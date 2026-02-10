import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/apiAuth";
import Heading from "../ui/Heading";
import Table from "../ui/Table";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

function NewUsers() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
  if (isLoading) return <Spinner />;
  if (error) return <Empty resourceName="Users" />;
  return <>
    <Heading as="h1">Create a new user</Heading>
    <Table columns="1fr 1fr 1fr">
      <Table.Header>
        {/* <div></div> */}
        <div>FullName</div>
        <div>Eamil</div>
        <div>Role</div>
      </Table.Header>
      <Table.Body data={users || []} render={(user: any) => (
        <TableRow role="row">
          <div>{user.fullName}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
        </TableRow>
      )}>
      </Table.Body>
    </Table>
  </>;
}

export default NewUsers;
