import { gql, useQuery } from "@apollo/client";

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
    return <h1>Nested Page!!</h1>;
}
