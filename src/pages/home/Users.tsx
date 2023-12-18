import { getUsers } from "@/api/users";
import Card from "@/components/Card/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import cl from "./Users.module.scss";
import Preloader from "@/components/Preloader/Preloader";
import Button from "@/components/ui/Button/Button";
import classNames from "classnames";

const Users = () => {
  const { data, isError, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam }) => getUsers(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.links.next_url ? lastPage.page + 1 : undefined,
    });

  const users = (
    <>
      {!isError && data?.pages[0]?.total_users === 0 && (
        <div className={cl.info}>No users...</div>
      )}
      {data && data.pages[0]?.total_users !== 0 && (
        <div className={cl.users}>
          {data?.pages
            .flatMap((p) => p.users)
            .map((u) => (
              <Card key={u.id} user={u} />
            ))}
        </div>
      )}
      {isFetching && (
        <div className={cl.info}>
          <Preloader />
        </div>
      )}
      {isError && !isFetching && (
        <div className={classNames(cl.info, cl.error)}>
          Error! Please, try again later...
        </div>
      )}
    </>
  );

  return (
    <section className={cl.container}>
      <h2 className={cl.header}>Working with GET request</h2>
      {users}
      {hasNextPage && (
        <div className={cl.info}>
          <Button onClick={() => fetchNextPage()}>Show more</Button>
        </div>
      )}
    </section>
  );
};

export default Users;
