import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Contact} from '../models/contact.model'
export const contactsApi = createApi({
    reducerPath: "contactsApi",
    tagTypes: ["Contact"],
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/', mode: "cors"}),
    endpoints:(builder) => ({
        contacts: builder.query<Contact[], void>({
            query: () => '/users',
            providesTags: ['Contact']
        }),
        contact: builder.query<Contact, string>({
            query:(id) => `/users/${id}`,
            providesTags: ['Contact']
        }),
        addContact: builder.mutation<void, Contact>({
            query: contact => ({
                url: '/users',
                method: 'POST',
                body: contact
            }),
            invalidatesTags: ["Contact"]
        }),
        updateContact: builder.mutation<void, Contact>({
            query: ({id, ...rest}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ["Contact"]
        }),
        deleteContact: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELTE'
            }),
            invalidatesTags: ["Contact"]
        }),
    })
})

export const {useContactsQuery, useContactQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation} = contactsApi;