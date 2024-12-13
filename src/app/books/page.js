import { gql, useQuery, useReadQuery, useSuspenseQuery } from "@apollo/client";
import { getClient } from "../apollo_client";

const GET_BOOKS = gql`
    query Books {
        books {
            title
            description
            published_date
        }
    }
`;

export default async function Page() {
    const { data } = await getClient().query({ query: GET_BOOKS });
    console.log("book fetched data", data);

    return <h1>Nested Page!!</h1>;
}
