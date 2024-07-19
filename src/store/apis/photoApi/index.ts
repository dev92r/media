import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Album } from "../../../components/model/album";
import { faker } from "@faker-js/faker";
import { Photo } from "../../../components/model/photo";
import { error } from "console";

type PhotoTag = { type: "Photo"; id: number };
type AlbumTag = { type: "AlbumPhoto"; id: number };
type Tag = PhotoTag | AlbumTag;

const photoApi = createApi({
    reducerPath:"photo",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3005/"
    }),
    tagTypes: ["Photo", "AlbumPhoto"],
    endpoints(build) {
        return {
            fetchPhotos: build.query<Photo[], Album>({
                providesTags: (results, error, album): Tag[] => {
                    if(results) {
                        const tags: Tag[] = results.map((photo) => {
                            return {type: "Photo", id: photo.id}
                        })
                        tags.push({type: "AlbumPhoto", id: album.id})
                        return tags
                    }
                    return [{type: "AlbumPhoto", id: album.id}]
                  },
                query:(album:Album) => {
                    return {
                        url:"/photos",
                        params:{
                            albumId: album.id
                        },
                        method:"GET"
                    }
                }
            }),
            AddPhotos: build.mutation({
                invalidatesTags: (result, error, album):AlbumTag[] => {
                    return [{type:"AlbumPhoto", id:album.id}]
                },
                query:(album:Album) => {
                    return {
                        url:"/photos",
                        body:{
                            albumId: album.id,
                            url: faker.image.abstract(150,150, true)
                        },
                        method:"POST"
                    }
                }
            }),
            DeletePhotos: build.mutation({
                invalidatesTags: (result, error, photo):PhotoTag[] => {
                    return [{type:"Photo", id:photo.id}]
                },
                query:(photo:Photo) => {
                    return {
                        url:`/photos/${photo.id}`,
                        method:"DELETE"
                    }
                }
            }),
        }
    },
})

export const { useFetchPhotosQuery, useAddPhotosMutation, useDeletePhotosMutation } = photoApi;
export {photoApi};