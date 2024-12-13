import { gql } from "@apollo/client";
import { getClient } from "../apollo_client";

const GET_AUTHORS = gql`
    query Authors {
        authors {
            name
            biography
            born_date
        }
    }
`;

export default async function Page() {
    const { data } = await getClient().query({ query: GET_AUTHORS });
    console.log("authors fetched data", data);

    return <h1>Nested Page!!</h1>;
}
