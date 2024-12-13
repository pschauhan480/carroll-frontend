import { gql, useQuery, useReadQuery, useSuspenseQuery } from "@apollo/client";
import { getClient } from "../apollo_client";
import Image from "next/image";

const GET_BOOKS = gql`
    query Books {
        books {
            id
            title
            description
            published_date
        }
    }
`;

export default async function Page() {
    const { loading, error, data } = await getClient().query({
        query: GET_BOOKS,
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        console.log("books fetch error", error);
        return <p>Error: {error.message}</p>;
    }

    console.log("book fetched data", data);

    return (
        <div className="p-4">
            <div className="mb-2 flex justify-end">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    // onClick={handleCreate}
                >
                    + Create
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.books.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        <Image
                            src={book.avatar}
                            alt={book.title}
                            className="w-20 h-20 rounded-full mx-auto"
                        />
                        <h3 className="text-lg font-semibold text-center mt-4">
                            {book.title}
                        </h3>
                        <p className="text-gray-600 text-center">
                            {book.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
