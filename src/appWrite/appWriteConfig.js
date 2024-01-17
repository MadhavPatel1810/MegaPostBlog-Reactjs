import { useContext } from "react";
import conf from "../conf/conf";
import { ID, Query } from "appwrite";
import UserContext from "../components/context/UserContext";

const useService = () => {
  const { databases, bucket } = useContext(UserContext);

  //handle create post
  const createPost = async ({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) => {
    try {
      return await databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
    }
  };

  //Handle Update post
  const updatePost = async ({
    slug,
    title,
    content,
    featuredImage,
    status,
  }) => {
    try {
      return await databases?.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("AppWrite service :: updatePost :: error", error);
    }
  };

  //Handle Delete post
  const deletePost = async ({ slug }) => {
    try {
      await databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("AppWrite service :: deletePost :: error", error);
      return false;
    }
  };

  //handle Get Post
  const getPost = async ({ slug }) => {
    try {
      return await databases?.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("AppWrite service :: getPost :: error", error);
      return false;
    }
  };

  //handle get all posts
  const getPosts = async (queries = [Query.equal("status", "active")]) => {
    try {
      if (!databases) {
        return await new Promise((resolve) => setTimeout(resolve, 1000)).then(
          () => getPosts(queries)
        );
      }
      return await databases?.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("AppWrite service :: getPosts :: error", error);
      return false;
    }
  };

  //handle file upload service
  const uploadFile = async (file) => {
    try {
      return await bucket?.createFile(conf.appWriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("AppWrite service :: uploadFile :: error", error);
      return false;
    }
  };

  //handle delete file
  const deleteFile = async (fileId) => {
    try {
      await bucket?.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("AppWrite service :: deleteFile :: error", error);
      return false;
    }
  };

  //handle get file preview
  const getFilePreview = (fileId) => {
    return bucket?.getFilePreview(conf.appWriteBucketId, fileId);
  };

  return {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    uploadFile,
    deleteFile,
    getFilePreview,
  };
};
export default useService;
