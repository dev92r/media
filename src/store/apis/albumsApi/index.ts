import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { Album } from "../../../components/model/album";
import { User } from "../../../components/model/user";

type AlbumTag = { type: 'Album'; id: number };
type UsersAlbumsTag = { type: 'UsersAlbums'; id: number };
type Tag = AlbumTag | UsersAlbumsTag;

const albumsApi = createApi({
    reducerPath:"albums",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3005"
    }),
    tagTypes: ['UsersAlbums', "Album"], 
    endpoints(builder) {
        return {
            addAlbum: builder.mutation<Album[], User>({
                invalidatesTags: (result, error, user): UsersAlbumsTag[] => {
                    return [{ type: 'UsersAlbums', id: user.id }];
                  },
                query: (user:User) => {
                    const album = faker.commerce.productName()
                    return {
                        url:"/albums",
                        method:"POST",
                        body:{
                            title: album,
                            userId: user.id
                        }
                    }
                }
            }),
            deleteAlbum: builder.mutation<void, Album>({
                invalidatesTags: (result, error, album): AlbumTag[] => {
                    return [{ type: 'Album', id: album.id }];
                  },
                query: (album:Album) => {
                    return {
                        url:`/albums/${album.id}`,
                        method:"DELETE",
                    }
                }
            }),
            
            fetchAlbums: builder.query<Album[], User>({
                providesTags: (result, error, user): Tag[] => {
                    if (result) {
                        const albumTags = result.map((album) => ({
                            type: 'Album' as const,
                            id: album.id,
                        }));
                        return [...albumTags, { type: 'UsersAlbums' as const, id: user.id }];
                    }
                    return [{ type: 'UsersAlbums' as const, id: user.id }];
                  },
                query: (user: User) => {
                    return {
                        url:"/albums",
                        params: {
                            userId: user.id
                        },
                        method:"GET"
                    }
                },
                
            })
        }
    }  
})

export const {useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation} = albumsApi;
export {albumsApi};