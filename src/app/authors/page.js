import { gql } from "@apollo/client";
import { getClient } from "../apollo_client";

const GET_AUTHORS = gql`
    query Authors {
        authors {
            id
            name
            biography
            born_date
        }
    }
`;

export default async function Page() {
    const { loading, error, data } = await getClient().query({
        query: GET_AUTHORS,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("authors fetched data", data);

    return <h1>Nested Page!!</h1>;
}
