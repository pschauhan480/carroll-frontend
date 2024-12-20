import { gql, useQuery, useReadQuery, useSuspenseQuery } from "@apollo/client";
import { getClient } from "../apollo_client";
import Image from "next/image";
import Link from "next/link";

import * as Dialog from "@radix-ui/react-dialog";

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
            <Dialog.Root>
                <div className="mb-2 flex justify-end">
                    <Dialog.Trigger asChild>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            + Create
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                            <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
                                Create Book
                            </Dialog.Title>
                            <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                                Add new book to the current list
                            </Dialog.Description>
                            <fieldset className="mb-[15px] flex items-center gap-5">
                                <label
                                    className="w-[90px] text-right text-[15px] text-violet11"
                                    htmlFor="title"
                                >
                                    Title
                                </label>
                                <input
                                    className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                                    id="title"
                                    defaultValue=""
                                />
                            </fieldset>
                            <fieldset className="mb-[15px] flex items-center gap-5">
                                <label
                                    className="w-[90px] text-right text-[15px] text-violet11"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <input
                                    className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                                    id="description"
                                    defaultValue=""
                                />
                            </fieldset>
                            <div className="mt-[25px] flex justify-end">
                                <Dialog.Close asChild>
                                    <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none">
                                        Save
                                    </button>
                                </Dialog.Close>
                            </div>
                            <Dialog.Close asChild>
                                <button
                                    className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                                    aria-label="Close"
                                ></button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </div>
            </Dialog.Root>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.books.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        {book.cover ? (
                            <Image
                                src={book.cover}
                                alt={book.title}
                                className="w-20 h-20 rounded-full mx-auto"
                            />
                        ) : (
                            ""
                        )}
                        <h3 className="text-lg font-semibold text-start mt-4 capitalize">
                            {book.title}
                        </h3>
                        <p className="text-gray-600 text-start capitalize">
                            {book.description}
                        </p>
                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-end">
                            <Link
                                href={"/books/" + book.id}
                                className="bg-yellow-500 text-white  px-3 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                View Details
                            </Link>
                            <button className="bg-green-500 text-white px-3  py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1  rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                // onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
